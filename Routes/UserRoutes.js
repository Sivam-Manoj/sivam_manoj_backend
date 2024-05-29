const express = require("express");
const router = express.Router();
const {
  login,
  createUser,
  getMe,
  logOut,
} = require("../Controllers/UserController");
const { protect } = require("../Middlewares/AuthMiddleware");

router
  .post("/login", login)
  .post("/register", createUser)
  .get("/me", protect, getMe)
  .get("/logout", logOut);

module.exports = router;
