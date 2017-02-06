'use strict';

const manifest = require('./config/manifest');

/**
 * API set up only with local configuration
 */
manifest.init().then(server => {
    server.start(err => {
        if (err) {
            throw err;
        }

        console.log(`Server running at: ${server.info.uri}`);
    });
}).catch(err => {
    throw err;
});