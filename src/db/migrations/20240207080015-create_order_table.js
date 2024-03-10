'use strict';

const { PaymentType, OrderStatus, LaminationType, MachineType } = require('../../config/constant');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        allowNull: false,
        type: Sequelize.UUID,
        unique: true,
      },
      customer_uuid: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'customers',
          key: 'uuid',
        },
      },
      work_description: {
        type: Sequelize.STRING,
      },
      size_page: {
        type: Sequelize.STRING,
      },
      unit_pieces: {
        type: Sequelize.INTEGER,
      },
      paper_description: {
        type: Sequelize.STRING,
      },
      rim_sheet: {
        type: Sequelize.STRING,
      },
      plate_ctp_description: {
        type: Sequelize.STRING,
      },
      ink_description: {
        type: Sequelize.STRING,
      },
      binding_numbering: {
        type: Sequelize.STRING,
      },
      hot_lamination: {
        type: Sequelize.ENUM,
        values: Object.values(LaminationType),
      },
      normal_lamination: {
        type: Sequelize.ENUM,
        values: Object.values(LaminationType),
      },
      machine_type: {
        type: Sequelize.ENUM,
        values: Object.values(MachineType),
      },
      unit_price: {
        type: Sequelize.FLOAT,
      },
      total_price: {
        type: Sequelize.FLOAT,
      },
      advanced_payment: {
        type: Sequelize.FLOAT,
      },
      due_payment: {
        type: Sequelize.FLOAT,
      },
      total_payment: {
        type: Sequelize.FLOAT,
      },
      delivery_date: {
        type: Sequelize.DATE,
      },
      remarks: {
        type: Sequelize.STRING,
      },
      payment_status: {
        type: Sequelize.ENUM,
        values: Object.values(PaymentType),
      },
      order_status: {
        type: Sequelize.ENUM,
        values: Object.values(OrderStatus),
      },
      due_payment_date: {
        type: Sequelize.DATE,
      },
      order_delivery_date: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
