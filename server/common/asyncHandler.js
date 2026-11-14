// Express 4 does not catch rejected promises from async route handlers.
// Without this wrapper a failed DB call becomes an unhandled rejection,
// which crashes the Node process. This forwards the error to the error handler.
const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

module.exports = asyncHandler;
