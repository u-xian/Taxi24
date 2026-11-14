const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const indexRouter = require("./server/routes");
const errorHandler = require("./server/common/errorHandler");

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use("/", indexRouter);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
