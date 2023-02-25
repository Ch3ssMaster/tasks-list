const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({
      status: "failed",
      data: null,
      error: "Access Denied",
    });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: "Expired Token",
    });
  }
};

module.exports = verifyToken;
