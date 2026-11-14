const Drivers = require("../models").Drivers;
const { validate, validateLocationQuery } = require("../models/drivers");

const driversController = {
  create: async (req, res) => {
    const { error, value } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const driver = await Drivers.create({
      firstname: value.firstname,
      lastname: value.lastname,
      phonenumber: value.phonenumber,
      availability: false,
      nearest_location: value.nearest_location,
      latitude: value.latitude,
      longitude: value.longitude,
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

  // GET /drivers/bylocation?latitude=..&longitude=..[&radius=km, default 3]
  listDriverByLocation: async (req, res) => {
    const { error, value } = validateLocationQuery(req.query);
    if (error) return res.status(400).send(error.details[0].message);

    const drivers = await Drivers.findAvailableNear({
      latitude: value.latitude,
      longitude: value.longitude,
      radiusKm: value.radius,
    });
    res.status(200).json(drivers);
  },

  update: async (req, res) => {
    const { error, value } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const driver = await Drivers.findByPk(req.params.driverId);
    if (!driver) return res.status(404).send("driver  not found");
    await driver.update(value);
    res.status(200).json(driver);
  },

  updateAvailability: async (req, res) => {
    const driver = await Drivers.findByPk(req.params.driverId);
    if (!driver) return res.status(404).send("trip  not found");

    await driver.update({ availability: true });
    res.status(200).json(driver);
  },

  delete: async (req, res) => {
    const driver = await Drivers.findByPk(req.params.driverId);
    if (!driver) return res.status(404).send("driver  not found");
    await driver.destroy();
    res.status(200).json("driver deleted");
  },
};

module.exports = driversController;
