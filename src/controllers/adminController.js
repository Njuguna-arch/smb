import User from "../models/User.js";
import Announcement from "../models/AnnouncementModel.js";
import ExamResult from "../models/ExamResult.js";
import { logActivity } from "../models/SystemLog.js";

export const getPerformance = async (req, res) => {
  try {
    const performance = await ExamResult.aggregate([
      { $group: { _id: "$subject", avgScore: { $avg: "$score" } } }
    ]);
    res.json(performance);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch performance", error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const filter =
      req.user && req.user.role === "admin" && req.user.schoolCode
        ? { schoolCode: new RegExp(`^${req.user.schoolCode}$`, "i") }
        : {};

    const users = await User.find(filter).lean();
    const baseUrl = "https://raw.githubusercontent.com/Njuguna-arch/smb/main/uploads/";
    const formattedUsers = users.map((user) => ({
      ...user,
      photoUrl: user.photoUrl ? `${baseUrl}${user.photoUrl}` : null,
    }));
    res.json(formattedUsers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const userData = { ...req.body };

    // Automatically associate user with admin's school if created by school admin
    if (req.user && req.user.role === "admin" && req.user.schoolCode) {
      userData.schoolCode = req.user.schoolCode;
    }

    const user = new User(userData);
    await user.save();

    await logActivity({
      action: "USER_CREATED",
      details: `${user.role?.toUpperCase()} "${user.name}" (${user.email || user.admissionNumber}) created by admin "${req.user?.name || req.user?.email || "Admin"}". School: ${user.schoolCode || "N/A"}`,
      performedBy: req.user?.name || "Admin",
      performedByRole: req.user?.role || "admin",
      schoolCode: user.schoolCode || null,
      level: "info",
    });

    const savedUser = user.toObject();
    const baseUrl = "https://raw.githubusercontent.com/Njuguna-arch/smb/main/uploads/";
    savedUser.photoUrl = savedUser.photoUrl ? `${baseUrl}${savedUser.photoUrl}` : null;

    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Create user error:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Duplicate field value",
        error: err.keyValue,
      });
    }

    res.status(400).json({
      message: "Failed to create user",
      error: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    if (req.user && req.user.role === "admin" && req.user.schoolCode) {
      query.schoolCode = new RegExp(`^${req.user.schoolCode}$`, "i");
    }

    const userToDelete = await User.findOne(query);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found or unauthorized to delete" });
    }

    await User.findByIdAndDelete(req.params.id);

    await logActivity({
      action: "USER_DELETED",
      details: `${userToDelete.role?.toUpperCase()} "${userToDelete.name}" deleted by admin "${req.user?.name || "Admin"}"`,
      performedBy: req.user?.name || "Admin",
      performedByRole: req.user?.role || "admin",
      schoolCode: userToDelete.schoolCode || null,
      level: "warning",
    });

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch announcements", error: err.message });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create({
      message: req.body.message,
      createdBy: req.user?.id,
    });
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ message: "Failed to create announcement", error: err.message });
  }
};