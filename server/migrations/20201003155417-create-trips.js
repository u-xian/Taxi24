'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoicenumber: {
        type: Sequelize.STRING
      },
      driverId: {
        type: Sequelize.INTEGER
      },
      riderId: {
        type: Sequelize.INTEGER
      },
      trip_status: {
        type: Sequelize.STRING
      },
      complete_distance: {
        type: Sequelize.INTEGER
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      unit_price: {
        type: Sequelize.INTEGER
      },
      total_amount: {
        type: Sequelize.REAL
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Trips');
  }
};