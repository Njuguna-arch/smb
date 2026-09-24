import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    admissionNumber: {
      type: String,
      required: function () {
        return this.role === "student";
      },
      sparse: true,
      trim: true,
    },

    email: {
      type: String,
      required: function () {
        return this.role !== "student";
      },
      sparse: true, // changed from unique globally to compound below
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["student", "teacher", "admin", "superadmin"],
      required: true,
      lowercase: true,
      trim: true,
    },

    schoolCode: {
      type: String,
      required: function () {
        return this.role !== "superadmin";
      },
      trim: true,
    },

    grade: { type: String, trim: true },
    photoUrl: { type: String, default: "default-avatar.png" },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      lowercase: true,
      trim: true,
    },

    dateOfBirth: { type: Date },

    classTeacher: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "teacher";
      },
    },

    completedQuizzes: [
      {
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
        answers: [
          {
            quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
            subject: String,
            grade: String,
            question: String,
            selectedOption: String,
            correctAnswer: String,
            isCorrect: Boolean,
          },
        ],
        score: { type: Number },
        total: { type: Number },
        attemptedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Compound indexes for multi-tenancy
userSchema.index({ admissionNumber: 1, schoolCode: 1 }, { unique: true, sparse: true });
userSchema.index({ email: 1, schoolCode: 1 }, { unique: true, sparse: true });

userSchema.pre("save", async function () {
  if (this.isModified("admissionNumber") && this.role === "student" && this.admissionNumber) {
    const clean = this.admissionNumber.trim().toUpperCase().replace(/^LA/, "");
    this.admissionNumber = "LA" + clean;
  }

  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);

