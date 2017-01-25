'use strict';

const jsonToMongoose = require('json-mongoose');
const encrypt        = require('@antoning/iut-encrypt');
const mongoose       = require('k7-mongoose').mongoose();

module.exports = jsonToMongoose({
    mongoose    : mongoose,
    collection  : 'user',
    schema      : require('../schemas/user'),
    autoinc     : {
        field   : '_id'
    },
    pre         : {
        save : (doc, next) => {
            //TODO check on update
            let hash = encrypt.encodeSha1(doc.password);

            if (hash !== false) {
                doc.password = hash;
            } else {
                return next(new Error('Unable to encode password'));
            }
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