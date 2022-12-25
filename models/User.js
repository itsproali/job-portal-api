const mongoose = require("mongoose");
const validator = require("validator");
// const generateConfirmationToken = require("../middleware/generateConfirmationToken");
const hashPassword = require("../middleware/hashPassword");
const { ObjectId } = mongoose.Schema.Types;
const crypto = require('crypto');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Enter a valid Email"],
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minNumbers: 1,
            minUppercase: 1,
            minLowercase: 2,
            minSymbol: 1,
          }),
        message: "Try to choose a Strong Password",
      },
    },
    role: {
      type: String,
      trim: true,
      required: true,
      enum: [
        {
          values: ["Candidate", "Hiring Manager", "Admin"],
          message: "Role must be Candidate/Hiring Manager/Admin",
        },
      ],
    },
    postedJob: [{ type: ObjectId, ref: "Job" }],
    appliedJob: [{ type: ObjectId, ref: "Job" }],
    confirmationToken: String,
    confirmationTokenExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", hashPassword);

userSchema.pre("save", function () {
  if (this.role !== "Candidate") {
    this.appliedJob = undefined;
  } else {
    this.postedJob = undefined;
  }
});

userSchema.methods.confirmation = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.confirmationToken = token;
  const date = new Date();
  date.setDate(date.getDate() + 1);
  this.confirmationTokenExpires = date;
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
