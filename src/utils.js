const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const isValidId = (id) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return false;
  }
  return true;
};

module.exports = {
  asyncHandler,
  isValidId,
};
