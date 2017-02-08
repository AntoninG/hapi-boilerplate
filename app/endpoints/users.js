'use strict';

const handler = require('../handlers/users');
const Joi     = require('joi');
const schemaUser = require('../schemas/users');
const schemaAuth = require('../schemas/auth');

exports.register = (server, options, next) => {
    server.route([
        /** Get one specific user by _id */
        {
            method : 'GET',
            path   : '/users/{_id}',
            config : {
                description : 'Get a specific user',
                notes       : 'Get a specific user thanks to its _id. This _id must be an integer >= 1.',
                tags        : [ 'api' ],
                validate    : {
                    params  : {
                        _id : Joi.number().integer().min(1)
                    }
                },
                handler     : handler.readOne
            }
        },

        /** Get all users */
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

        /** Create a new user */
        {
            method : 'POST',
            path   : '/users',
            config : {
                description : 'Create the user posted',
                notes       : 'Creation of user entity. The json object must respect the following schema : ' +
                'login, password, email, firstName and lastName required ' +
                'email must be a valid email. ' +
                'nir must be a valid nir ' +
                'firstName and lastName have a length between 2 and 120 ' +
                'company and function are optional, as nir, and must have a length between 2 and 100 ' +
                'password has a length between 8 and 60, login has a length between 3 and 30 ' +
                'These fields accept alphanumerical chars (min and maj) plus : . _ -'
                ,
                tags        : [ 'api' ],
                validate    : {
                    payload : schemaUser
                },
                handler     : handler.create
            }
        },

        /** Update a user on _id */
        {
            method : 'PUT',
            path   : '/users/{_id}',
            config : {
                description : 'Update a user',
                notes       : 'Update a user. The _id parameter mut be a positive integer. The json object must respect the following schema : ' +
                'login, password, email, firstName and lastName required ' +
                'email must be a valid email. ' +
                'nir must be a valid nir ' +
                'firstName and lastName have a length between 2 and 120 ' +
                'company and function are optional, as nir, and must have a length between 2 and 100 ' +
                'password has a length between 8 and 60, login has a length between 3 and 30 ' +
                'These fields accept alphanumerical chars (min and maj) plus : . _ -',
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

        /** Delete a user on _id */
        {
            method : 'DELETE',
            path   : '/users/{_id}',
            config : {
                description : 'Delete a user',
                notes       : 'Delete a user. The _id parameter mut be a positive integer.',
                tags        : [ 'api' ],
                validate    : {
                    params  : {
                        _id : Joi.number().integer().min(1)
                    }
                },
                handler     : handler.delete
            }
        },

        /** Insert a give number of random users */
        {
            method : 'GET',
            path   : '/users/insertRandom/{number}',
            config : {
                description : 'Insert a given number of random users',
                notes       : 'Maximum 100 users inserted. The _id parameter mut be a positive integer.',
                tags        : [ 'api' ],
                validate    : {
                    params  : {
                        number : Joi.number().integer().min(1).max(100)
                    }
                },
                handler     : handler.insertUsers
            }
        },

        /** Try to authenticate a user */
        {
            method : 'POST',
            path   : '/authent',
            config : {
                description : 'Authenticate a user',
                notes       : 'Authentication a user on login/password couple. ' +
                'The json object must respect the following schema : ' +
                'login and password required : ' +
                'password has a length between 8 and 60, login has a length between 3 and 30 ' +
                'These fields accept alphanumerical chars (min and maj) plus : . _ -',
                tags        : [ 'api' ],
                validate    : {
                    payload : schemaAuth
                },
                handler     : handler.authent
            }
        },

        /** Reset the password of a user, searched on its email */
        {
            method : 'GET',
            path   : '/users/resetpassword/{email}',
            config : {
                description : 'Reset the password of a user',
                notes       : 'Reset the password of a user and send him the new one by mail. ' +
                'The parameter email must be a valid and existing email.',
                tags        : [ 'api' ],
                validate    : {
                    params  : {
                        email : Joi.string().email()
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