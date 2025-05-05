// cloudinary.js (or cloudinaryHelper.js)
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export the configured cloudinary instance for use in other parts of your app
module.exports = cloudinary;
