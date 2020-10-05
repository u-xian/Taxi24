const Drivers = require("../models").Drivers;
const { validate } = require("../models/drivers");

const driversController = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const driver = await Drivers.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phonenumber: req.body.phonenumber,
      availability: false,
      nearest_location: req.body.nearest_location,
      distance_within_location: req.body.distance_within_location,
    });

    if (!driver) return res.status(404).send("driver  not found");
    res.status(200).json(driver);
  },
  list: async (req, res) => {
    const drivers = await Drivers.findAll();
    if (!drivers) return res.status(404).send("drivers  not found");
    res.status(200).json(drivers);
  },
  listById: async (req, res) => {
    const driver = await Drivers.findByPk(req.params.driverId);
    if (!driver) return res.status(404).send("driver  not found");
    res.status(200).json(driver);
  },

  listAvailDrivers: async (req, res) => {
    const drivers = await Drivers.findAll({
      where: { availability: true },
    });
    if (!drivers) return res.status(404).send("drivers  not found");
    res.status(200).json(drivers);
  },

  listDriverByLocation: async (req, res) => {
    const drivers = await Drivers.findAll({
      where: {
        nearest_location: req.body.nearest_location,
        distance_within_location: req.body.distance_within_location,
      },
    });
    if (!drivers) return res.status(404).send("drivers  not found");
    res.status(200).json(drivers);
  },

  update: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let driver = await Drivers.findByPk(req.params.driverId);
    if (!driver) return res.status(404).send("driver  not found");
    driver.update(req.body, { fields: Object.keys(req.body) });
    res.status(200).json(driver);
  },

  updateAvailability: async (req, res) => {
    let driver = await Drivers.findByPk(req.params.driverId);
    if (!driver) return res.status(404).send("trip  not found");

    driver.update({ availability: true });

    driver = await driver.save();
    res.status(200).json(driver);
  },

  delete: async (req, res) => {
    let driver = await Drivers.findByPk(req.params.driverId);
    if (!driver) return res.status(404).send("driver  not found");
    driver.destroy();
    res.status(200).json("driver deleted");
  },
};

module.exports = driversController;
