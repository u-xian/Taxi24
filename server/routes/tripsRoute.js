const express = require("express");
const tripsCrontroller = require("../controllers/tripsController");

const tripsRoute = express.Router();

tripsRoute.get("/trips", tripsCrontroller.list);

tripsRoute.get("/trips/activetrips", tripsCrontroller.listActiveTrips);

tripsRoute.get("/trips/:tripId", tripsCrontroller.listById);

tripsRoute.post("/trips", tripsCrontroller.create);

tripsRoute.put("/trips/:tripId", tripsCrontroller.completeTrip);

tripsRoute.delete("/trips/:tripId", tripsCrontroller.delete);

module.exports = tripsRoute;
