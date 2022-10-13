const User = require("../models/User");
const Job = require("../models/Job");

// Get All Candidates
exports.getAllCandidates = async (req, res, next) => {
  try {
    const data = await User.find(
      { role: "Candidate" },
      { password: 0 },
      { runValidators: true }
    );
    res.status(200).send({ success: true, totalCandidate: data.length, data });
  } catch (error) {
    next(error);
  }
};

// Get a specific Candidate Details by id
exports.getCandidateDetails = async (req, res, next) => {
  try {
    const candidateId = req.params.id;
    const data = await User.findOne(
      { _id: candidateId },
      { password: 0 }
    ).populate("appliedJob");

    data.appliedJob.candidates = undefined;

    res.status(200).send({ success: true, data });
  } catch (error) {
    next(error);
  }
};

// Get All Hiring Manger
exports.getAllManager = async (req, res, next) => {
  try {
    const data = await User.find(
      { role: "Hiring Manager" },
      { password: 0 },
      { runValidators: true }
    );
    res.status(200).send({ success: true, totalManager: data.length, data });
  } catch (error) {
    next(error);
  }
};

// Top 10 paid Jobs
exports.getTopPaidJobs = async (req, res, next) => {
  try {
    const data = await Job.find({}, null, { sort: { salary: -1 }, limit: 10 });

    res.status(200).send({ success: true, data });
  } catch (error) {
    next(error);
  }
};

// Top 5 applied Jobs
exports.getTopAppliedJobs = async (req, res, next) => {
  try {
    const data = await Job.find({}, null, {
      sort: { applyCont: -1 },
      limit: 5,
    });

    res.status(200).send({ success: true, data });
  } catch (error) {
    next(error);
  }
};
