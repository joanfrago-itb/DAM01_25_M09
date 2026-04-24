import express from 'express';
const router = express.Router();
import { getTicketPdf } from '../controllers/tickets.controller.js';

router.get('/:id/pdf', getTicketPdf);

export default router;