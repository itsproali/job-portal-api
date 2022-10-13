const bcrypt = require("bcryptjs");

const hashPassword = function (next) {
  const password = this.password;
  const hash = bcrypt.hashSync(password);
  this.password = hash;
  next();
};

module.exports = hashPassword;
