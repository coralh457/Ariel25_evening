const Joi = require("joi");

const toySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  info: Joi.string().min(2).max(500).required(),
  category: Joi.string().min(2).max(100).required(),
  img_url: Joi.string().uri().optional().allow(""),
  price: Joi.number().min(0).required(),
});

const updateToySchema = toySchema.fork(
  ["name", "info", "category", "price"],
  (field) => field.optional()
);

module.exports = {
  toySchema,
  updateToySchema,
};
