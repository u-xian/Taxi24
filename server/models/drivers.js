"use strict";
const Joi = require("joi");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Drivers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Drivers.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      availability: DataTypes.BOOLEAN,
      nearest_location: DataTypes.STRING,
      distance_within_location: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Drivers",
    }
  );
  return Drivers;
};

function validateDriver(driver) {
  const schema = Joi.object({
    firstname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(255).required(),
    phonenumber: Joi.string().min(2).max(50).required(),
    nearest_location: Joi.string().min(2).max(50).required(),
    distance_within_location: Joi.number().integer().required(),
  });
  return schema.validate(driver);
}
module.exports.validate = validateDriver;
