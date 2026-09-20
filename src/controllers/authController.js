import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, admissionNumber, password, role, schoolCode } = req.body;

  try {
    console.log("Login payload received:", req.body);
    let user;

    if (role === "superadmin") {
      const normalizedEmail = email?.trim().toLowerCase();
      user = await User.findOne({ email: normalizedEmail, role: "superadmin" });
    } else {
      if (!schoolCode) {
        return res.status(400).json({ message: "School code is required" });
      }

      if (role === "student") {
        const clean = admissionNumber?.trim().toUpperCase().replace(/^LA/, "");
        const normalizedAdmission = admission.trim().toUpperCase();

        user = await User.findOne({
          admissionNumber: normalizedAdmission,
          role: "student",
          schoolCode: schoolCode.trim()
        });
      } else {
        const normalizedEmail = email?.trim().toLowerCase();
        user = await User.findOne({ email: normalizedEmail, role, schoolCode: schoolCode.trim() });
      }
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        grade: user.grade,
        schoolCode: user.schoolCode
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
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
        schoolCode: user.schoolCode
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
