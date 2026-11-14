const express = require("express");
const asyncHandler = require("../common/asyncHandler");
const validateIdParam = require("../common/validateIdParam");
const tripsCrontroller = require("../controllers/tripsController");

const tripsRoute = express.Router();

tripsRoute.param("tripId", validateIdParam);

tripsRoute.get("/trips", asyncHandler(tripsCrontroller.list));

tripsRoute.get(
  "/trips/activetrips",
  asyncHandler(tripsCrontroller.listActiveTrips)
);

tripsRoute.get("/trips/:tripId", asyncHandler(tripsCrontroller.listById));

tripsRoute.post("/trips", asyncHandler(tripsCrontroller.create));

tripsRoute.put("/trips/:tripId", asyncHandler(tripsCrontroller.completeTrip));

tripsRoute.delete("/trips/:tripId", asyncHandler(tripsCrontroller.delete));

module.exports = tripsRoute;
