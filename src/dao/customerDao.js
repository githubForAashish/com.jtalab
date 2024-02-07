const { CustomerStatus } = require("../config/constant");
const SuperDao = require("./superDao");
const models = require('../models');


class CustomerDao extends SuperDao {
    constructor() {
        super(models.Customer);
    }


    async findAllBlacklisted() {
        return this.findByWhere({
            where: { blacklisted: false, status: CustomerStatus.DISABLED }
        }
        )
    }

    async isEmailExists(email) {
        return this.Model.count({
            where: { email, status: CustomerStatus.ACTIVE },
        }).then((count) => {
            if (count !== 0) {
                return true;
            }
            return false;
        });
    }

    async isPanExists(pan) {
        return this.Model.count({
            where: { pan, status: CustomerStatus.ACTIVE },
        }).then((count) => {
            if (count !==0) {
                return true;
            }
            return false;
        })
    }

    async deleteByUuid(uuid) {
        return this.updateWhere({ status: CustomerStatus.INACTIVE }, { uuid });
    }

}

module.exports = CustomerDao;