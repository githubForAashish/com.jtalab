const SuperDao = require("./superDao");
const models = require('../models');
const { OrderStatus } = require("../config/constant");

class OrderDao extends SuperDao {
    constructor() {
        super(models.Order);
    }

    async deleteByUuid(uuid) {
        return this.updateWhere({ status: OrderStatus.CANCELED }, { uuid });
    }
    
}

module.exports = OrderDao;