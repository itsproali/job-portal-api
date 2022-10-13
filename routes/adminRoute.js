const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");
const {
  getAllCandidates,
  getCandidateDetails,
  getAllManager,
  getTopPaidJobs,
  getTopAppliedJobs,
} = require("../controllers/adminController");

// Verify Admin
router.use(verifyToken);
router.use(authorization("Admin"));

router.get("/candidates", getAllCandidates);
router.get("/candidate/:id", getCandidateDetails);
router.get("/managers", getAllManager);
router.get("/top-paid-jobs", getTopPaidJobs);
router.get("/top-applied-jobs", getTopAppliedJobs);

module.exports = router;
