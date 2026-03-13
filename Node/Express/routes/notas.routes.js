import { Router } from "express";
import * as NotasController from "../controllers/notas.controller.js";

const router = Router();

router.get("/", NotasController.getAll);

export default router;
