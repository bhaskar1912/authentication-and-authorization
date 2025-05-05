const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMIddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  uploadImageController,
  fetchImagesController,
  deleteImageController,
} = require("../controllers/imageController");

const router = express.Router();

//upload the all images

router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  uploadImageController
);

router.get("/get", authMiddleware, fetchImagesController);

router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteImageController
);

module.exports = router;
