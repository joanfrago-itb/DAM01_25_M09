import express from 'express';
import cors from 'cors'; //npm install cors --> Si da error, instalar @types/cors también

import catalogoRouter from './api/routes/catalogo.routes.js';
import pagosRouter from './api/routes/pagos.routes.js';
import ticketsRouter from './api/routes/tickets.routes.js';
import recomendacionesRouter from './api/routes/recomendaciones.routes.js';

const app = express();

app.use(express.json());

// Opción A: Permitir todo (OJO)
//app.use(cors());

// Opción B: Permitir solo tu front-end 
app.use(cors({
 origin: 'http://127.0.0.1:5500'
}));


app.use('/api/catalogo', catalogoRouter);
app.use('/api/pagos', pagosRouter);
app.use('/api/tickets', ticketsRouter);
app.use('/api/recomendaciones', recomendacionesRouter);


app.get('/health', (req, res) => {
  res.json({ ok: true, pid: process.pid });
});

export default app;

