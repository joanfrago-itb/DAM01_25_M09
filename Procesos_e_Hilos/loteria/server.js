import express from "express";

const app = express();
const PORT = 4321;

const server = app.listen(PORT, () => {
    console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}/`);
});

import { execFile } from "child_process";

app.get("/jugar/:nombre", (req, res) => {
    console.log("GET /jugar/"+req.params.nombre);

    execFile("node", ["sorteo.js", JSON.stringify(req.params.nombre)],
        (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: "Process exited with error" });
            }
            const winner = JSON.parse(stdout);
            res.json(winner); // → { resultado: 15 }
        }
    );
    // Mientras tanto, Node sigue atendiendo otras peticiones
});

app.get("/ru-alive", (req, res) => {
	console.log("GET /alive");
	res.json({server: "active"});
});
