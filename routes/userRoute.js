const {
  createUser,
  login,
  getUserInfo,
  confirmation,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router
  .post("/signup", createUser)
  .post("/login", login)
  .get("/me", verifyToken, getUserInfo)
  .get("/signup/confirmation/:confirmationToken", confirmation )

module.exports = router;
