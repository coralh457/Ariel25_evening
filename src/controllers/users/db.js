const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const User = require("../../models/user");
const ErrorResponse = require("../../ErrorResponse");

const createUserDB = async (user) => {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new ErrorResponse(StatusCodes.CONFLICT, ReasonPhrases.CONFLICT);
  }
  const newUser = new User(user);
  const savedUser = await newUser.save();

  return savedUser;
};

const loginUserDB = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user)
    throw new ErrorResponse(
      StatusCodes.UNAUTHORIZED,
      ReasonPhrases.UNAUTHORIZED
    );

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw new ErrorResponse(
      StatusCodes.UNAUTHORIZED,
      ReasonPhrases.UNAUTHORIZED
    );

  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    secret,
    { expiresIn: "7d" }
  );

  return token;
};

module.exports = {
  createUserDB,
  loginUserDB,
};
