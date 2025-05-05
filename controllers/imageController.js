const Image = require("../models/image");

const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadImageController = async (req, res) => {
  console.log("File received:", req.file);

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "file is missing,please upload",
    });
  }

  try {
    const { url, publicId } = await uploadToCloudinary(req.file.path);
    console.log("hii");
    const newlyUploadedImage = await Image.create({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    //delete file from local storage

    // fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "image uploaded successfully",
      data: newlyUploadedImage,
    });
  } catch (e) {
    console.error("Upload error:", e);
    res.status(500).json({
      success: false,
      message: "error occurred please try again",
    });
  }
};

const fetchImagesController = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({
      success: true,
      message: "images fetched successfully",
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error occurred please try again",
    });
  }
};

const deleteImageController = async (req, res) => {
  try {
    const imageId = req.params.id;
    const uderId = req.userInfo.userId;

    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    //check if this image is uploaded by current user who is trying to delete the image
    if (image.uploadedBy.toString() !== uderId) {
      res.status(403).json({
        success: false,
        message: "you are not authorized to delete this image",
      });
    }
    //delete image from cloudinary
    await cloudinary.uploader.destroy(image.publicId);
    //delete image from database
    await Image.findByIdAndDelete(imageId);
    res.status(200).json({
      success: true,
      message: "image deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error occurred please try again",
    });
  }
};

module.exports = {
  uploadImageController,
  fetchImagesController,
  deleteImageController,
};
