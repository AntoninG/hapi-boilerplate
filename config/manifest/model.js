'use strict';

const fs        = require('fs');
const path      = require('path');
const modelsDir = path.join(__dirname, '../../app/models/');
const models    = fs.readdirSync(modelsDir);

module.exports.init = server => {
    return new Promise((resolve, reject) => {
        server.register({
            register: require('k7'),
            options: {
                connectionString : server.app.envs.connections.db.url,
                adapter          : server.app.envs.connections.db.adapter,
                models           : models,
            }
        }, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};