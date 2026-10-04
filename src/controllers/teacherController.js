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

const getClassPerformance = async (req, res) => {
  try {
    const rawClass =
      req.query.className ||
      req.user?.classTeacher ||
      req.user?.className ||
      req.user?.grade;

    if (!rawClass || rawClass.toLowerCase() === "null" || rawClass.trim() === "") {
      return res.json({
        performance: [],
        totalScore: 0,
        meanScore: 0,
        message: "No class assigned to this teacher",
      });
    }

    const { examType, term, year } = req.query;

    const cleanClass = rawClass.replace(/^Grade\s*/i, "").trim();
    const matchStage = {
      className: { $regex: new RegExp(`^(Grade\\s*)?${cleanClass}$`, "i") },
    };

    if (examType && examType.trim()) {
      matchStage.examType = { $regex: new RegExp(`^${examType.trim()}$`, "i") };
    }
    if (term && term.trim()) {
      matchStage.term = { $regex: new RegExp(`^${term.trim()}$`, "i") };
    }
    if (year && !isNaN(Number(year))) {
      matchStage.year = Number(year);
    }

    console.log("🔍 Match stage:", matchStage);

    const subjectAverages = await ExamResult.aggregate([
      { $match: matchStage },
      { $unwind: "$subjectResults" },
      {
        $match: {
          $or: [
            { "subjectResults.subjectName": { $exists: true, $ne: "" } },
            { "subjectResults.subject": { $exists: true, $ne: "" } },
          ],
        },
      },
      {
        $project: {
          subject: {
            $ifNull: ["$subjectResults.subjectName", "$subjectResults.subject"],
          },
          score: {
            $convert: {
              input: {
                $ifNull: ["$subjectResults.marks", "$subjectResults.score"],
              },
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

    const overall = await ExamResult.aggregate([
      { $match: matchStage },
      { $unwind: "$subjectResults" },
      {
        $match: {
          $or: [
            { "subjectResults.subjectName": { $exists: true, $ne: "" } },
            { "subjectResults.subject": { $exists: true, $ne: "" } },
          ],
        },
      },
      {
        $project: {
          score: {
            $convert: {
              input: {
                $ifNull: ["$subjectResults.marks", "$subjectResults.score"],
              },
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
    console.error("Error fetching class performance:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getStudentCompletedQuizzes = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { subject } = req.query;

    const student = await User.findById(studentId).populate(
      "completedQuizzes.quiz",
      "subject grade question options correctAnswer type fileUrl"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    let completed = student.completedQuizzes || [];
    if (subject && subject.trim() && subject.toLowerCase() !== "all") {
      const subjectRegex = new RegExp(`^${subject.trim()}$`, "i");
      completed = completed.filter((item) => {
        const quizSubject =
          item.quiz?.subject ||
          item.answers?.[0]?.subject ||
          item.subject;
        return quizSubject && subjectRegex.test(quizSubject.trim());
      });
    }

    res.json(completed);
  } catch (err) {
    console.error("Error fetching student completed quizzes:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export {
  uploadExamCSV,
  addDisciplineComment,
  getClassPerformance,
  getStudentCompletedQuizzes,
};