const express = require("express");
const ridersCrontroller = require("../controllers/ridersController");

const ridersRoute = express.Router();

ridersRoute.get("/riders", ridersCrontroller.list);

ridersRoute.get(
  "/riders/closedriver/:riderId",
  ridersCrontroller.listClosestDriverByRiderID
);

ridersRoute.get("/riders/:riderId", ridersCrontroller.listById);

ridersRoute.post("/riders", ridersCrontroller.create);

ridersRoute.put("/riders/:riderId", ridersCrontroller.update);

ridersRoute.delete("/riders/:riderId", ridersCrontroller.delete);

module.exports = ridersRoute;
