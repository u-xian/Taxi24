require("dotenv").config();

const Trips = require("../models").Trips;
const { validate, validateCompletion } = require("../models/trips");
const generateInvoiceNumber = require("../common/generateInvoiceNumber");

const tripsController = {
  create: async (req, res) => {
    const { error, value } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const trip = await Trips.create({
      driverId: value.driverId,
      riderId: value.riderId,
      trip_status: "active",
      complete_distance: 0,
    });

    if (!trip) return res.status(404).send("trip  not found");
    res.status(200).json(trip);
  },
  list: async (req, res) => {
    const trips = await Trips.findAll();
    if (!trips) return res.status(404).send("trips  not found");
    res.status(200).json(trips);
  },
  listById: async (req, res) => {
    const trip = await Trips.findByPk(req.params.tripId);
    if (!trip) return res.status(404).send("trip  not found");
    res.status(200).json(trip);
  },

  listActiveTrips: async (req, res) => {
    const trips = await Trips.findAll({
      where: { trip_status: "active" },
    });
    if (!trips) return res.status(404).send("trips  not found");
    res.status(200).json(trips);
  },

  completeTrip: async (req, res) => {
    const { error, value } = validateCompletion(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const trip = await Trips.findByPk(req.params.tripId);
    if (!trip) return res.status(404).send("trip  not found");

    await trip.update({
      invoicenumber: generateInvoiceNumber(),
      trip_status: "completed",
      complete_distance: value.complete_distance,
      unit_price: process.env.TRIP_PRICE_UNIT,
      total_amount: process.env.TRIP_PRICE_UNIT * value.complete_distance,
      paymentMethod: value.paymentMethod,
    });

    res.status(200).json(trip);
  },

  delete: async (req, res) => {
    const trip = await Trips.findByPk(req.params.tripId);
    if (!trip) return res.status(404).send("trip  not found");
    await trip.destroy();
    res.status(200).json("trip deleted");
  },
};

module.exports = tripsController;
