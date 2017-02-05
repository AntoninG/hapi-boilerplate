'use strict';

const handler = require('../handlers/users');
const Joi     = require('joi');
const schemaUser = require('../schemas/users');
const schemaAuth = require('../schemas/auth');

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
                    payload : schemaUser
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
                    payload : schemaUser,
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
                validate    : {
                    params  : {
                        number : Joi.number().integer().min(1)
                    }
                },
                handler     : handler.insertUsers
            }
        },

        {
            method : 'POST',
            path   : '/authent',
            config : {
                description : 'Authenticate a user',
                notes       : 'Authentication a user on login/password couple',
                tags        : [ 'api' ],
                validate    : {
                    payload : schemaAuth
                },
                handler     : handler.authent
            }
        },

        {
            method : 'GET',
            path   : '/users/resetpassword/{_id}',
            config : {
                description : 'Reset the password of a user',
                notes       : 'Reset the password of a user and send him the new one by mail',
                tags        : [ 'api' ],
                validate    : {
                    params  : {
                        _id : Joi.number().integer().min(1)
                    }
                },
                handler     : handler.passwordReset
            }
        }
    ]);
    next();
};

exports.register.attributes = {
    name : 'user-routes'
};