'use strict';

const Hapi          = require('hapi');
const plugins       = require('./manifest/plugins');
const routes        = require('./manifest/routes');
const userModel     = require('./manifest/model.js');
const serverConfig  = require('./manifest/server');

module.exports.init = () => {
    const server = new Hapi.Server();

    return Promise.resolve().then(() => {
        return serverConfig.init(server);
    }).then(() => {
        // Plugins configuration
        return plugins.init(server);
    }).then(() => {
        // Routes configuration
        return routes.init(server);
    }).then(() => {
        // User model configuration
        return userModel.init(server);
    }).then(() => {
        return server;
    }).catch(err => {
        console.log(err);
    });
};