import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, admissionNumber, password, role, schoolCode } = req.body;

  try {
    let user;

    if (role === "student") {
      let code = schoolCode ? schoolCode.trim().toUpperCase() : "LA";
      const clean = admissionNumber?.trim().toUpperCase().replace(new RegExp(`^${code}`), "");
      const normalizedAdmission = `${code}${clean}`;
      user = await User.findOne({
        admissionNumber: normalizedAdmission,
        role: "student",
        schoolCode,
      });
    } else if (role === "superadmin") {
      const normalizedEmail = email?.trim().toLowerCase();
      user = await User.findOne({ email: normalizedEmail, role: "superadmin" });
    } else {
      const normalizedEmail = email?.trim().toLowerCase();
      user = await User.findOne({ email: normalizedEmail, role, schoolCode });
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
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Build GitHub raw URL for photo
    const baseUrl = "https://raw.githubusercontent.com/Njuguna-arch/smb/main/uploads/";
    const photoUrl = user.photoUrl ? `${baseUrl}${user.photoUrl}` : null;

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        admissionNumber: user.admissionNumber,
        grade: user.grade,
        photoUrl,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        schoolCode: user.schoolCode,
        classTeacher: user.classTeacher,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
