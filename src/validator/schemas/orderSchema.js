const Joi = require("joi");
const { LaminationType, PaymentType, OrderStatus, MachineType } = require("../../config/constant");

const baseOrderSchema = Object.freeze({
    work_description: Joi.string().allow(null),
    size_page: Joi.string().allow(null),
    unit_pieces: Joi.number().allow(null),
    paper_description: Joi.string().allow(null),
    rim_sheet: Joi.string().allow(null),
    plate_ctp_description: Joi.string().allow(null),
    ink_description: Joi.string().allow(null),
    binding_numbering: Joi.string().allow(null),
    hot_lamination: Joi.string().valid(...Object.values(LaminationType)).allow(null),
    normal_lamination: Joi.string().valid(...Object.values(LaminationType)).allow(null),
    machine_type: Joi.string().valid(...Object.values(MachineType)).allow(null),
    unit_price: Joi.number().allow(null),
    advanced_payment: Joi.number().allow(null),
    total_payment: Joi.number().allow(null),
    delivery_date: Joi.date().allow(null),
    remarks: Joi.string().allow(null),
    payment_status: Joi.string().valid(...Object.values(PaymentType)).allow(null),
    order_status: Joi.string().valid(...Object.values(OrderStatus).filter(order => order !== OrderStatus.CANCELED)).allow(null),
});

const createOrder = Joi.object({
    customer_uuid: Joi.string().required(),
    ...baseOrderSchema,
});

const updateOrder = Joi.object(baseOrderSchema);

module.exports = {
    createOrder,
    updateOrder,
}