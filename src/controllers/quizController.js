import path from "path";
import Quiz from "../models/Quiz.js";
import User from "../models/User.js";

export const getQuizzes = async (req, res) => {
  const { grade, subject } = req.query;
  const studentId = req.user.id;

  try {
    const filter = {};

    if (grade) {
      const match = grade.replace(/\+/g, " ").match(/\d+/);
      const normalizedGrade = match ? match[0] : grade;
      filter.grade = { $regex: new RegExp(normalizedGrade, "i") };
    }

    if (subject) {
      filter.subject = { $regex: new RegExp(subject, "i") };
    }

    const student = await User.findById(studentId).select("completedQuizzes");

    if (student && student.completedQuizzes.length > 0) {
      const completedIds = student.completedQuizzes.map((cq) => cq.quiz);
      filter._id = { $nin: completedIds };
    }

    const quizzes = await Quiz.find(filter);

    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found" });
    }

    res.json(quizzes);
  } catch (err) {
    console.error("Error fetching quizzes:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const submitQuiz = async (req, res) => {
  const { quizId, answers } = req.body;
  const studentId = req.user.id;

  try {
    let score = 0;

    await Promise.all(
      answers.map(async (ans) => {
        const quiz = await Quiz.findById(ans.questionId);
        if (quiz && quiz.correctAnswer === ans.selectedOption) {
          score++;
        }
      })
    );

    const total = answers.length;

    if (studentId && quizId) {
      await User.findByIdAndUpdate(
        studentId,
        {
          $push: {
            completedQuizzes: {
              quiz: quizId,
              score,
              total,
              attemptedAt: new Date(),
            },
          },
        },
        { new: true }
      );
    }

    res.json({ score, total });
  } catch (err) {
    console.error("Error submitting quiz:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Quiz.distinct("subject");
    res.json(subjects);
  } catch (err) {
    console.error("Error fetching subjects:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const addQuiz = async (req, res) => {
  try {
    const { subject, grade, question, options, correctAnswer, type } = req.body;

    let quizData = {
      subject,
      grade,
      type,
    };

    const baseUrl = process.env.BASE_URL || "http://localhost:5000";

    if (type === "file" && req.file) {
      quizData.fileUrl = `${baseUrl}/uploads/quizzes/${req.file.filename}`;
    } else if (type === "mcq") {
      quizData.question = question;
      quizData.options = Array.isArray(options)
        ? options
        : JSON.parse(options);
      quizData.correctAnswer = correctAnswer;
    } else {
      return res.status(400).json({ message: "Invalid quiz type" });
    }

    const quiz = new Quiz(quizData);
    await quiz.save();

    res.status(201).json({ message: "Quiz added successfully", quiz });
  } catch (err) {
    console.error("Error adding quiz:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

//New: Download quiz
export const downloadQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);

    if (!quiz || !quiz.fileUrl) {
      return res.status(404).json({ message: "Quiz file not found" });
    }

    // Resolve file path on server
    const filePath = path.resolve(`.${quiz.fileUrl.replace(/^.*\/uploads/, "uploads")}`);

    // Force download instead of inline open
    res.download(filePath, path.basename(filePath), (err) => {
      if (err) {
        console.error("Error downloading quiz:", err);
        res.status(500).json({ message: "Failed to download quiz" });
      }
    });
  } catch (err) {
    console.error("Error in downloadQuiz:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
