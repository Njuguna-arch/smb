import User from "../models/User.js";
import Announcement from "../models/AnnouncementModel.js";
import ExamResult from "../models/ExamResult.js";

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
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
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
    await User.findByIdAndDelete(req.params.id);
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