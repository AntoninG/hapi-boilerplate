'use strict';

const _ = require('lodash');

module.exports.readOne = (request, response) => {

};

module.exports.readAll = (request, response) => {

};

/**
 *
 * @param request
 * @param response
 */
module.exports.create = (request, response) => {
    let model = new request.server.database.user();

    model.set(request.payload);

    model.save().then(saved => {
        response(null, 'OK');
    }).catch(err => {
        response.boom(500, 'Error on save', _.omit(request.payload, ['password', 'nir']));
    });
};

module.exports.update = (request, response) => {

};

module.exports.delete = (request, response) => {

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