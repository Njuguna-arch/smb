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
      unique: true,
      sparse: true,
      index: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
      lowercase: true,
      trim: true,
    },

    grade: { type: String, trim: true },
    photoUrl: { type: String },

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
        score: { type: Number },
        total: { type: Number },
        attemptedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);