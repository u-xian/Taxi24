"use strict";

// Replaces the old "distance_within_location" integer (which was not a real
// distance) with GPS coordinates, so distances can be computed between
// drivers and riders/locations.
const TABLES = ["Drivers", "Riders"];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      for (const table of TABLES) {
        await queryInterface.addColumn(
          table,
          "latitude",
          { type: Sequelize.DOUBLE },
          { transaction }
        );
        await queryInterface.addColumn(
          table,
          "longitude",
          { type: Sequelize.DOUBLE },
          { transaction }
        );
        await queryInterface.removeColumn(table, "distance_within_location", {
          transaction,
        });
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      for (const table of TABLES) {
        // Note: the original distance_within_location values cannot be restored.
        await queryInterface.addColumn(
          table,
          "distance_within_location",
          { type: Sequelize.INTEGER },
          { transaction }
        );
        await queryInterface.removeColumn(table, "latitude", { transaction });
        await queryInterface.removeColumn(table, "longitude", { transaction });
      }
    });
  },
};
