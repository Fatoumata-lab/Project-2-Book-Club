const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// giving access to your cloudinary account
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

console.log(process.env.CLOUDINARY_NAME);

// cloudinary : SAAS platform : specialized in images hosting (tools : metadata, image analyzing ...)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary
});

const fileUploader = multer({ storage });
// a middleware designed to parse file from requests and associate to req.file
module.exports = fileUploader;