'use strict';

const jsonToMongoose = require('json-mongoose');
const async          = require('async');
const encrypt        = require('@antoning/iut-encrypt');
const mongoose       = require('k7-mongoose').mongoose();

module.exports = jsonToMongoose({
    mongoose    : mongoose,
    collection  : 'user',
    schema      : require('../schemas/user'),
    autoinc     : {
        field : '_id'
    },
    pre         : {
        save : (doc, next) => {
            async.parallel({
                password : done => {
                    let hash = encrypt.encodeSha1(doc.password);

                    if (hash !== false) {
                        doc.password = hash;
                        done();
                    } else {
                        return next(new Error('Unable to encode password'));
                    }
                }
            }, next);
        }
    },
    schemaUpdate : (schema) => {
        schema.login.unique = true;
        schema.email.unique = true;
        schema.nir.unique   = true;

        return schema;
    },
    transform : (doc, ret, options) => {
        delete ret.password;

        return ret;
    }
});