const jwt = require("jsonwebtoken");

const GenerateToken = (res, userid) => {
  const SecretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ userid }, SecretKey, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_DEV === "production",
    maxAge: 1*60*60*1000
  });
};

module.exports = {
  GenerateToken,
};
