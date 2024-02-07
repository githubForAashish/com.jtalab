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
        work_description: {
          type: Sequelize.STRING,
        },
        size_page: {
          type: Sequelize.STRING,
        },
        unit_pieces: Sequelize.NUMBER,
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
        unit_price: Sequelize.FLOAT,
        total_price: Sequelize.FLOAT,
        advanced_payment: Sequelize.FLOAT,
        due_payment: Sequelize.FLOAT,
        total_payment: Sequelize.FLOAT,
        delivery_date: Sequelize.DATE,
        remarks: Sequelize.STRING,
        payment_status: {
          type: Sequelize.ENUM,
          values: Object.values(PaymentType),
        },
        order_status: {
          type: Sequelize.ENUM,
          values: Object.values(OrderStatus),
        },
        due_payment_date: Sequelize.DATE,
        order_delivery_date: Sequelize.DATE,
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  }
};
