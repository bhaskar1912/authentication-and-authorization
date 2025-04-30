const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// register controller
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    //check the user is exist or not

    const checkExistingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "user is already exist",
      });
    }

    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create a new user and save in your database
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newlyCreatedUser.save();
    if (newlyCreatedUser) {
      return res.status(201).json({
        success: true,
        message: "user registered successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "unbale to register user please try again",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error occured please try again",
    });
  }
};
//login controller
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // find if the user exist or not

    const user = await User.findOne({ username });

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "User dosen't exist",
      });
    }

    // if the password is correct or not

    const isPassowrdMatch = await bcrypt.compare(password, user.password);
    if (!isPassowrdMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    //create user token

    const accessToken = jwt.sign(
      {
        userId: user._id,
        userName: user.username,
        role: user.role,
      },
      process.env.JWT_SECREAT_KEY,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({
      success: true,
      message: "login successfull",
      accessToken: accessToken,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error occured please try again",
    });
  }
};

module.exports = { registerUser, loginUser };
