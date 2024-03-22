const Joi = require('joi');

const createCustomer = Joi.object({
    company_name: Joi.string().allow(null),
    phone_number: Joi.string().max(10).allow(null),
    address: Joi.string().allow(null),
    contact_person: Joi.string().allow(null),
    pan: Joi.string().allow(null),
    email: Joi.string().email().allow(null),
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