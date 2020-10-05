const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const indexRouter = require("./server/routes");

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use("/", indexRouter);

module.exports = app;
