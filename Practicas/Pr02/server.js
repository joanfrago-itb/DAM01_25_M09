import express from "express";
import camisetasRouter from "./routes/camisetas.routes.js";
import comandasRouter from "./routes/comandas.routes.js";

const app = express();
const PORT = 8888;

// MIDDLEWARE
app.use(express.json());

app.use((req,res,next) => {
    console.log(req.method, req.url);
    next();
});

app.use("/api/camisetas", camisetasRouter);
app.use("/api/comandas", comandasRouter);

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({message: "Error interno"});
});

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
