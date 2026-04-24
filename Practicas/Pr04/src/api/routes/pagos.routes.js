import express from 'express';
const router = express.Router();
import { finalizarPago } from '../controllers/pagos.controller.js';

router.post('/finalizar', finalizarPago);

export default router;