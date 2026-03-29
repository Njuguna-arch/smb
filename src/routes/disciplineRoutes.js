import express from "express";
import {
  addDisciplineRecord,
  getStudentDisciplineRecords,
  resolveDisciplineRecord,
  getAllDisciplineRecords,
} from "../controllers/disciplineController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, addDisciplineRecord);

router.get("/:admissionNumber", authenticateToken, getStudentDisciplineRecords);

router.get("/", authenticateToken, getAllDisciplineRecords);

router.put("/:id/resolve", authenticateToken, resolveDisciplineRecord);

export default router;