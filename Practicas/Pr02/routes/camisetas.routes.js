import { Router } from "express";
import * as CamisetasController from "../controllers/camisetas.controller.js";

const router = Router();

router.get("/", CamisetasController.getAll);
// router.get("/:id", StudentsController.getById);
// router.post("/", StudentsController.add);
// router.put("/:id", StudentsController.modifyById);
// router.delete("/:id", StudentsController.deleteById);

export default router;
