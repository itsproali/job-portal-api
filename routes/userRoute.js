const {
  createUser,
  login,
  getUserInfo,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router
  .post("/signup", createUser)
  .post("/login", login)
  .get("/me", verifyToken, getUserInfo);

module.exports = router;
