const Drivers = require("../models").Drivers;
const Riders = require("../models").Riders;
const { validate } = require("../models/riders");

const ridersController = {
  create: async (req, res) => {
    const { error, value } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const rider = await Riders.create({
      firstname: value.firstname,
      lastname: value.lastname,
      phonenumber: value.phonenumber,
      location: value.location,
      latitude: value.latitude,
      longitude: value.longitude,
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

  // The 3 available drivers closest to the rider's coordinates.
  listClosestDriverByRiderID: async (req, res) => {
    const rider = await Riders.findByPk(req.params.riderId);
    if (!rider) return res.status(404).send("Rider  not found");
    if (rider.latitude === null || rider.longitude === null) {
      return res.status(422).send("Rider has no location coordinates");
    }

    const drivers = await Drivers.findAvailableNear({
      latitude: rider.latitude,
      longitude: rider.longitude,
      limit: 3,
    });
    if (drivers.length === 0) return res.status(404).send("No drivers  found");
    res.status(200).json(drivers);
  },

  update: async (req, res) => {
    const { error, value } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const rider = await Riders.findByPk(req.params.riderId);
    if (!rider) return res.status(404).send("rider  not found");
    await rider.update(value);
    res.status(200).json(rider);
  },
  delete: async (req, res) => {
    const rider = await Riders.findByPk(req.params.riderId);
    if (!rider) return res.status(404).send("rider  not found");
    await rider.destroy();
    res.status(200).json("rider deleted");
  },
};

module.exports = ridersController;
