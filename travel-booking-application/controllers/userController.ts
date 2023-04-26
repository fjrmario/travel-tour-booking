const User = require("../models/User.ts");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "successfully created",
      data: savedUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again later" });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, email, password, confirmPassword } = req.body;
  try {
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let salt;
    let hash;
    if (password) {
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

      salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username: username,
          email: email,
          password: hash,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update",
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to delete",
    });
  }
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    res.status(200).json({
      success: true,
      message: "found successfully",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    const user = await User.find({});

    res.status(200).json({
      success: true,
      message: "found successfully",
      data: User,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

module.exports = {
  createUser,
  deleteUser,
  getSingleUser,
  getAllUser,
  updateUser,
};
