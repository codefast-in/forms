const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(500)
      .json({ message: "Please login in to access the resource" });
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  req.id = id;
  next();
};
