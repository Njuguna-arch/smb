import School from "../models/School.js";
import User from "../models/User.js";

export const getSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch schools" });
  }
};

export const addSchool = async (req, res) => {
  try {
    const { name, code, address } = req.body;
    if (!name || !code) {
      return res.status(400).json({ message: "Name and code are required" });
    }
    const existing = await School.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: "School with this code already exists" });
    }
    const school = new School({ name, code, address });
    await school.save();
    res.json(school);
  } catch (err) {
    res.status(500).json({ message: "Failed to add school" });
  }
};

export const removeSchool = async (req, res) => {
  try {
    const { code } = req.params;
    const school = await School.findOneAndDelete({ code });
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }
    // Delete associated data (Optional, for now just users)
    await User.deleteMany({ schoolCode: code });
    res.json({ message: "School and associated users removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove school" });
  }
};
