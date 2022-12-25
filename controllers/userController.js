const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utilities/generateToken");
const { sendEmail } = require("../utilities/email");

// Register a new User
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    const token = user.confirmation();
    const data = {
      to: req.body.email,
      subject: "Account Confirmation",
      html: `<h2>Hello ${req.body.name}</h2>
      <p>Welcome to Job Portal Api. Thank you so much for choosing us.</p>
      <p>Please Active your account below.</p>
      <a href="http://localhost:5000/user/signup/confirmation/${token}" target="_blank">
        <button style="background-color: #4169e1; padding: 8px 15px; border-radius: 5px; color: white; border: none; cursor:pointer;">Active Account</button>
      </a>`,
    };

    await user.save({ validateBeforeSave: false });
    console.log(data);
    sendEmail(data);
    res
      .status(200)
      .send({ success: true, message: "User Created Successfully" });
  } catch (error) {
    next(error);
  }
};

// User Login
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
    const token = generateToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });

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

// Account Verification
exports.confirmation = async (req, res, next) => {
  try {
    const { confirmationToken } = req.params;
    const user = await User.findOne({ confirmationToken });

    if (!user) {
      return res
        .status(403)
        .send({ success: false, message: "Invalid Token Found" });
    }

    const isExpired = Date.now() > user.confirmationToken;

    if (isExpired) {
      return res
        .status(401)
        .send({ success: false, message: "Verification time Out" });
    }

    user.confirmationToken = undefined;
    user.confirmationTokenExpires = undefined;

    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .send({ success: true, message: "Account has been verified" });
  } catch (error) {
    next(error);
  }
};
