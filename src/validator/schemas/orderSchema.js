const Joi = require("joi");
const { LaminationType, PaymentType, OrderStatus, MachineType } = require("../../config/constant");

const baseOrderSchema = Object.freeze({
    work_description: Joi.string(),
    size_page: Joi.string(),
    unit_pieces: Joi.number(),
    paper_description: Joi.string(),
    rim_sheet: Joi.string(),
    plate_ctp_description: Joi.string(),
    ink_description: Joi.string(),
    binding_numbering: Joi.string(),
    hot_lamination: Joi.string().valid(...Object.values(LaminationType)),
    normal_lamination: Joi.string().valid(...Object.values(LaminationType)),
    machine_type: Joi.string().valid(...Object.values(MachineType)),
    unit_price: Joi.number(),
    advanced_payment: Joi.string(),
    total_payment: Joi.number().required(),
    delivery_date: Joi.date(),
    remarks: Joi.string(),
    payment_status: Joi.string().valid(...Object.values(PaymentType)),
    order_status: Joi.string().valid(...Object.values(OrderStatus)),
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