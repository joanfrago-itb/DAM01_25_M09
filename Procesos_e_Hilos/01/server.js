import express from 'express';

const app = express();
const PORT = 3001;

const server = app.listen(PORT, () => {
    console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}/`);
});

/***************************************
 ************ CHILD PROCESS ************
 ***************************************/
import { execFile } from 'child_process';

app.get('/sumar', (req, res) => {
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    console.log("Node hace GET")

    // Lanza el script en un proceso separado
    execFile('node', ['tarea-pesada.js', JSON.stringify(numeros)],
        (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: 'Falló el proceso' });
            }
            const datos = JSON.parse(stdout);
            res.json(datos); // → { resultado: 15 }
        }
    );
    // Mientras tanto, Node sigue atendiendo otras peticiones
});




/***************************************
 ************ WORKER THREAD ************
 ***************************************/

 /*
import { Worker } from 'worker_threads';

app.get('/sumar', (req, res) => {
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Crea el worker y le pasa los datos
    const worker = new Worker('./worker.js', {
        workerData: { numeros }            // pasa objetos directamente (no solo strings)
    });

    // Escucha el resultado
    worker.on('message', (datos) => {
        res.json(datos);
        console.log("Resultado:", datos.resultado);
    });

    // Gestiona errores
    worker.on('error', (err) => {
        res.status(500).json({ error: err.message });
    });
});


app.get('/ping', (req, res) => {
    res.json({ mensaje: 'Node sigue vivo', pid: process.pid });
    console.log("Node sigue vivo:", process.pid);
});
*/
