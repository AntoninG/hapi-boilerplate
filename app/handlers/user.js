'use strict';

const _ = require('lodash');

/**
 *
 * @param request
 * @param response
 */
module.exports.readOne = (request, response) => {
    const User = request.server.database.user;

    User.findOne({_id: request.params._id}, (err, user) => {
        if (err) {
            response.boom(500, 'Error on read user _id', request.params._id);
        }

        response(null, user.toObject());
    });
};

/**
 *
 * @param request
 * @param response
 */
module.exports.readAll = (request, response) => {
    const User = request.server.database.user;

    User.find({}, (err, users) => {
       if (err) {
           response.boom(500, 'Error on read all users');
       }

       users = users.map(user => user.toObject());
       response(null, users);
    });
};

/**
 *
 * @param request
 * @param response
 */
module.exports.create = (request, response) => {
    const user = new request.server.database.user();

    user.set(request.payload);

    user.save().then(saved => {
        response(null, 'OK');
    }).catch(err => {
        response.boom(500, 'Error on save', user.toObject());
    });
};

/**
 *
 * @param request
 * @param response
 */
module.exports.update = (request, response) => {
    const User = request.server.database.user;

    User.findOne({_id: request.params._id}, (err, user) => {
        if (err) {
            response.boom(500, 'Error on update', {
                _id: request.params._id,
                body: _.omit(request.payload, ['password', 'nir'])
            });
        }

        _.merge(user, request.payload);
        user.save().then(saved => {
            response(null, 'OK');
        }).catch(err => {
            response.boom(500, 'Error on update', user.toObject());
        });
    });
};

/**
 *
 * @param request
 * @param response
 */
module.exports.delete = (request, response) => {
    const User = request.server.database.user;

    User.findOneAndRemove({_id: request.params._id}, err => {
        if (err) {
            response.boom(500, 'Error delete', {_id: request.params._id});
        }

        response(null, 'OK');
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