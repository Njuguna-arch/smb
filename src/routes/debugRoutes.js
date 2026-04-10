// routes/debugRoutes.js
import express from "express";
import { generateStudentReport } from "../controllers/debugController.js";

const router = express.Router();

router.post("/student-report", generateStudentReport);

export default router;
