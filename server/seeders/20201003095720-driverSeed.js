"use strict";

const { faker } = require("@faker-js/faker");

const COUNT = 50;

const driversdata = Array.from({ length: COUNT }, () => ({
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  phonenumber: faker.phone.number(),
  availability: faker.datatype.boolean(),
  nearest_location: faker.location.city(),
  distance_within_location: faker.number.int({ min: 1, max: 5 }),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

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
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      });
    });
    return await queryInterface.bulkInsert("Drivers", drivers);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Drivers", null, {});
  },
};
