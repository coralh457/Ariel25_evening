const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  console.log(err.message);
  if (!err.status) {
    err.status = StatusCodes.INTERNAL_SERVER_ERROR;
    err.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
  }

  return res.status(err.status).json({ success: false, message: err.message });
};

module.exports = errorHandler;
