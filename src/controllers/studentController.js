import User from "../models/User.js";

export const getStudentById = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: "student" });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const baseUrl = "https://raw.githubusercontent.com/Njuguna-arch/smb/main/uploads/";
    
    res.json({
      _id: student._id,
      id: student._id,
      name: student.name,
      admissionNumber: student.admissionNumber || "N/A",
      grade: student.grade,
      email: student.email,
      photoUrl: student.photoUrl ? (student.photoUrl.startsWith("http") ? student.photoUrl : `${baseUrl}${student.photoUrl}`) : null,
      gender: student.gender,
      dateOfBirth: student.dateOfBirth,
      classTeacher: student.classTeacher,
      schoolCode: student.schoolCode,
    });
  } catch (err) {
    console.error("Error fetching student:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateStudentById = async (req, res) => {
  try {
    const { name, admissionNumber, grade, email, photoUrl, gender, dateOfBirth, classTeacher } = req.body;

    const updatedStudent = await User.findOneAndUpdate(
      { _id: req.params.id, role: "student" },
      {
        name,
        admissionNumber,
        grade,
        email,
        photoUrl,
        gender,
        dateOfBirth,
        classTeacher,
      },
      { new: true }
    ).lean();

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    const baseUrl = "https://raw.githubusercontent.com/Njuguna-arch/smb/main/uploads/";
    updatedStudent.photoUrl = updatedStudent.photoUrl
      ? (updatedStudent.photoUrl.startsWith("http") ? updatedStudent.photoUrl : `${baseUrl}${updatedStudent.photoUrl}`)
      : null;

    res.json(updatedStudent);
  } catch (err) {
    console.error("Error updating student:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCompletedQuizzes = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: "student" })
      .populate("completedQuizzes");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student.completedQuizzes || []);
  } catch (err) {
    console.error("Error fetching completed quizzes:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};