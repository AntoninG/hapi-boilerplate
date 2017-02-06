'use strict';

module.exports.root = (request, response) => {
    response(null,  {
        result : 'You\'re connected'
    });
};