import express from "express";
import {
  getSchools,
  addSchool,
  removeSchool,
  toggleSchoolStatus,
  resetAdminPassword,
  getSuperAdminStats,
  getSystemLogs,
  clearSystemLogs,
  getSystemSettings,
  updateSystemSettings,
} from "../controllers/superAdminController.js";
import { authenticateToken, authorizeSuperAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Require superadmin authentication for all routes
router.use(authenticateToken, authorizeSuperAdmin);

// School Management
router.get("/schools", getSchools);
router.post("/schools", addSchool);
router.delete("/schools/:code", removeSchool);
router.patch("/schools/:code/toggle-status", toggleSchoolStatus);
router.patch("/schools/:code/status", toggleSchoolStatus);
router.patch("/schools/:code/admin-password", resetAdminPassword);

// Overview Metrics & Stats
router.get("/stats", getSuperAdminStats);

// System Logs
router.get("/logs", getSystemLogs);
router.delete("/logs", clearSystemLogs);

// System Settings
router.get("/settings", getSystemSettings);
router.put("/settings", updateSystemSettings);

export default router;
