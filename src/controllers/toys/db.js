const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const Toy = require("../../models/toy");
const ErrorResponse = require("../../ErrorResponse");

const getToysDB = async (skip = 0, name, info, category) => {
  const filter = {};
  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }
  if (info) {
    filter.info = { $regex: info, $options: "i" };
  }
  if (category) {
    filter.category = category;
  }

  const toys = await Toy.find(filter).skip(skip).limit(10);
  return toys;
};

const createToyDB = async (toy) => {
  const newToy = new Toy(toy);
  const savedToy = await newToy.save();
  return savedToy;
};

const updateToyDB = async (id, update) => {
  const updatedToy = await Toy.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
  return updatedToy;
};

const deleteToyDB = async (id) => {
  const deletedToy = await Toy.findByIdAndDelete(id);

  if (!deletedToy) {
    throw new ErrorResponse(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  }
  return deletedToy;
};

const getToysCountDB = async () => {
  const count = await Toy.countDocuments({});
  return count;
};

const getToyDB = async (id) => {
  const toy = await Toy.findById(id);
  if (!toy)
    throw new ErrorResponse(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
  return toy;
};

const getToysByPriceDB = async (skip, min, max) => {
  const filter = {
    price: { $gte: min, $lte: max },
  };

  const toys = await Toy.find(filter).skip(skip).limit(10);
  return toys;
};

module.exports = {
  getToysDB,
  createToyDB,
  getToyDB,
  getToysCountDB,
  getToysByPriceDB,
  deleteToyDB,
  updateToyDB,
};
