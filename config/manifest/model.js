'use strict';

const path      = require('path');
const modelsDir = path.join(__dirname, '../../app/models/');

module.exports.init = server => {
    return new Promise((resolve, reject) => {
        server.register({
            register: require('k7'),
            options: {
                connectionString : server.app.envs.connections.db.url,
                adapter          : server.app.envs.connections.db.adapter,
                models           : [
                    path.join(modelsDir, '**/*.js')
                ],
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