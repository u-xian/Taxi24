// Final error-handling middleware. Must be registered after all routes.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  // Client errors raised by middleware (e.g. malformed JSON from body-parser).
  const status = err.status || err.statusCode;
  if (status >= 400 && status < 500) {
    return res.status(status).send(err.expose ? err.message : "Bad request");
  }

  console.error(err);
  res.status(500).send("Internal server error");
};

module.exports = errorHandler;
