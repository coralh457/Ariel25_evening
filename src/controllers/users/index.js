const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { asyncHandler } = require("../../utils");
const { createUserDB, loginUserDB } = require("./db");
const { userSchema, loginUserSchema } = require("../../models/user/schema");

const createUser = asyncHandler(async (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "invalid user body" });
  }

  const { password } = value;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await createUserDB({ ...value, password: hashedPassword });
  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id,
    },
  });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { error, value } = loginUserSchema.validate(req.body);
  if (error) return res.status(400).json({ error: "Invalid login body" });

  const { email, password } = value;

  const token = await loginUserDB(email, password);

  res.status(StatusCodes.OK).json({ success: true, data: token });
});

module.exports = {
  createUser,
  loginUser,
};
