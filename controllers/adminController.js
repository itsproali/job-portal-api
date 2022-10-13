const User = require("../models/User");

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
