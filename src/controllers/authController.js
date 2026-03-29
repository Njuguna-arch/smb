import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, admissionNumber, password, role } = req.body;

  try {
    console.log("Login payload received:", req.body);

    let user;

    if (role === "student") {
      const normalizedAdmission = admissionNumber?.trim().toUpperCase();
      user = await User.findOne({
        admissionNumber: normalizedAdmission,
        role: "student",
      });
      console.log("Student login attempt:", normalizedAdmission);
    } else {
      const normalizedEmail = email?.trim().toLowerCase();
      user = await User.findOne({ email: normalizedEmail, role });
      console.log("Staff login attempt:", normalizedEmail);
    }

    if (!user) {
      console.log("No user found for role:", role);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(
        "Password mismatch for:",
        role === "student" ? admissionNumber : email
      );
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        grade: user.grade,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log(
      "Login successful:",
      user.name,
      "| Role:",
      user.role,
      "| Grade:",
      user.grade,
      "| ID:",
      user._id
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        admissionNumber: user.admissionNumber,
        grade: user.grade,
        photoUrl: user.photoUrl,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};