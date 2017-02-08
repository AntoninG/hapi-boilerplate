const Joi = require('joi');

/**
 * Schema of a user
 * Required : login, password, email, firstName, lastName
 *
 * @type Joi schema
 */
let schema = Joi.object().keys({
    login    : Joi.string().regex(/^[a-zA-Z0-9._-]{3,30}$/).min(3).max(30).required().example("Antonin"),
    password : Joi.string().regex(/^[a-zA-Z0-9._-]{3,60}$/).min(8).max(60).required().example("dev3387VIDEO"),
    email    : Joi.string().email().required().example("antonin.guilet@dynadmic.com"),
    firstName: Joi.string().min(2).max(120).required().example("Antonin"),
    lastName : Joi.string().min(2).max(120).required().example("GUILET"),
    company  : Joi.string().min(2).max(100).example("DynAdmic"),
    function : Joi.string().min(2).max(100).example("Dev junior"),
    nir      : Joi.string().regex(/^[12][0-9]{2}[0-1][0-9](2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}[0-9]{2}$/).example("195127511274923")
});

module.exports = schema;