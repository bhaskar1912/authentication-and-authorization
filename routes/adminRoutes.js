const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const isAdminUser = require("../middleware/adminMIddleware");
const router = express.Router();
router.get("/welcome", authMiddleware, isAdminUser, (req, res) => {
  res.json({
    message: "welcome to admin page",
  });
});

module.exports = router;
