const Joi = require('joi');

/**
 * Schema of an authentication payload
 *
 * @type Joi schema
 */
let schema = Joi.object().keys({
    login    : Joi.string().regex(/^[a-zA-Z0-9._-]{3,30}$/).min(3).max(30).required().example("Antonin"),
    password : Joi.string().regex(/^[a-zA-Z0-9._-]{3,60}$/).min(8).max(60).required().example("dev3387VIDEO"),
});

module.exports = schema;