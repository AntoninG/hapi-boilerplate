'use strict';

const handler = require('../handlers/user');
const schema  = require('../schemas/user');
const Joi     = require('joi');

exports.register = (server, options, next) => {
    server.route([
        {
            method : 'GET',
            path   : '/users/{_id}',
            config : {
                description : 'Get a specific user',
                notes       : 'Get a specific user',
                tags        : [ 'api' ],
                validate    : {
                    params  : {
                        _id : Joi.number().integer().min(1)
                    }
                },
                handler     : handler.readOne
            }
        },

        {
            method : 'GET',
            path   : '/users',
            config : {
                description : 'Get all users',
                notes       : 'Get all users',
                tags        : [ 'api' ],
                handler     : handler.readAll
            }
        },

        {
            method : 'POST',
            path   : '/users',
            config : {
                description : 'Create the user posted',
                notes       : 'Creation of user entity',
                tags        : [ 'api' ],
                validate    : {
                    payload : schema
                },
                handler     : handler.create
            }
        },

        {
            method : 'PUT',
            path   : '/users/{_id}',
            config : {
                description : 'Update a user',
                notes       : 'Update a user',
                tags        : [ 'api' ],
                validate    : {
                    payload : schema,
                    params  : {
                        _id : Joi.number().integer().min(1)
                    }
                },
                handler     : handler.update
            }
        },

        {
            method : 'DELETE',
            path   : '/users/{_id}',
            config : {
                description : 'Delete a user',
                notes       : 'Delete a user',
                tags        : [ 'api' ],
                validate    : {
                    params  : {
                        _id : Joi.number().integer().min(1)
                    }
                },
                handler     : handler.delete
            }
        },

        {
            method : 'GET',
            path   : '/users/insertRandom/{number}',
            config : {
                description : 'Insert a given number of random users',
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