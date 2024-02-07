const Joi = require('joi');

const createCustomer = Joi.object({
    company_name: Joi.string().required(),
    phone_number: Joi.string().max(10).required(),
    address: Joi.string(),
    contact_person: Joi.string().required(),
    pan: Joi.string().required(),
    email: Joi.string().email().required(),
});

const updateCustomer = Joi.object({
    phone_number: Joi.string().max(10),
    address: Joi.string(),
    contact_person: Joi.string(),
});

module.exports = {
    createCustomer,
    updateCustomer,
}