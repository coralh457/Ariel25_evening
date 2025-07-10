const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const secret = process.env.JWT_SECRET || "your_secret_key";

const auth = (req, res, next) => {
  const token = req.header("x-api-key");
  if (!token)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Missing token" });

  try {
    const decoded = jwt.verify(token, secret);
    req.user_id = decoded;
    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid token" });
  }
};

module.exports = auth;
