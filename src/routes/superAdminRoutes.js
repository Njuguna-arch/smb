import express from "express";
import { getSchools, addSchool, removeSchool } from "../controllers/superAdminController.js";
import { authenticateToken, authorizeSuperAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken, authorizeSuperAdmin);

router.get("/schools", getSchools);
router.post("/schools", addSchool);
router.delete("/schools/:code", removeSchool);

export default router;
