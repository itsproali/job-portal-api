const router = require("express").Router();
const {
  postJob,
  getJobs,
  getJobById,
  updateJob,
} = require("../controllers/managerController");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization")

// Verify Authentication & Authorization
router.use(verifyToken);
router.use(authorization("Admin", "Hiring Manager"));

router.route("/jobs").post(postJob).get(getJobs);

router.route("/jobs/:id").get(getJobById).patch(updateJob);

module.exports = router;
