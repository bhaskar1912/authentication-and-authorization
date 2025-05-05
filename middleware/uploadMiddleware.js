const multer = require("multer");
const path = require("path");

//set our multer storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// file filter function

const checkFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
    console.log("file type is valid");
  } else {
    cb(new Error("invalid file type"));
  }
};

// multer middleware
const upload = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, //5mb file size limits
  },
});

module.exports = upload;
