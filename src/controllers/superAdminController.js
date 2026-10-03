import School from "../models/School.js";
import User from "../models/User.js";
import ExamResult from "../models/ExamResult.js";
import Quiz from "../models/Quiz.js";
import SystemLog, { logActivity } from "../models/SystemLog.js";
import SystemSetting from "../models/SystemSetting.js";

// Fetch all schools with admin details and pupil/teacher counts
export const getSchools = async (req, res) => {
  try {
    const schools = await School.find().sort({ createdAt: -1 }).lean();

    // Enrich each school with admin details and counts
    const enrichedSchools = await Promise.all(
      schools.map(async (school) => {
        const studentCount = await User.countDocuments({
          schoolCode: new RegExp(`^${school.code}$`, "i"),
          role: "student",
        });

        const teacherCount = await User.countDocuments({
          schoolCode: new RegExp(`^${school.code}$`, "i"),
          role: "teacher",
        });

        // Find primary admin for this school if not already attached
        let admin = null;
        if (school.adminId) {
          admin = await User.findById(school.adminId).select("name email role createdAt").lean();
        }
        if (!admin) {
          admin = await User.findOne({
            schoolCode: new RegExp(`^${school.code}$`, "i"),
            role: "admin",
          }).select("name email role createdAt").lean();
        }

        return {
          ...school,
          status: school.status || "active",
          studentCount,
          teacherCount,
          admin: admin
            ? {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
              }
            : null,
        };
      })
    );

    res.json(enrichedSchools);
  } catch (err) {
    console.error("Failed to fetch schools:", err);
    res.status(500).json({ message: "Failed to fetch schools", error: err.message });
  }
};

// Add new school and create its initial school admin
export const addSchool = async (req, res) => {
  try {
    const {
      name,
      code,
      address,
      phone,
      adminName,
      adminEmail,
      adminPassword,
    } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: "School name and school code are required" });
    }

    if (!adminName || !adminEmail || !adminPassword) {
      return res.status(400).json({
        message: "School Admin details (name, email, and password) are required to create the school",
      });
    }

    const normalizedCode = code.trim().toUpperCase();
    const normalizedEmail = adminEmail.trim().toLowerCase();

    // Check existing school
    const existingSchool = await School.findOne({ code: normalizedCode });
    if (existingSchool) {
      return res.status(400).json({ message: `School with code "${normalizedCode}" already exists` });
    }

    // Check existing admin user email
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: `A user with email "${normalizedEmail}" already exists` });
    }

    // 1. Create School
    const school = new School({
      name: name.trim(),
      code: normalizedCode,
      address: address?.trim() || "",
      phone: phone?.trim() || "",
      status: "active",
      adminName: adminName.trim(),
      adminEmail: normalizedEmail,
    });
    await school.save();

    // 2. Create the School Admin User
    const adminUser = new User({
      name: adminName.trim(),
      email: normalizedEmail,
      password: adminPassword,
      role: "admin",
      schoolCode: normalizedCode,
    });
    await adminUser.save();

    // Link admin ID to school
    school.adminId = adminUser._id;
    await school.save();

    // 3. Log the system events
    await logActivity({
      action: "SCHOOL_CREATED",
      details: `School "${school.name}" (${normalizedCode}) registered with admin "${adminUser.name}" (${adminUser.email})`,
      performedBy: req.user?.name || req.user?.email || "Super Admin",
      performedByRole: req.user?.role || "superadmin",
      schoolCode: normalizedCode,
      level: "info",
    });

    res.status(201).json({
      message: "School and Admin created successfully",
      school: {
        ...school.toObject(),
        status: school.status,
        studentCount: 0,
        teacherCount: 0,
        admin: {
          _id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
        },
      },
      admin: {
        _id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
        schoolCode: adminUser.schoolCode,
      },
    });
  } catch (err) {
    console.error("Failed to add school and admin:", err);
    await logActivity({
      action: "SCHOOL_CREATION_FAILED",
      details: `Failed to create school: ${err.message}`,
      performedBy: req.user?.name || "Super Admin",
      level: "error",
    });
    res.status(500).json({ message: "Failed to add school", error: err.message });
  }
};

// Toggle school status: active <-> disabled
export const toggleSchoolStatus = async (req, res) => {
  try {
    const { code } = req.params;
    const normalizedCode = code.trim().toUpperCase();

    const school = await School.findOne({ code: normalizedCode });
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    const currentStatus = school.status || "active";
    const newStatus = req.body.status || (currentStatus === "active" ? "disabled" : "active");

    school.status = newStatus;
    await school.save();

    await logActivity({
      action: newStatus === "disabled" ? "SCHOOL_DISABLED" : "SCHOOL_ENABLED",
      details: `School "${school.name}" (${normalizedCode}) status changed to ${newStatus}`,
      performedBy: req.user?.name || req.user?.email || "Super Admin",
      performedByRole: "superadmin",
      schoolCode: normalizedCode,
      level: newStatus === "disabled" ? "warning" : "info",
    });

    res.json({
      message: `School ${newStatus === "disabled" ? "disabled" : "activated"} successfully`,
      school,
    });
  } catch (err) {
    console.error("Failed to toggle school status:", err);
    res.status(500).json({ message: "Failed to update school status", error: err.message });
  }
};

// Reset/Update School Admin Password
export const resetAdminPassword = async (req, res) => {
  try {
    const { code } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 4) {
      return res.status(400).json({ message: "A valid new password (at least 4 chars) is required" });
    }

    const normalizedCode = code.trim().toUpperCase();
    const adminUser = await User.findOne({
      schoolCode: new RegExp(`^${normalizedCode}$`, "i"),
      role: "admin",
    });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user for this school not found" });
    }

    adminUser.password = newPassword;
    await adminUser.save();

    await logActivity({
      action: "ADMIN_PASSWORD_RESET",
      details: `Password reset for Admin "${adminUser.name}" (${adminUser.email}) of school ${normalizedCode}`,
      performedBy: req.user?.name || "Super Admin",
      performedByRole: "superadmin",
      schoolCode: normalizedCode,
      level: "warning",
    });

    res.json({ message: `Password for admin ${adminUser.email} has been updated successfully.` });
  } catch (err) {
    console.error("Failed to reset admin password:", err);
    res.status(500).json({ message: "Failed to reset password", error: err.message });
  }
};

// Remove school and associated users
export const removeSchool = async (req, res) => {
  try {
    const { code } = req.params;
    const normalizedCode = code.trim().toUpperCase();

    const school = await School.findOneAndDelete({ code: normalizedCode });
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    // Delete associated users for this school
    const deletedUsers = await User.deleteMany({
      schoolCode: new RegExp(`^${normalizedCode}$`, "i"),
    });

    await logActivity({
      action: "SCHOOL_REMOVED",
      details: `School "${school.name}" (${normalizedCode}) and ${deletedUsers.deletedCount} associated users were permanently removed`,
      performedBy: req.user?.name || "Super Admin",
      performedByRole: "superadmin",
      schoolCode: normalizedCode,
      level: "warning",
    });

    res.json({
      message: `School "${school.name}" and ${deletedUsers.deletedCount} associated user(s) removed successfully.`,
    });
  } catch (err) {
    console.error("Failed to remove school:", err);
    res.status(500).json({ message: "Failed to remove school", error: err.message });
  }
};

// Superadmin Statistics / Metrics Overview
export const getSuperAdminStats = async (req, res) => {
  try {
    const totalSchools = await School.countDocuments();
    const activeSchools = await School.countDocuments({ status: { $ne: "disabled" } });
    const disabledSchools = await School.countDocuments({ status: "disabled" });

    const totalStudents = await User.countDocuments({ role: "student" });
    const totalTeachers = await User.countDocuments({ role: "teacher" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const totalExams = await ExamResult.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();
    const totalLogs = await SystemLog.countDocuments();

    const recentLogs = await SystemLog.find().sort({ createdAt: -1 }).limit(6).lean();

    res.json({
      schools: {
        total: totalSchools,
        active: activeSchools,
        disabled: disabledSchools,
      },
      users: {
        total: totalStudents + totalTeachers + totalAdmins,
        students: totalStudents,
        teachers: totalTeachers,
        admins: totalAdmins,
      },
      content: {
        exams: totalExams,
        quizzes: totalQuizzes,
      },
      system: {
        totalLogs,
      },
      recentLogs,
    });
  } catch (err) {
    console.error("Failed to fetch superadmin stats:", err);
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};

// System Activity Logs
export const getSystemLogs = async (req, res) => {
  try {
    const { level, action, search, limit = 50, page = 1 } = req.query;

    const query = {};
    if (level && level !== "all") {
      query.level = level;
    }
    if (action && action !== "all") {
      query.action = new RegExp(action, "i");
    }
    if (search) {
      query.$or = [
        { details: new RegExp(search, "i") },
        { performedBy: new RegExp(search, "i") },
        { schoolCode: new RegExp(search, "i") },
        { action: new RegExp(search, "i") },
      ];
    }

    const parsedLimit = Math.min(Number(limit) || 50, 200);
    const parsedPage = Math.max(Number(page) || 1, 1);
    const skip = (parsedPage - 1) * parsedLimit;

    const [logs, total] = await Promise.all([
      SystemLog.find(query).sort({ createdAt: -1 }).skip(skip).limit(parsedLimit).lean(),
      SystemLog.countDocuments(query),
    ]);

    res.json({
      logs,
      total,
      page: parsedPage,
      totalPages: Math.ceil(total / parsedLimit) || 1,
    });
  } catch (err) {
    console.error("Failed to fetch system logs:", err);
    res.status(500).json({ message: "Failed to fetch system logs", error: err.message });
  }
};

// Clear Logs
export const clearSystemLogs = async (req, res) => {
  try {
    const count = await SystemLog.countDocuments();
    await SystemLog.deleteMany({});

    await logActivity({
      action: "LOGS_CLEARED",
      details: `${count} system log entries cleared by Super Admin`,
      performedBy: req.user?.name || "Super Admin",
      level: "warning",
    });

    res.json({ message: "System activity logs cleared successfully" });
  } catch (err) {
    console.error("Failed to clear logs:", err);
    res.status(500).json({ message: "Failed to clear logs", error: err.message });
  }
};

// System Settings
export const getSystemSettings = async (req, res) => {
  try {
    let settings = await SystemSetting.findOne({ key: "global_settings" });
    if (!settings) {
      settings = await SystemSetting.create({ key: "global_settings" });
    }
    res.json(settings);
  } catch (err) {
    console.error("Failed to fetch system settings:", err);
    res.status(500).json({ message: "Failed to fetch settings", error: err.message });
  }
};

export const updateSystemSettings = async (req, res) => {
  try {
    const allowedFields = [
      "platformName",
      "supportEmail",
      "maintenanceMode",
      "allowRegistration",
      "academicYear",
      "currentTerm",
      "logRetentionDays",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    let settings = await SystemSetting.findOneAndUpdate(
      { key: "global_settings" },
      { $set: updates },
      { new: true, upsert: true }
    );

    await logActivity({
      action: "SYSTEM_SETTINGS_UPDATED",
      details: `System settings updated: ${Object.keys(updates).join(", ")}`,
      performedBy: req.user?.name || "Super Admin",
      level: "info",
    });

    res.json({ message: "Settings updated successfully", settings });
  } catch (err) {
    console.error("Failed to update system settings:", err);
    res.status(500).json({ message: "Failed to update settings", error: err.message });
  }
};
