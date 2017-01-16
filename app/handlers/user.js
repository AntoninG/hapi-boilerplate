'use strict';

const Lodash = require('lodash');

module.exports.validate = (request, response) => {

    response(null,  {
        result : Lodash.omit(request.payload, ['password', 'nir'])
    });
};