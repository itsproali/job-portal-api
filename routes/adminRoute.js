const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");
const { getAllCandidates } = require("../controllers/adminController");

// Verify Admin
router.use(verifyToken);
router.use(authorization("Admin"));

router.get("/candidates", getAllCandidates);

module.exports = router;
