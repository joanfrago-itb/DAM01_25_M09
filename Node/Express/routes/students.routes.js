import { Router } from "express";
import * as StudentsController from "../controllers/students.controller.js";

const router = Router();

router.get("/students", StudentsController.getAll);
router.get("/students/:id", StudentsController.getById);
router.delete("/students/:id", StudentsController.deleteById);
router.post("/students", StudentsController.add);
router.put("/students/:id", StudentsController.modifyById);

export default router;
