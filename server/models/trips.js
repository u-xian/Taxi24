"use strict";
const Joi = require("joi");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trips extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trips.init(
    {
      invoicenumber: DataTypes.STRING,
      driverId: DataTypes.INTEGER,
      riderId: DataTypes.INTEGER,
      trip_status: DataTypes.STRING,
      complete_distance: DataTypes.INTEGER,
      paymentMethod: DataTypes.STRING,
      unit_price: DataTypes.INTEGER,
      total_amount: DataTypes.REAL,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Trips",
    }
  );
  return Trips;
};

function validateTrip(trip) {
  const schema = Joi.object({
    driverId: Joi.number().integer().required(),
    riderId: Joi.number().integer().required(),
    complete_distance: Joi.number().integer(),
    paymentMethod: Joi.string().min(2).max(50),
  });

  return schema.validate(trip);
}

module.exports.validate = validateTrip;
