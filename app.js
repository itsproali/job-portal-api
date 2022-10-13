const express = require("express");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/userRoute");
const managerRoute = require("./routes/managerRoute");
const candidateRoute = require("./routes/candidateRoute");
const adminRoute = require("./routes/adminRoute");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRoute);
app.use("/manager", managerRoute);
app.use("/jobs", candidateRoute);
app.use("/admin", adminRoute);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Job Portal Server..!");
});

// Not Found Route
app.get("*", (req, res) => {
  res.send(404).send({ message: "Route Not Found" });
});

module.exports = app;
