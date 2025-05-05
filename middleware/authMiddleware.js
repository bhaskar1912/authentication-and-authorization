const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denined no token provided please login to continue",
    });
  }

  //decode the token
  try {
    const decodeTokenInfo = jwt.verify(token, process.env.JWT_SECREAT_KEY);
    console.log(decodeTokenInfo);

    req.userInfo = decodeTokenInfo;
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Access denined no token provided please login to continue",
    });
  }
};

module.exports = authMiddleware;
