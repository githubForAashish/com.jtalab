const Joi = require('joi');

const createCustomer = Joi.object({
    company_name: Joi.string().required(),
    phone_number: Joi.string().max(10).required(),
    address: Joi.string().allow(null),
    contact_person: Joi.string().required(),
    pan: Joi.string().required(),
    email: Joi.string().email().required(),
});

const updateCustomer = Joi.object({
    company_name: Joi.string().allow(null),
    phone_number: Joi.string().max(10),
    address: Joi.string().allow(null),
    contact_person: Joi.string(),
    pan: Joi.string().allow(null),
    email: Joi.string().email(),
    blacklisted: Joi.boolean(),
});

module.exports = {
    createCustomer,
    updateCustomer,
}