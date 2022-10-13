const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utilities/generateToken");

exports.createUser = async (req, res, next) => {
  try {
    const result = await User.create(req.body);
    res
      .status(200)
      .send({ success: true, message: "User Created Successfully" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check email and password given or not
    if (!email || !password) {
      return res
        .status(401)
        .send({ success: false, message: "Please Provide Email and Password" });
    }

    // Check the user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ success: false, message: "No User Found" });
    }

    // Check the password
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .send({ success: false, message: "Password is Invalid" });
    }

    // Generate token
    const token = generateToken({ email: user.email, role: user.role });

    res
      .status(200)
      .send({ success: true, token, message: "Successfully logged In" });
  } catch (error) {
    next(error);
  }
};

// Get User Information
exports.getUserInfo = async (req, res, next) => {
  try {
    const { email } = req.user;
    const data = await User.findOne({ email });
    data.password = undefined;
    res.status(200).send({ success: true, data });
  } catch (error) {
    next(error);
  }
};
