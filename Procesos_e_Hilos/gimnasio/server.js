import express from "express";

const app = express();
const PORT = 3210;

const server = app.listen(PORT, () => {
    console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}/`);
});

import { Worker } from "worker_threads";

app.get("/sumar", (req, res) => {
	const numeros = [1,2,3,4,5];

	const worker = new Worker("./worker.js", {
		workerData: { numeros }
	});

	worker.on("message", (datos) => {
		res.json(datos);
	});

	worker.on("error", (err) => {
		res.status(500).json({ error: err.message });
	});
});

