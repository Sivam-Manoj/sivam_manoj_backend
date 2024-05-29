const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Find the user by ID and attach to the request object, excluding password
      req.user = await User.findById(decoded.userid).select("-password");

      // Proceed to the next middleware
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  } else {
    // No token found in cookies
    res.status(401);
    throw new Error("Not authorized, no token found");
  }
});

module.exports = {
  protect,
};
