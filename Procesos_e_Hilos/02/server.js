import express from 'express';

const app = express();
const PORT = 4001;

const server = app.listen(PORT, () => {
    console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}/`);
});

/***************************************
 ************ CHILD PROCESS ************
 ***************************************/
/*import { execFile } from 'child_process';

app.get('/sumar', (req, res) => {
    const numeros = [1, 2, 3, 4, 5];

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

*/


/***************************************
 ************ WORKER THREAD ************
 ***************************************/

/*import { Worker } from 'worker_threads';

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
});*/





/***************************************
 ************ MULTIPROCESS FORK() ************
 ***************************************/

import { fork } from 'child_process';


app.get('/ping', (req, res) => {
    res.json({ mensaje: '¡El restaurante está abierto y atendiendo rápido!' });
    console.log('Ping recibido. Servidor responde rápido.');
});

//Tarea pesada (delegada con fork)
app.get('/inventario', (req, res) => {
    console.log('Cliente pide el inventario. Delegando tarea...');

    // 1. Contratamos al segundo cocinero (creamos el proceso)
    const cocineroHijo = fork('tarea-fork.js');

    // 2. Le damos la orden por el walkie-talkie --> podemos enviar objetos, no solo strings
    //Establecemos canal de comunicación con el hijo y le damos la orden de empezar el inventario
    cocineroHijo.send({ comando: 'empezar_inventario' });

    // 3. Escuchamos lo que nos responde
    cocineroHijo.on('message', (mensaje) => {
        console.log(`El cocinero hijo dice: ${mensaje.estado}`);

        // 4. Respondemos al cliente HTTP solo cuando el hijo termina
        res.json({
            exito: true,
            resultado: mensaje.estado,
            total_items: mensaje.total
        });
    });

    // Gestionamos si el hijo falla
    cocineroHijo.on('error', (error) => {
        console.error('El cocinero hijo tuvo un accidente:', error);
        res.status(500).json({ error: 'Fallo al hacer el inventario' });
    });
});
