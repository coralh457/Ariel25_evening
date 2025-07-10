const mongoose = require("mongoose");
const { MODELS } = require("../../consts");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(MODELS.user, UserSchema);
