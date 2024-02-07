const { OrderStatus } = require("../config/constant");
const OrderDao = require("../dao/orderDao");
const responseHandler = require('../helper/responseHandler');

class OrderService {
    constructor() {
        this.orderDao = new OrderDao();
    }

    createOrder = async (orderBody) => {
        try {
            let message = 'Successfully placed order.';
            let orderData = await this.orderDao.create({
                ...orderBody,
            });

            if (!orderData) {
                message = 'Order placement failed!';
                return responseHandler.returnError(httpStatus.SERVICE_UNAVAILABLE, message, orde);
            }

            orderData = orderData.toJSON();
            delete orderData.id;

            return responseHandler.returnSuccess(httpStatus.CREATED, message, orderData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not place the order.');
        }
    }

    updateOrder = async (orderBody, uuid) => {
        let message = 'Successfully updated order.'
        try {
            if (!await this.orderDao.updateWhere(orderBody, { uuid })) {
                message = 'Order update failed!';
                return responseHandler.returnError(httpStatus.SERVICE_UNAVAILABLE, message);
            }
            return responseHandler.returnSuccess(httpStatus.OK, message);

        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not update the order.');
        }
    }

    removeOrder = async (uuid) => {
        try {
            const updated = await this.orderDao.deleteByUuid(uuid);
            if (!updated) {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, `Could not dlete the Order. UUID: ${uuid}`);
            }
            return responseHandler.returnSuccess(httpStatus.NO_CONTENT, `Order UUID: ${uuid} has been deleted.`);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, `Could not delete the Order. UUID: ${uuid}`);
        }
    }

    listOrder = async (customer_uuid) => {
        try {
            const orders = await this.orderDao.findByWhere({ status: { [Op.ne]: OrderStatus.CANCELED }, customer_uuid }, { exclude: ['id'] });
            if (!orders) {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, `Could not fetch orders.`)
            }
            return responseHandler.returnSuccess(httpStatus.OK, `Available Orders for customer uuid: ${customer_uuid}`, orders.map((order) => order.toJSON()));
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, `Could not fetch orders.`)
        }
    }

    getOrder = async (uuid) => {
        try {
            const order = await this.orderDao.findOneByWhere({ uuid, status: { [Op.ne]: OrderStatus.CANCELED } }, { exclude: ['id'] });
            if (!order) {
                return responseHandler.returnError(httpStatus.NOT_FOUND, `The order does not exist.`);
            }
            return responseHandler.returnSuccess(httpStatus.OK, `Customer`, customer.toJSON());
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, `Could not fetch orders from customer UUID: ${uuid}`);
        }
    }
}

module.exports = OrderService;