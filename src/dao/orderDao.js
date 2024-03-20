const SuperDao = require("./superDao");
const models = require('../models');
const { OrderStatus } = require("../config/constant");
const { Op } = require("sequelize");

class OrderDao extends SuperDao {
    constructor() {
        super(models.Order);
    }

    async deleteByUuid(uuid) {
        return this.updateWhere({ order_status: OrderStatus.CANCELED }, { uuid });
    }

    async listAllOrdersByCustomer() {
        return this.findByWhere({ order_status }, { exclude: ['id'] });;
    }

    async listAllOrders() {
        return this.findByWhere({}, { exclude: ['id'] });
    }

    async getOrderByUuid(uuid) {
        return this.findOneByWhere({ uuid }, { exclude: ['id'] });
    }

    async updateOrderByUuid(orderBody, uuid) {
        if(!await this.findOneByWhere({ uuid, order_status: {[Op.ne]: OrderStatus.CANCELED} })) {
            return this.updateWhere(orderBody, { uuid });
        }
    }

}

module.exports = OrderDao;