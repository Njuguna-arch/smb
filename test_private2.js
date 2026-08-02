import cloudinary from 'cloudinary';
cloudinary.v2.config({ cloud_name: 'test', api_key: 'test', api_secret: 'test' });
const url = cloudinary.v2.utils.private_download_url("quizzes/1785433540528-Grade _/ Agriculture Exam.pdf", "", { resource_type: "raw", attachment: true });
console.log(url);
