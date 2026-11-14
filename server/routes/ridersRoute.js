const express = require("express");
const asyncHandler = require("../common/asyncHandler");
const validateIdParam = require("../common/validateIdParam");
const ridersCrontroller = require("../controllers/ridersController");

const ridersRoute = express.Router();

ridersRoute.param("riderId", validateIdParam);

ridersRoute.get("/riders", asyncHandler(ridersCrontroller.list));

ridersRoute.get(
  "/riders/closedriver/:riderId",
  asyncHandler(ridersCrontroller.listClosestDriverByRiderID)
);

ridersRoute.get("/riders/:riderId", asyncHandler(ridersCrontroller.listById));

ridersRoute.post("/riders", asyncHandler(ridersCrontroller.create));

ridersRoute.put("/riders/:riderId", asyncHandler(ridersCrontroller.update));

ridersRoute.delete("/riders/:riderId", asyncHandler(ridersCrontroller.delete));

module.exports = ridersRoute;
