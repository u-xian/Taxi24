const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

// Include Routes
const driversRoute = require("./driversRoute");
const ridersRoute = require("./ridersRoute");
const tripsRoute = require("./tripsRoute");

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.

app.get("/api/v1/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the Taxi24 Backend API",
  })
);

//Features routes
app.use("/api/v1/", driversRoute);
app.use("/api/v1/", ridersRoute);
app.use("/api/v1/", tripsRoute);

//Get routes path
//displayRoutes(app);
module.exports = app;
