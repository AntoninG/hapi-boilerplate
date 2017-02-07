'use strict';

const jsonToMongoose = require('json-mongoose');
const encrypt        = require('@antoning/iut-encrypt');
const mongoose       = require('k7-mongoose').mongoose();

module.exports = jsonToMongoose({
    mongoose    : mongoose,
    collection  : 'user',
    schema      : require('../schemas/users'),
    autoinc     : {
        field       : '_id',
        startAt     : 1,
        incrementBy : 1
    },
    pre         : {
        save    : (doc, next) => {
            // Encode password only if it was modified
            if (doc.isModified('password')) {
                let hash = encrypt.encodeSha1(doc.password);

                if (hash === false) {
                    return next(new Error('Unable to encode password'));
                }
                doc.password = hash;
            }

            return next();
        }
    },
    schemaUpdate : (schema) => {
        schema.login.unique = true;
        schema.email.unique = true;
        schema.nir.unique   = true;

        return schema;
    },
    // Called on each .toObject()
    transform : (doc, ret, options) => {
        delete ret.password;
        delete ret.nir;

        return ret;
    }
});