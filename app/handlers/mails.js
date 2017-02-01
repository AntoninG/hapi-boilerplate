'use strict';
//TODO make promises

const Nodemailer = require('nodemailer');
const Mailgen    = require('mailgen');

/**
 *
 * @param mailConfig
 * @param user
 * @param plainPassword
 * @param callback
 */
module.exports.sendCreation = (mailConfig, user, plainPassword, callback) => {
    const mailGenerator = new Mailgen({
        theme   : 'salted',
        product : {
            name: 'API',
            link: 'http://localhost:8080/documentation'
        }
    });

    let email = {
        body: {
            name  : user.firstName + ' ' + user.lastName,
            intro : 'Welcome on API ! We\'re very excited to have you among us.',
            outro : ['Here is you login : ' + user.login, 'And your password : ' + plainPassword]
        }
    };

    return Nodemailer.createTransport(mailConfig.smtpConfig).sendMail({
        from: '"'+mailConfig.name+'" <'+mailConfig.smtpConfig.auth.user+'>',
        to: user.email,
        subject: 'Hello ✔',
        text: mailGenerator.generatePlaintext(email),
        html: mailGenerator.generate(email)
    }, (error, info) => {
        if(error){
            callback(error);
            return;
        }

        callback(null);
    });


};

/**
 *
 * @param mailConfig
 * @param user
 * @param callback
 */
module.exports.sendUpdate = (mailConfig, user, callback) => {
    const mailGenerator = new Mailgen({
        theme   : 'salted',
        product : {
            name: 'API',
            link: 'http://localhost:8080/documentation'
        }
    });

    let email = {
        body: {
            name  : user.firstName + ' ' + user.lastName,
            intro : 'Welcome on API ! We\'re very excited to have you among us.',
            outro : ['Here is you login : ' + user.login, 'And your password : ' + plainPassword]
        }
    };

    return Nodemailer.createTransport(mailConfig.smtpConfig).sendMail({
        from: '"'+mailConfig.name+'" <'+mailConfig.smtpConfig.auth.user+'>',
        to: user.email,
        subject: 'Hello ✔',
        text: mailGenerator.generatePlaintext(email),
        html: mailGenerator.generate(email)
    }, (error, info) => {
        if(error){
            callback(error);
            return;
        }

        callback(null);
    });
};