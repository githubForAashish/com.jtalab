const { http } = require("winston");
const OrderService = require("../service/orderService");

class OrderController {
    constructor() {
        this.orderService = new OrderService();
    }

    register = async (req, res) => {
        try {
            const order = await this.orderService.createOrder(req.body);
            const { status, message, data } = order.response;
            res.status(order.statusCode).send({ status, message, data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    update = async (req, res) => {
        try {
            const order = await this.customerService.updateCustomer(req.body, req.params.uuid);
            const { status, message } = order.response;
            res.status(order.statusCode).send({ status, message });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    list = async (req, res) => {
        try {
            const orders = await this.orderService.listOrder(req.params.customer_uuid);
            const { status, message, data } = orders.response;
            res.status(orders.statusCode).send({ status, message, data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    delete = async (req, res) => {
        try {
            await this.orderService.removeOrder(req.params.uuid);
            res.status(httpStatus.OK).send(`Successfully removed order UUID: ${req.params.uuid}`);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    get = async (req, res) => {
        try {
            const order = await this.orderService.getOrder(req.params.uuid);
            const { status, message, data } = order.response;
            res.status(order.statusCode).send({ status, message, data });
        } catch (e) {
            logger.error(e);
            res.status(http.BAD_GATEWAY).send(e);
        }
    }
}

module.exports = OrderController