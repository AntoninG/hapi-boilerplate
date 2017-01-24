const Joi = require('joi');

let schema = Joi.object().keys({
    login: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).max(60).required(),
    email: Joi.string().email().required(),
    firstNme: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    company: Joi.string(),
    function: Joi.string(),
    nir: Joi.string().regex(/^[12][0-9]{2}[0-1][0-9](2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}[0-9]{2}$/)
});

module.exports = schema;