"use strict";

const { faker } = require("@faker-js/faker");

const COUNT = 50;

// Seed everyone within 10 km of central Kigali so distance searches return results.
const CITY_CENTER = [-1.9441, 30.0619]; // [latitude, longitude]
const randomCoordinates = () => {
  const [latitude, longitude] = faker.location.nearbyGPSCoordinate({
    origin: CITY_CENTER,
    radius: 10,
    isMetric: true,
  });
  return { latitude, longitude };
};

const ridersdata = Array.from({ length: COUNT }, () => ({
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  phonenumber: faker.phone.number(),
  location: faker.location.city(),
  ...randomCoordinates(),
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
        latitude: r.latitude,
        longitude: r.longitude,
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
