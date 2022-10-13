const { ObjectId } = require("mongodb");
const Job = require("../models/Job");
const User = require("../models/User");

// Post a New Job
exports.postJob = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const result = await Job.create(req.body);
    console.log(userId, result);
    if (result._id) {
      await User.updateOne(
        { _id: userId },
        { $push: { postedJob: result._id } }
      );
    }
    res.status(200).send({ success: true, message: "Job Posted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get jobs for a specific Manager
exports.getJobs = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const data = await User.findOne({ _id: userId })
      .populate("postedJob")
      .select("postedJob"); // If doesn't need user (manager) data
    if (!data) {
      return res
        .status(204)
        .send({ success: true, message: "No Job Found..!" });
    }
    res.status(200).send({ success: true, data });
  } catch (error) {
    next(error);
  }
};

// Get a single jobs by its id
exports.getJobById = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const data = await Job.findOne({ _id: jobId });
    if (!data) {
      return res
        .status(204)
        .send({ success: true, message: "No Job Found..!" });
    }
    res.status(200).send({ success: true, data });
  } catch (error) {
    next(error);
  }
};

// Update a specific Job
exports.updateJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
   /*  Job Poster validation
    //   const userId = ObjectId(req.user._id);
    // const job = await Job.findOne({ _id: jobId });
    // console.log(userId, job.manager.id);
    // if (job?.manager?.id !== userId) {
    //   return res.status(401).send({
    //     success: false,
    //     message: "You haven't access to update this job..!",
    //   });
    // } */
    
    const result = await Job.updateOne({ _id: jobId }, req.body, {
      runValidators: true,
    });

    if (!result.modifiedCount) {
      return res
        .status(400)
        .send({ success: false, message: "Couldn't update the job" });
    }
    res
      .status(200)
      .send({ success: true, message: "Successfully updated the job" });
  } catch (error) {
    next(error);
  }
};
