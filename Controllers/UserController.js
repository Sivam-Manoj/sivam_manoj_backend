const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const { GenerateToken } = require("../Utils/GenerateToken");

// Create a new user
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter details for required fields");
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be 8 characters or longer" });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message:
        "Email already exists, please login or use another email address",
    });
  }

  const user = new User({ name, email, password });
  await user.save();

  // Generate token and respond
  GenerateToken(res, user._id);
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    message: "User registered successfully",
  });
});

// Login an existing user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter details for required fields");
  }

  const user = await User.findOne({ email });

  if (user && (await user.checkPassword(password))) {
    GenerateToken(res, user._id);
    return res
      .status(200)
      .json({ message: `User: ${user.name} logged in successfully` });
  } else {
    return res.status(400).json({ message: "Invalid password" });
  }
});

const getMe = asyncHandler(async (req, res) => {
  // req.user is set in the protect middleware
  const user = await req.user;

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const logOut = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ message: `user logged out succesfully` });
});

module.exports = {
  login,
  createUser,
  getMe,
  logOut,
};
