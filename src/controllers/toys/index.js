const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { asyncHandler, isValidId } = require("../../utils");
const {
  getToysDB,
  createToyDB,
  getToyDB,
  getToysCountDB,
  deleteToyDB,
  getToysByPriceDB,
  updateToyDB,
} = require("./db");
const { toySchema, updateToySchema } = require("../../models/toy/schema");

const getToys = asyncHandler(async (req, res, next) => {
  const { name, info, category } = req.query;
  const skip = parseInt(req.query.skip) || 0;

  const toys = await getToysDB(skip, name, info, category);
  res.status(StatusCodes.OK).json({ success: true, data: toys });
});

const createToy = asyncHandler(async (req, res, next) => {
  const { error, value } = toySchema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }
  const toy = await createToyDB({ ...value, user_id: req.user_id });
  res.status(StatusCodes.OK).json({ success: true, data: toy });
});

const updateToy = asyncHandler(async (req, res, next) => {
  const { error, value } = updateToySchema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }
  const { id } = req.params;
  if (!isValidId(id)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }
  const toy = await updateToyDB(id, value);
  res.status(StatusCodes.OK).json({ success: true, data: toy });
});

const deleteToy = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }
  const toy = await deleteToyDB(id);
  res.status(StatusCodes.OK).json({ success: true, data: toy });
});

const getToy = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }
  const toy = await getToyDB(id);
  res.status(StatusCodes.OK).json({ success: true, data: toy });
});

const getToysCount = asyncHandler(async (req, res, next) => {
  const count = await getToysCountDB();
  res.status(StatusCodes.OK).json({ success: true, data: count });
});

const getToysByPrice = asyncHandler(async (req, res, next) => {
  const skip = parseInt(req.query.skip) || 0;
  const min = parseFloat(req.query.min) || 0;
  const max = parseFloat(req.query.max) || Infinity;
  const toys = await getToysByPriceDB(skip, min, max);
  res.status(StatusCodes.OK).json({ success: true, data: toys });
});

module.exports = {
  getToys,
  createToy,
  getToysCount,
  getToy,
  getToysByPrice,
  deleteToy,
  updateToy,
};
