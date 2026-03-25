import { Router } from "express";
import * as ComandasController from "../controllers/comandas.controller.js";

const router = Router();

router.get("/", ComandasController.getAll);
router.get("/:id", ComandasController.getById);
router.post("/", ComandasController.add);

export default router;
