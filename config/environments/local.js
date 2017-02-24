'use strict';

const mongoose = require('k7-mongoose');

module.exports = {
    connections : {
        db : {
            url     : 'mongodb://localhost:27017/hapi',
            adapter : mongoose
        }
    },
    mail : {
        service : {
            url : 'http://127.0.0.1:8081'
        }
    }
};
