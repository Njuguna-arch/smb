import 'dotenv/config';
import cloudinary from './src/config/cloudinary.js';

const fileUrl = "https://res.cloudinary.com/dhc0swph1/raw/upload/v1785433540/quizzes/1785433540528-Grade_7_Agriculture_Exam.pdf";
const parts = fileUrl.split('/upload/');
let publicId = parts[1].replace(/^v\d+\//, '');
publicId = decodeURIComponent(publicId);

console.log("Public ID:", publicId);
const signedUrl = cloudinary.url(publicId, { sign_url: true, resource_type: "raw" });
console.log("Signed URL:", signedUrl);
