'use strict';

const Exercise = require('./exercise');
const Controller = require('./controller');

const internals = {};

const root = '/exercises';

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: root,
        config: {
            tags: ['api'],
            handler: Controller.list
        }
    });

    server.route({
        method: 'POST',
        path: root,
        config: {
            tags: ['api'],
            validate: {
                payload: Exercise
            },
            handler: Controller.save
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
