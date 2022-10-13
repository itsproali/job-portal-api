const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 6,
      maxLength: 100,
      trim: true,
      required: [true, "Must need a Job Title..!"],
    },
    description: {
      type: String,
      minLength: [50, "Job Description shouldn't be less then 50 character..!"],
      trim: true,
      required: [true, "Must need a Job Description..!"],
    },
    skills: [String],
    location: {
      type: String,
      trim: true,
      required: [true, "Job Location is required..!"],
    },
    type: {
      type: String,
      required: [true, "Job Type is required..!"],
      enum: [
        {
          values: ["Full-time", "Part-time", "Contract", "Internship", "Other"],
          message:
            "Job Type should be: Full-time/Part-time/Contract/Internship/Other",
        },
      ],
    },
    salary: {
      type: Number,
      min: 0,
      required: [true, "Salary is a required field..!"],
    },
    deadline: {
      type: Date,
      required: [true, "Deadline is required in this format: YYYY-MM-DD"],
      match: [
        /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
        "Must be follow this pattern: YYYY-MM-DD",
      ],
      min: Date.now(),
    },
    manager: {
      name: String,
      id: { type: ObjectId, required: true, ref: "User" },
    },
    candidates: [
      {
        name: {
          type: String,
          required: [true, "Provide a candidate name..!"],
        },
        id: {
          type: ObjectId,
          required: [true, "User id is required"],
          ref: "User",
        },
        resume: String,
      },
    ],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
