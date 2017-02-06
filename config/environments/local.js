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
        smtpConfig  : {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'antonin.guiletdupont@gmail.com',
                pass: 'manon190295'
            }
        },
        name    : 'Antonin GUILET'
    }
};
