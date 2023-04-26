const User = require("../models/User.ts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 special character",
      });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Confirm Password must match Password" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hash,
      photo: req.body.photo,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully registered",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to register. Try again later",
    });
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const checkForPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkForPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const { password, role, ...rest } = user._doc;

    const token = jwt.sign(
      { id: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", token, {
      expires: token.expiresIn,
    });
    console.log(req.cookies);

    return res.status(200).json({
      sucesss: true,
      message: "successfully login",
      token,
      role,
      data: {
        ...rest,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to login",
    });
  }
};

module.exports = {
  register,
  login,
};
