const router = require("express").Router();
const {
  getAllJobs,
  getSpecificJob,
  applyJob,
} = require("../controllers/candidateController");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");

router.use(verifyToken);
router.use(authorization("Candidate"));

router.get("/", getAllJobs);
router.get("/:id", getSpecificJob);
router.post("/:id/apply", applyJob);

module.exports = router;
