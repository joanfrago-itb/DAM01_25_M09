import { calcularRecomendaciones } from '../services/recomendaciones.service.js';
export async function getRecomendaciones(req, res) {
  try {
    const data = await calcularRecomendaciones();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

