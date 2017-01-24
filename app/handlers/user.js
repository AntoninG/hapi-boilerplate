'use strict';

const Lodash = require('lodash');

/**
 * Return the user validated without password and nir
 *
 * @param request
 * @param response
 */
module.exports.validate = (request, response) => {

    response(null,  {
        result : Lodash.omit(request.payload, ['password', 'nir'])
    });
};

/**
 *
 * @param request
 * @param response
 */
module.exports.insertUsers = (request, response) => {
    let nbUsers = request.params.number;
    nbUsers = Math.min(nbUsers, 100);
};