import { Router } from "express";
import * as StudentsController from "../controllers/students.controller.js";

const router = Router();

router.get("/", StudentsController.getAll);
router.get("/:id", StudentsController.getById);
router.post("/", StudentsController.add);
router.put("/:id", StudentsController.modifyById);
router.delete("/:id", StudentsController.deleteById);

export default router;
