const { Op } = require("sequelize");
const Drivers = require("../models").Drivers;
const Riders = require("../models").Riders;
const { validate } = require("../models/riders");

const ridersController = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const rider = await Riders.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phonenumber: req.body.phonenumber,
      location: req.body.location,
      distance_within_location: req.body.distance_within_location,
    });

    if (!rider) return res.status(404).send("rider  not found");
    res.status(200).json(rider);
  },
  list: async (req, res) => {
    const riders = await Riders.findAll();
    if (!riders) return res.status(404).send("riders  not found");
    res.status(200).json(riders);
  },
  listById: async (req, res) => {
    const rider = await Riders.findByPk(req.params.riderId);
    if (!rider) return res.status(404).send("rider  not found");
    res.status(200).json(rider);
  },

  listClosestDriverByRiderID: async (req, res) => {
    const rider = await Riders.findOne({
      attributes: {
        exclude: [
          "firstname",
          "lastname",
          "phonenumber",
          "deletedAt",
          "createdAt",
          "updatedAt",
        ],
      },
      where: { id: req.params.riderId },
    });

    const drivers = await Drivers.findAll({
      where: {
        availability: true,
        nearest_location: rider.dataValues.location,
        distance_within_location: {
          [Op.lte]: rider.dataValues.distance_within_location,
        },
      },
    });

    if (!rider) return res.status(404).send("Rider  not found");
    if (!drivers) return res.status(404).send("No drivers  found");
    res.status(200).json(drivers);
  },

  update: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let rider = await Riders.findByPk(req.params.riderId);
    if (!rider) return res.status(404).send("rider  not found");
    rider.update(req.body, { fields: Object.keys(req.body) });
    res.status(200).json(rider);
  },
  delete: async (req, res) => {
    let rider = await Riders.findByPk(req.params.riderId);
    if (!rider) return res.status(404).send("rider  not found");
    rider.destroy();
    res.status(200).json("rider deleted");
  },
};

module.exports = ridersController;
