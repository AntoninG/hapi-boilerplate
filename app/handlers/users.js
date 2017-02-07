'use strict';

const _       = require('lodash');
const Faker   = require('faker');
const RandExp = require('randexp');
const mails   = require('./mails');
const encrypt = require('@antoning/iut-encrypt');
const MAX_RAND_INSERTED = 100;

/**
 * Read one user, search base on _id
 *
 * @param request
 *      params._id
 * @param reply
 */
module.exports.readOne = (request, reply) => {
    const User = request.server.database.user;

    User.findOne({_id: request.params._id}, (err, user) => {
        if (err) {
            reply.badImplementation(err.message, err);
            return;
        }

        if (user == null) {
            reply.notFound("User not found");
            return;
        }

        reply(user.toObject());
    });
};

/**
 * Read all users stored
 *
 * @param request
 * @param reply
 */
module.exports.readAll = (request, reply) => {
    const User = request.server.database.user;

    User.find({}, (err, users) => {
        if (err) {
           reply.badImplementation(err.message, err);
           return;
        }

        if (users == null || users.length < 1) {
            users = [];
        } else {
            users = users.map(user => user.toObject());
        }

        reply(users);
    });
};

/**
 * Create a user
 *
 * @param request
 * @param reply
 */
module.exports.create = (request, reply) => {
    const user = new request.server.database.user();

    user.set(request.payload);
    let plainPassword = user.password;

    user.save().then(saved => {
        mails.sendCreation(request.server.app.envs.mail, saved, plainPassword, error => {
            if (error) {
                reply.badImplementation(error.message, error);
                return;
            }

            reply(saved.toObject()).code(201);
        });
    }).catch(err => {
        reply.badImplementation(err.message, err);
    });
};

/**
 * Update a user
 *
 * @param request
 * @param reply
 */
module.exports.update = (request, reply) => {
    const User = request.server.database.user;

    User.findOne({_id: request.params._id}, (err, user) => {
        if (err) {
            reply.badImplementation(err.message, err);
            return;
        }

        if (user == null) {
            reply.notFound("User not found");
            return;
        }

        let oldPassword = user.password;
        let oldLogin    = user.login;
        _.merge(user, request.payload);
        user.save().then(saved => {

            if (saved.password !== oldPassword || saved.login !== oldLogin) {
                mails.sendUpdate(request.server.app.envs.mail, saved, error => {
                    if (error) {
                        reply.badImplementation(error.message, error);
                        return;
                    }

                    reply(saved.toObject()).code(201);
                })
            } else {
                reply(saved.toObject()).code(201);
            }

        }).catch(err => {
            reply.badImplementation(err.message, err);
        });
    });
};

/**
 * Delete a user
 *
 * @param request
 * @param reply
 */
module.exports.delete = (request, reply) => {
    const User = request.server.database.user;

    User.findOneAndRemove({_id: request.params._id}, err => {
        if (err) {
            reply.badImplementation(err.message, err);
            return;
        }

        reply({}).code(204);
    });
};

/**
 * Insert a {number}
 *
 * @param request
 *      params.number: between 1 and 100, if higher than 100, 100 kept
 * @param reply
 */
module.exports.insertUsers = (request, reply) => {
    let nbUsers = request.params.number;
    nbUsers = Math.min(nbUsers, MAX_RAND_INSERTED);

    let user,
        users = [];
    for (let i = 0 ; i < nbUsers ; i++) {
        user = new request.server.database.user();
        user.set({
            login    : Faker.internet.userName(),
            password : Faker.internet.password(),
            email    : Faker.internet.email(),
            firstName: Faker.name.firstName(),
            lastName : Faker.name.lastName(),
            company  : Faker.company.companyName(),
            function : Faker.name.jobTitle(),
            nir      : new RandExp('^[12][0-9]{2}[0-1][0-9](2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}[0-9]{2}$').gen()
        });

        users.push(user.save());
    }

    Promise.all(users).then(users => {
        users = users.map(user => { user.toObject(); });
        reply(users);
    }).catch(err => {
        reply.badImplementation(err.message, err);
    });
};

/**
 * Authentication request
 *
 * @param request
 *      payload : valid auth Joi schema (login + password)
 * @param reply
 */
module.exports.authent = (request, reply) => {
    const User = request.server.database.user;
    let auth   = request.payload;

    User.findOne({login: auth.login}, (err, user) => {
        if (err) {
            reply.badImplementation(err.message, err);
            return;
        }

        let hash = encrypt.encodeSha1(auth.password);
        if (user == null || user.password !== hash) {
            reply({msg : 'KO'}).code(401);
            return;
        }

        reply({msg : 'OK'});
    });
};

/**
 * Request for password reset, send a mail with the new password
 *
 * @param request
 *      params.email : valid and existing email
 * @param reply
 */
module.exports.passwordReset = (request, reply) => {
    const User = request.server.database.user;
    let email  = request.params.email;

    User.findOne({email: email}, (err, user) => {
        if (err) {
            reply.badImplementation(err.message, err);
            return;
        }

        if (user == null) {
            reply.notFound("No correspondence");
            return;
        }

        let password = Faker.internet.password();
        while (password == user.password) { password = Faker.internet.password(); }
        user.password = password;

        user.save().then(saved => {
            mails.sendResetPassword(request.server.app.envs.mail, saved.toObject(), password, error => {
                if (error) {
                    reply.badImplementation(error.message, error);
                    return;
                }

                reply({});
            });
        }).catch(err => {
            reply.badImplementation(err.message, err);
        });
    })
};