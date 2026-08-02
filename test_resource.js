import 'dotenv/config';
import cloudinary from './src/config/cloudinary.js';

const publicId = "quizzes/1785433431648-Grade_7_English_Exam.pdf";

cloudinary.api.resource(publicId, { resource_type: 'raw' })
  .then(res => console.log("Found:", res.public_id, res.format, res.url))
  .catch(err => console.error("Error finding resource:", err));
