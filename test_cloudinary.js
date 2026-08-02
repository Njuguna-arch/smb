import 'dotenv/config';
import cloudinary from './src/config/cloudinary.js';

const url = "https://res.cloudinary.com/dhc0swph1/raw/upload/v1785433540/quizzes/1785433540528-Grade / Agriculture Exam.pdf";
const parts = url.split('/upload/');
let publicId = parts[1];
if (publicId.match(/^v\d+\//)) {
    publicId = publicId.replace(/^v\d+\//, '');
}
publicId = decodeURIComponent(publicId);
console.log("Public ID:", publicId);

const signed = cloudinary.url(publicId, { sign_url: true, resource_type: "raw" });
console.log("Signed URL:", signed);
