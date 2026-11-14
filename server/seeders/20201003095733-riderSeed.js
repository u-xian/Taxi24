"use strict";

const { faker } = require("@faker-js/faker");

const COUNT = 50;

const ridersdata = Array.from({ length: COUNT }, () => ({
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  phonenumber: faker.phone.number(),
  location: faker.location.city(),
  distance_within_location: faker.number.int({ min: 1, max: 5 }),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

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
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      });
    });
    return await queryInterface.bulkInsert("Riders", riders);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Riders", null, {});
  },
};
