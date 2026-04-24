import express from 'express';
const router = express.Router();
import { getRecomendaciones } from '../controllers/recomendaciones.controller.js';

router.get('/', getRecomendaciones);

export default router;