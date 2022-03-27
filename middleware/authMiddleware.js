const user = require("../models/user");
const jwt = require("jsonwebtoken");

exports.authenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      message: "login first to access this route",
    });
  }

  var decoded = jwt.verify(
    token,
    "junaidarshad03105640408satti03319123970satti"
  );
  req.user = decoded.user;
  next();
};
