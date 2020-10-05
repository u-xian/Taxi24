const Trips = require("../models").Trips;
const { validate } = require("../models/trips");
const generateInvoiceNumber = require("../common/generateInvoiceNumber");

const tripsController = {
  create: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const trip = await Trips.create({
      driverId: req.body.driverId,
      riderId: req.body.riderId,
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
    const price_unit = 1000;
    const amount = price_unit * Number(req.body.complete_distance);
    let trip = await Trips.findByPk(req.params.tripId);
    if (!trip) return res.status(404).send("trip  not found");
    trip.update(req.body, { fields: Object.keys(req.body) });

    trip.update({
      invoicenumber: generateInvoiceNumber(),
      trip_status: "completed",
      complete_distance: req.body.complete_distance,
      unit_price: price_unit,
      total_amount: amount,
      paymentMethod: req.body.paymentMethod,
    });

    trip = await trip.save();
    res.status(200).json(trip);
  },

  delete: async (req, res) => {
    let trip = await Trips.findByPk(req.params.tripId);
    if (!trip) return res.status(404).send("trip  not found");
    trip.destroy();
    res.status(200).json("trip deleted");
  },
};

module.exports = tripsController;
