const { Model } = require('sequelize');
const { LaminationType, MachineType, PaymentType, OrderStatus } = require('../config/constant');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.Customer, { foreignKey: 'customer_uuid' });
        }
    }
    Order.init(
        {
            uuid: DataTypes.UUID,
            customer_uuid: DataTypes.UUID,
            work_description: DataTypes.STRING,
            size_page: DataTypes.STRING,
            unit_pieces: DataTypes.NUMBER,
            paper_description: DataTypes.STRING,
            rim_sheet: DataTypes.STRING,
            plate_ctp_description: DataTypes.STRING,
            ink_description: DataTypes.STRING,
            binding_numbering: DataTypes.STRING,
            hot_lamination: {
                type: DataTypes.ENUM,
                values: Object.values(LaminationType),
            },
            normal_lamination: {
                type: DataTypes.ENUM,
                values: Object.values(LaminationType),
            },
            machine_type: {
                type: DataTypes.ENUM,
                values: Object.values(MachineType),
            },
            unit_price: DataTypes.FLOAT,
            total_price: DataTypes.FLOAT,
            advanced_payment: DataTypes.FLOAT,
            due_payment: DataTypes.FLOAT,
            total_payment: DataTypes.FLOAT,
            delivery_date: DataTypes.DATE,
            remarks: DataTypes.STRING,
            payment_status: {
                type: DataTypes.ENUM,
                values: Object.values(PaymentType),
            },
            order_status: {
                type: DataTypes.ENUM,
                values: Object.values(OrderStatus),
            },
            due_payment_date: DataTypes.DATE,
            order_delivery_date: DataTypes.DATE,
        },
        {
            sequelize,
            underscored: true,
        },
    );
    Order.beforeCreate(async (order) => {
        order.uuid = uuidv4();
    });
    return Order;
};
