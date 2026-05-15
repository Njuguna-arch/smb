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
      return res.json([]);
    }

    res.json(quizzes);
  } catch (err) {
    console.error("Error fetching quizzes:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const submitQuiz = async (req, res) => {
  const { quizId, selectedOption } = req.body;
  const studentId = req.user.id;

  try {
    const quizDoc = await Quiz.findById(quizId);
    if (!quizDoc) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const isCorrect = quizDoc.correctAnswer === selectedOption;

    const detailedAnswer = {
      quizId,
      subject: quizDoc.subject,
      grade: quizDoc.grade,
      question: quizDoc.question,
      selectedOption,
      correctAnswer: quizDoc.correctAnswer,
      isCorrect,
    };

    await User.findByIdAndUpdate(
      studentId,
      {
        $push: {
          completedQuizzes: {
            answers: [detailedAnswer],
            score: isCorrect ? 1 : 0,
            total: 1,
            attemptedAt: new Date(),
          },
        },
      },
      { returnDocument: "after" }
    );

    res.json({
      score: isCorrect ? 1 : 0,
      total: 1,
      answers: [detailedAnswer],
    });
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

    let quizData = { subject, grade, type };

    if (type === "file" && req.file) {
      // Cloudinary returns a secure URL in req.file.path
      quizData.fileUrl = req.file.path;
    } else if (type === "mcq") {
      quizData.question = question;
      quizData.options = Array.isArray(options) ? options : JSON.parse(options);

      const normalizedOptions = quizData.options.map(opt => opt.trim().toLowerCase());
      const normalizedCorrect = correctAnswer.trim().toLowerCase();
      if (!normalizedOptions.includes(normalizedCorrect)) {
        return res.status(400).json({ message: "Correct answer must match one of the options" });
      }

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

export const downloadQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);

    if (!quiz || !quiz.fileUrl) {
      return res.status(404).json({ message: "Quiz file not found" });
    }

    // Redirect student directly to Cloudinary file URL
    return res.redirect(quiz.fileUrl);
  } catch (err) {
    console.error("Error in downloadQuiz:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
