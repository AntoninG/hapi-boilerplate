'use strict';

const mongoose = require('k7-mongoose');

module.exports = {
    connections : {
        db : {
            url     : 'mongodb://localhost:27017/hapi',
            adapter : mongoose
        }
    }
};
