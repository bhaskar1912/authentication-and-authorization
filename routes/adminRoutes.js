const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMIddleware");
const router = express.Router();
router.get("/welcome", authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: "welcome to admin page",
  });
});

module.exports = router;
