const Job = require("../models/Job");
const User = require("../models/User");

// Get All Jobs with pagination and sorting
exports.getAllJobs = async (req, res, next) => {
  try {
    let { sort } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const data = await Job.find(
      {},
      { candidates: 0 },
      {
        skip,
        limit,
        sort,
      }
    );
    const totalData = await Job.countDocuments();

    res
      .status(200)
      .send({ success: true, page, dataCount: data.length, totalData, data });
  } catch (error) {
    next(error);
  }
};

// Get specific Job by id
exports.getSpecificJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const data = await Job.findOne({ _id: jobId }, { candidates: 0 }).populate(
      "manager.id"
    );

    if (!data) {
      return res
        .status(400)
        .send({ success: false, message: "Couldn't found any data" });
    }

    data.manager.id.password = undefined;
    res.status(200).send({ success: false, data });
  } catch (error) {
    next(error);
  }
};

// Apply to a job
exports.applyJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const userId = req.user._id;

    const user = await User.findOne({ _id: userId });
    const isApplied = user.appliedJob.includes(jobId);

    if (isApplied) {
      return res.status(400).send({
        success: false,
        message: "You already applied to this job..!",
      });
    }

    const job = await Job.findOne({ _id: jobId });

    if (job.deadline < Date.now) {
      return res.status(400).send({
        success: false,
        message: "This job is no more available..!",
      });
    }

    const data = await Job.updateOne(
      { _id: jobId },
      { $push: { candidates: req.body }, $inc: { candidateCount: 1 } }
    );

    const result = await User.updateOne(
      { _id: userId },
      { $push: { appliedJob: jobId } }
    );

    res.status(200).send({ success: true, message: "Applied successfully" });
  } catch (error) {
    next(error);
  }
};
