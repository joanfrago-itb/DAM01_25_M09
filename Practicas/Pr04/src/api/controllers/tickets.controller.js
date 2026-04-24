import { generarTicketPdf } from '../services/tickets.service.js';

export async function getTicketPdf(req, res) {
  try {
    const pdf = await generarTicketPdf(req.params.id);
    res.type('text/plain').send(pdf);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

