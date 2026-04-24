import {
  listarCamisetas,
  generarCatalogoCompleto
} from '../services/catalogo.service.js';

export async function getCamisetas(req, res) {
  const data = listarCamisetas(req.query);
  res.json(data);
}

export async function getCatalogoCompleto(req, res) {
  console.log('Recibida petición para catálogo completo');
  try {
    const data = await generarCatalogoCompleto();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

