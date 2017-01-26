'use strict';
//TODO more != HTTP code
const _     = require('lodash');
const Faker = require('faker');
const MAX_RAND_INSERTED = 100;

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
    nbUsers = Math.min(nbUsers, MAX_RAND_INSERTED);

    let user = new request.server.database.user();
    let count = 0;
    for (let i = 0 ; i < nbUsers ; i++) {
        user.set({
            login    : Faker.Internet.userName(),
            password : Faker.Name.findName(),
            email    : Faker.Internet.email(),
            firstName: Faker.Name.firstName(),
            lastName : Faker.Name.lastName(),
            company  : Faker.Company.companyName(),
            function : Faker.Company.findName(),
            nir      : Faker.Helpers.randomNumber()///^[12][0-9]{2}[0-1][0-9](2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}[0-9]{2}$/
        });

        user.save().then(saved => {
            count++;
        }).catch(err => {
        });
    }

    response(null, count+' documents inserted');
};