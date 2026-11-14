const Joi = require("joi");

// Postgres INTEGER primary keys: 1 .. 2^31 - 1
const idSchema = Joi.number().integer().min(1).max(2147483647).required();

// For use with router.param(): rejects non-numeric / out-of-range IDs with 400
// instead of letting them reach Postgres and fail there.
const validateIdParam = (req, res, next, value, name) => {
  const { error } = idSchema.validate(value);
  if (error) return res.status(400).send(`"${name}" must be a positive integer`);
  next();
};

module.exports = validateIdParam;
