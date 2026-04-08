import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Get all students (basic info)
router.get("/", async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("name grade _id");
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Assign an existing photo from /uploads to a user
router.put("/assign-photo/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { photoFileName } = req.body;

    if (!photoFileName) {
      return res.status(400).json({ message: "Photo filename is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { photoUrl: photoFileName },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Photo assigned successfully",
      photoUrl: `/uploads/${photoFileName}`,
      user,
    });
  } catch (err) {
    console.error("Error assigning photo:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
