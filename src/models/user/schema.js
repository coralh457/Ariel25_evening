const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(1024).required(),
  role: Joi.string().valid("USER", "ADMIN").optional(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(1024).required(),
});

module.exports = {
  userSchema,
  loginUserSchema,
};
