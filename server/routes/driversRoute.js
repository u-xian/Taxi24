const express = require("express");
const driversCrontroller = require("../controllers/driversController");

const driversRoute = express.Router();

driversRoute.get("/drivers", driversCrontroller.list);

driversRoute.get("/drivers/available", driversCrontroller.listAvailDrivers);

driversRoute.get(
  "/drivers/bylocation",
  driversCrontroller.listDriverByLocation
);

driversRoute.get("/drivers/:driverId", driversCrontroller.listById);

driversRoute.post("/drivers", driversCrontroller.create);

driversRoute.put("/drivers/:driverId", driversCrontroller.update);

driversRoute.put(
  "/drivers/availability/:driverId",
  driversCrontroller.updateAvailability
);

driversRoute.delete("/drivers/:driverId", driversCrontroller.delete);

module.exports = driversRoute;
