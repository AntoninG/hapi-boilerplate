const Joi = require('joi');

let schema = Joi.object().keys({
    login    : Joi.string().regex(/^[a-zA-Z0-9._-]{3,30}$/).min(3).max(30).required().example("Antonin"),
    password : Joi.string().regex(/^[a-zA-Z0-9._-]{3,30}$/).min(8).max(60).required().example("dev3387VIDEO"),
    email    : Joi.string().email().required().example("antonin.guilet@dynadmic.com"),
    firstName: Joi.string().min(2).required().example("Antonin"),
    lastName : Joi.string().min(2).required().example("GUILET"),
    company  : Joi.string().example("DynAdmic"),
    function : Joi.string().example("Dev junior"),
    nir      : Joi.string().regex(/^[12][0-9]{2}[0-1][0-9](2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}[0-9]{2}$/).example("195127511274923")
});

module.exports = schema;