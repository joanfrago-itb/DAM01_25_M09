import cluster from 'cluster';
import os from 'os';
import express from 'express';
import studentsRouter from './routes/students.routes.js';
import notasRouter from    './routes/notas.routes.js';

const NUM_CPUS = os.cpus().length;
console.log(`Servidor arrancado con ${NUM_CPUS} núcleos disponibles.`);

// ── MASTER ────────────────────────────────────────────────────────────────
if (cluster.isPrimary) {

    console.log(`Master ${process.pid} arrancado — creando ${NUM_CPUS} workers...`);

    // Crear un worker por cada núcleo disponible
    for (let i = 0; i < NUM_CPUS; i++) {
        cluster.fork();
    }

    // Si un worker muere por cualquier motivo → crear uno nuevo
    cluster.on('exit', (worker, code, signal) => {
        console.warn(`Worker ${worker.process.pid} murió (${signal || code}). Reiniciando...`);
        cluster.fork();
    });

    // ── WORKER ────────────────────────────────────────────────────────────────
} else {

    const app = express();
    const PORT = 3011;

    // Middlewares globales
    app.use(express.json());

    // Log — incluimos el PID para ver qué worker atiende cada petición
    app.use((req, res, next) => {
        console.log(`[Worker ${process.pid}]`, req.method, req.url);
        next();
    });

    // Health check — endpoint nuevo, útil para comprobar que el cluster funciona
    /*
    app.get('/health', (req, res) => {
        res.json({
            status: 'ok',
            pid:    process.pid,
            uptime: process.uptime()
        });
    });
    */
    app.get('/health', async (req, res) => {
        console.log(`[Worker ${process.pid}] Health check recibido.`);
        const checks = {
            servidor: 'ok',
            memoria: process.memoryUsage().heapUsed < 500_000_000 ? 'ok' : 'warning'
        };

        // PAra cuando haya una base de datos, podríamos hacer un ping aquí y añadirlo a los checks:
        // checks.database = await db.ping() ? 'ok' : 'error';

        const todoOk = Object.values(checks).every(v => v === 'ok');

        res.status(todoOk ? 200 : 503).json({
            status: todoOk ? 'ok' : 'degraded',
            checks,
            uptime: process.uptime()
        });
    });

    // Rutas — exactamente igual que antes
    app.use('/students', studentsRouter);
    app.use('/notas', notasRouter);

    // Middleware de errores — exactamente igual que antes
    app.use((err, req, res, next) => {
        console.error(err.message);
        res.status(500).json({ message: 'Error interno' });
    });

    // Graceful shutdown — cierre limpio cuando el master para este worker
    const server = app.listen(PORT, () => {
        console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}/`);
    });

    process.on('SIGTERM', () => {
        server.close(() => {
            console.log(`Worker ${process.pid} cerrado limpiamente.`);
            process.exit(0);
        });
    });
}
