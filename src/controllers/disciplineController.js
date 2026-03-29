import Discipline from "../models/Discipline.js";
import User from "../models/User.js";

export const addDisciplineRecord = async (req, res) => {
  try {
    const { admissionNumber, comment, type, severity, term, year } = req.body;

    if (!admissionNumber || !comment) {
      return res.status(400).json({ message: "Admission number and comment are required" });
    }

    const student = await User.findOne({ admissionNumber, role: "student" });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const teacher = await User.findById(req.user.id);
    if (!teacher || teacher.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can add discipline records" });
    }

    const discipline = await Discipline.create({
      admissionNumber,
      teacherId: req.user.id,
      teacherName: teacher.name,
      comment,
      type: type || "Minor",
      severity: severity || 1,
      term: term || "Term 1",
      year: year || new Date().getFullYear(),
      resolved: false,
    });

    return res.status(201).json({
      message: "Discipline record added successfully",
      discipline,
    });
  } catch (err) {
    console.error("FULL ERROR TRACE:", err);
    return res.status(500).json({
      message: "Server error while adding discipline record",
      error: err.message,
    });
  }
};

export const getStudentDisciplineRecords = async (req, res) => {
  try {
    const { admissionNumber } = req.params;

    const student = await User.findOne({ admissionNumber, role: "student" });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const records = await Discipline.find({ admissionNumber });
    return res.status(200).json(records);
  } catch (err) {
    console.error("FULL ERROR TRACE:", err);
    return res.status(500).json({
      message: "Server error while fetching discipline records",
      error: err.message,
    });
  }
};

export const resolveDisciplineRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { resolved } = req.body;

    const discipline = await Discipline.findByIdAndUpdate(
      id,
      { resolved },
      { new: true }
    );

    if (!discipline) {
      return res.status(404).json({ message: "Discipline record not found" });
    }

    return res.status(200).json({
      message: `Discipline record marked as ${resolved ? "resolved" : "unresolved"}`,
      discipline,
    });
  } catch (err) {
    console.error("FULL ERROR TRACE:", err);
    return res.status(500).json({
      message: "Server error while updating discipline record",
      error: err.message,
    });
  }
};

export const getAllDisciplineRecords = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || (user.role !== "teacher" && user.role !== "admin")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const records = await Discipline.find().sort({ date: -1 });
    return res.status(200).json(records);
  } catch (err) {
    console.error("FULL ERROR TRACE:", err);
    return res.status(500).json({
      message: "Server error while fetching all discipline records",
      error: err.message,
    });
  }
};