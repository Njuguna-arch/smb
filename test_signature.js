import 'dotenv/config';
import cloudinary from './src/config/cloudinary.js';

const fileUrl = "https://res.cloudinary.com/dhc0swph1/raw/upload/v1785433540/quizzes/1785433540528-Grade%20/%20Agriculture%20Exam.pdf";
const parts = fileUrl.split('/upload/');
let publicId = parts[1].replace(/^v\d+\//, '');
console.log("Extracted publicId (raw):", publicId);
console.log("Decoded:", decodeURIComponent(publicId));

const signedUrl1 = cloudinary.url(decodeURIComponent(publicId), { sign_url: true, resource_type: "raw" });
console.log("Signed with decoded:", signedUrl1);

const signedUrl2 = cloudinary.url(publicId, { sign_url: true, resource_type: "raw" });
console.log("Signed with encoded:", signedUrl2);
