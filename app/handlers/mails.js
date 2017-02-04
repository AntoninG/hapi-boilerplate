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
    let email = {
        body: {
            name  : user.firstName + ' ' + user.lastName,
            intro : 'Welcome on API ! We\'re very excited to have you among us.',
            outro : ['Here is you login : ' + user.login, 'And your password : ' + plainPassword]
        }
    };

    return sendMail(mailConfig, user.email, email, callback);
};

/**
 *
 * @param mailConfig
 * @param user
 * @param callback
 */
module.exports.sendUpdate = (mailConfig, user, callback) => {
    let email = {
        body: {
            name  : user.firstName + ' ' + user.lastName,
            intro : 'Your credentials just changed.',
            outro : 'If you didn\'t ask for these changes, please contact our support team.'
        }
    };

    return sendMail(mailConfig, user.email, email, callback);
};

module.exports.sendResetPassword = (mailConfig, user, plainPassword, callback) => {
    let email = {
        body: {
            name  : user.firstName + ' ' + user.lastName,
            intro : 'You asked a reset password',
            outro : 'Here is your new one : ' + plainPassword
        }
    };

    return sendMail(mailConfig, user.email, email, callback);
};

const sendMail = function (config, recipient, email, callback) {
    const mailGenerator = new Mailgen({
        theme   : 'salted',
        product : {
            name: 'API',
            link: 'http://localhost:8080/documentation'
        }
    });

    return Nodemailer.createTransport(config.smtpConfig).sendMail({
        from: '"'+config.name+'" <'+config.smtpConfig.auth.user+'>',
        to: recipient,
        subject: 'Credentials changing',
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