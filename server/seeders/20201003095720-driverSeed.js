"use strict";
const driversdata = require("./driversData.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let drivers = [];
    driversdata.map((d) => {
      drivers.push({
        firstname: d.firstname,
        lastname: d.lastname,
        phonenumber: d.phonenumber,
        availability: d.availability,
        nearest_location: d.nearest_location,
        distance_within_location: d.distance_within_location,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return await queryInterface.bulkInsert("Drivers", drivers);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Drivers", null, {});
  },
};
