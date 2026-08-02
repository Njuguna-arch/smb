import mongoose from 'mongoose';
import 'dotenv/config';
import Quiz from './src/models/Quiz.js';

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const quizzes = await Quiz.find({ type: 'file' });
  for (const q of quizzes) {
    console.log("Quiz ID:", q._id, "fileUrl:", q.fileUrl);
  }
  mongoose.disconnect();
}).catch(console.error);
