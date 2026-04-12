import express from "express";

const app = express();
const PORT = 4321;

const server = app.listen(PORT, () => {
    console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}/`);
});

import { fork } from "child_process";

app.get("/jugar/:nombre", (req, res) => {
    console.log("GET /jugar/"+req.params.nombre);

	const sorteoChild = fork("sorteo.js");

	sorteoChild.send({ action: "start_sorteo", name: req.params.nombre });

	sorteoChild.on("message", (m) => {
		res.json(m);
	});

	sorteoChild.on("error", (err) => {
		console.error("Error on child process");
		res.status(500).json({error: "Error on child process"});
	});

});

app.get("/ru-alive", (req, res) => {
	console.log("GET /alive");
	res.json({server: "active"});
});
