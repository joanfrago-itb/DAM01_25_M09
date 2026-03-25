import { Router } from "express";
import * as CamisetasController from "../controllers/camisetas.controller.js";

const router = Router();

router.get("/", CamisetasController.getAll);
router.get("/:id", CamisetasController.getById);

export default router;
