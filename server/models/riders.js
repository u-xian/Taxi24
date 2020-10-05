"use strict";
const Joi = require("joi");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Riders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Riders.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      location: DataTypes.STRING,
      distance_within_location: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Riders",
    }
  );
  return Riders;
};

function validateRider(rider) {
  const schema = Joi.object({
    firstname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    phonenumber: Joi.number().integer().required(),
    location: Joi.string().min(2).max(50).required(),
    distance_within_location: Joi.number().integer().required(),
  });

  return schema.validate(rider);
}

module.exports.validate = validateRider;
