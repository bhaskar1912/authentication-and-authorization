const express = require("express");
const {
  registerUser,
  loginUser,
  changePassword,
  forgetPassword,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//all routes are related to auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forget-password", forgetPassword);
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;
