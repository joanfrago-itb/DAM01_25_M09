import express from 'express';
const router = express.Router();
import {
  getCamisetas,
  getCatalogoCompleto
} from '../controllers/catalogo.controller.js';

router.get('/camisetas', getCamisetas);
router.get('/catalogo-completo', getCatalogoCompleto);

export default router;