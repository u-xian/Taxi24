const express = require("express");
const asyncHandler = require("../common/asyncHandler");
const validateIdParam = require("../common/validateIdParam");
const driversCrontroller = require("../controllers/driversController");

const driversRoute = express.Router();

driversRoute.param("driverId", validateIdParam);

driversRoute.get("/drivers", asyncHandler(driversCrontroller.list));

driversRoute.get(
  "/drivers/available",
  asyncHandler(driversCrontroller.listAvailDrivers)
);

driversRoute.get(
  "/drivers/bylocation",
  asyncHandler(driversCrontroller.listDriverByLocation)
);

driversRoute.get(
  "/drivers/:driverId",
  asyncHandler(driversCrontroller.listById)
);

driversRoute.post("/drivers", asyncHandler(driversCrontroller.create));

driversRoute.put(
  "/drivers/:driverId",
  asyncHandler(driversCrontroller.update)
);

driversRoute.put(
  "/drivers/availability/:driverId",
  asyncHandler(driversCrontroller.updateAvailability)
);

driversRoute.delete(
  "/drivers/:driverId",
  asyncHandler(driversCrontroller.delete)
);

module.exports = driversRoute;
