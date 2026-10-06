import express from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  getAnnouncements,
  createAnnouncement,
  getExamTypes,
  getTerms,
  getYears,
} from "../controllers/adminController.js";
import { getSchoolPerformance } from "../controllers/examController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/performance", getSchoolPerformance);
router.get("/exam-types", getExamTypes);
router.get("/terms", getTerms);
router.get("/years", getYears);

router.get("/users", getUsers);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);

router.get("/announcements", getAnnouncements);
router.post("/announcements", createAnnouncement);

export default router;