"use strict";
const Joi = require("joi");
const { Model, Op } = require("sequelize");
const { haversineDistanceSql } = require("../common/geo");

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

    /**
     * Available drivers ordered by distance from a point, nearest first.
     * Each driver gets a computed `distance_km` attribute.
     *
     * @param {object} options
     * @param {number} options.latitude
     * @param {number} options.longitude
     * @param {number} [options.radiusKm] - only include drivers within this distance
     * @param {number} [options.limit]
     */
    static findAvailableNear({ latitude, longitude, radiusKm, limit }) {
      const distance = sequelize.literal(
        haversineDistanceSql(sequelize, this.name, latitude, longitude)
      );

      const where = {
        availability: true,
        latitude: { [Op.ne]: null },
        longitude: { [Op.ne]: null },
      };
      if (radiusKm !== undefined) {
        where[Op.and] = [sequelize.where(distance, { [Op.lte]: radiusKm })];
      }

      return this.findAll({
        attributes: { include: [[distance, "distance_km"]] },
        where,
        order: [
          [distance, "ASC"],
          ["id", "ASC"],
        ],
        limit,
      });
    }
  }
  Drivers.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      availability: DataTypes.BOOLEAN,
      nearest_location: DataTypes.STRING,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
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
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required(),
  });
  return schema.validate(driver);
}

// Query string for GET /drivers/bylocation
function validateLocationQuery(query) {
  const schema = Joi.object({
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required(),
    radius: Joi.number().positive().max(50).default(3), // km
  });
  return schema.validate(query);
}

module.exports.validate = validateDriver;
module.exports.validateLocationQuery = validateLocationQuery;
