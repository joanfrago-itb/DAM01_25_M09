import { procesarPago } from '../services/pagos.service.js';

export async function finalizarPago(req, res) {
  try {
    const modo = req.query.modo || 'sync';
    const result = await procesarPago(req.body, modo);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

