import ExamResult from "../models/ExamResult.js";
import Discipline from "../models/Discipline.js";
import User from "../models/User.js";
import fs from "fs";
import csv from "csv-parser";
const uploadExamCSV = async (req, res) => {
  try {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        const subjectResults = [];
        for (const key of Object.keys(row)) {
          if (
            key !== "admissionNumber" &&
            key !== "examType" &&
            key !== "className" &&
            key !== "classTeacherComment"
          ) {
            if (row[key] !== undefined && row[key] !== "") {
              subjectResults.push({
                subject: key,
                score: Number(row[key]),
              });
            }
          }
        }

        results.push({
          admissionNumber: row.admissionNumber,
          examType: row.examType,
          subjectResults,
          className: row.className,
          overallComment: row.classTeacherComment,
          year: new Date().getFullYear(),
          uploadedBy: req.user.id,
          sourceFile: req.file.originalname,
        });
      })
      .on("end", async () => {
        await ExamResult.insertMany(results);
        res.json({
          message: "CSV exam results uploaded successfully",
          count: results.length,
        });
      });
  } catch (err) {
    console.error("Error uploading CSV:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const addDisciplineComment = async (req, res) => {
  const { studentId, comment } = req.body;
  try {
    const discipline = await Discipline.create({
      studentId,
      teacherId: req.user.id,
      comment,
    });
    res.json(discipline);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getStudentCompletedQuizzes = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await User.findById(studentId).populate(
      "completedQuizzes.quiz",
      "subject grade question options correctAnswer"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student.completedQuizzes);
  } catch (err) {
    console.error("Error fetching student completed quizzes:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  uploadExamCSV,
  addDisciplineComment,
  getStudentCompletedQuizzes,
};