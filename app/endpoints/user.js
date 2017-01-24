'use strict';

const handler = require('../handlers/user');

exports.register = (server, options, next) => {
    server.route([
        {
            method : 'POST',
            path   : '/user/validate',
            config : {
                description : 'Validate the user posted',
                notes       : 'Validation route for user entity',
                tags        : [ 'api' ],
                validate    : {
                    payload : require('../schemas/user')
                },
                handler     : handler.validate
            }
        },

        {
            method : 'GET',
            path   : '/user/insertUsers/{number}',
            config : {
                description : 'Insert a give number of random users',
                notes       : 'Maximum 100 users inserted',
                tags        : [ 'api' ],
                handler     : handler.insertUsers
            }
        }
    ]);
    next();
};

exports.register.attributes = {
    name : 'user-routes'
};