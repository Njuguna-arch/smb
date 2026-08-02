import 'dotenv/config';
import cloudinary from './src/config/cloudinary.js';

const publicId = "quizzes/1785433540528-Grade / Agriculture Exam.pdf";

try {
  const url = cloudinary.utils.private_download_url(publicId, "raw", { attachment: true });
  console.log("Private Download URL:", url);
} catch (e) {
  console.error("Error:", e.message);
}
