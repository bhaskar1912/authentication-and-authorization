const isAdminUser = (req, res, next) => {
  if (req.userInfo.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "access denied admin rights required",
    });
  }
  next();
};
module.exports = isAdminUser;
