import ExamResult from "../models/ExamResult.js";
import Discipline from "../models/Discipline.js";
import User from "../models/User.js";
import fs from "fs";
import csv from "csv-parser";

// Upload exam results from CSV
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

// Add discipline comment
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

// Get class performance for teacher
const getClassPerformance = async (req, res) => {
  try {
    const teacherClass = req.user?.className || req.user?.grade;
    if (!teacherClass) {
      return res.status(403).json({ message: "No class assigned to this teacher" });
    }

    const { examType, term, year } = req.query;

    const matchStage = { className: teacherClass };
    if (examType) matchStage.examType = examType;
    if (term) matchStage.term = term;
    if (year) matchStage.year = Number(year);

    console.log("🔍 Match stage:", matchStage);

    // Subject averages
    const subjectAverages = await ExamResult.aggregate([
      { $match: matchStage },
      { $unwind: "$subjectResults" },
      {
        $match: {
          "subjectResults.subject": { $exists: true, $ne: "" },
          "subjectResults.score": { $exists: true, $ne: null },
        },
      },
      {
        $project: {
          subject: "$subjectResults.subject",
          score: {
            $convert: {
              input: "$subjectResults.score",
              to: "double",
              onError: 0,
              onNull: 0,
            },
          },
        },
      },
      {
        $group: {
          _id: "$subject",
          avgScore: { $avg: "$score" },
        },
      },
      {
        $project: {
          subject: "$_id",
          average: "$avgScore",
          _id: 0,
        },
      },
    ]);

    // Overall performance
    const overall = await ExamResult.aggregate([
      { $match: matchStage },
      { $unwind: "$subjectResults" },
      {
        $match: {
          "subjectResults.subject": { $exists: true, $ne: "" },
          "subjectResults.score": { $exists: true, $ne: null },
        },
      },
      {
        $project: {
          score: {
            $convert: {
              input: "$subjectResults.score",
              to: "double",
              onError: 0,
              onNull: 0,
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalScore: { $sum: "$score" },
          meanScore: { $avg: "$score" },
        },
      },
    ]);

    const totalScore = overall.length > 0 ? overall[0].totalScore : 0;
    const meanScore = overall.length > 0 ? overall[0].meanScore : 0;

    res.json({
      performance: subjectAverages,
      totalScore,
      meanScore,
    });
  } catch (err) {
    console.error("Error fetching class performance:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get student completed quizzes
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
  getClassPerformance,
  getStudentCompletedQuizzes,
};
