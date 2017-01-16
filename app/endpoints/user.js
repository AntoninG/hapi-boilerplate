'use strict';

const handler = require('../handlers/user');

exports.register = (server, options, next) => {
    server.route([
        {
            method : 'POST',
            path   : '/user/validate',
            config : {
                description : 'Validation d\'utilisateur',
                notes       : 'Route de validation de user',
                tags        : [ 'api' ],
                validate: {
                    payload : require('../schemas/user')
                },
                handler : handler.validate
            }
        }
    ]);
    next();
};

exports.register.attributes = {
    name : 'user-validate-routes'
};