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

const driversdata = Array.from({ length: COUNT }, () => ({
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  phonenumber: faker.phone.number(),
  availability: faker.datatype.boolean(),
  nearest_location: faker.location.city(),
  ...randomCoordinates(),
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
        latitude: d.latitude,
        longitude: d.longitude,
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
