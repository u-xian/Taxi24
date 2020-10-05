"use strict";
const ridersdata = require("./ridersData.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let riders = [];
    ridersdata.map((r) => {
      riders.push({
        firstname: r.firstname,
        lastname: r.lastname,
        phonenumber: r.phonenumber,
        location: r.location,
        distance_within_location: r.distance_within_location,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return await queryInterface.bulkInsert("Riders", riders);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Riders", null, {});
  },
};
