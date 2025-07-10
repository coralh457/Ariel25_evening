const mongoose = require("mongoose");
const { MODELS } = require("../../consts");

const ToyScehma = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    info: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    img_url: {
      type: mongoose.Schema.Types.String,
    },
    price: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.user,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(MODELS.toy, ToyScehma);
