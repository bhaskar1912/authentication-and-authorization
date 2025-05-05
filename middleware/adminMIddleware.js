const adminMiddleware = (req, res, next) => {
  console.log("admin");
  if (req.userInfo.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied: admin rights required",
    });
  }
  next();
};

module.exports = adminMiddleware;
