const jwt = require("jsonwebtoken");

exports.generateToken = (userData) => {
  console.log(userData);
  const token = jwt.sign(userData, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
