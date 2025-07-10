const { StatusCodes } = require("http-status-codes");

class ErrorResponse extends Error {
  status;
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = ErrorResponse;
