module.exports = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!role.includes(userRole)) {
      return res.status(403).send({
        success: false,
        message: "You aren't authorized for this action",
      });
    }
    next();
  };
};
