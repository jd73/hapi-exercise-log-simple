'use strict';

const Exercise = require('./exercise');
const Controller = require('./controller');
const Repository = require('./repository');

const internals = {};

internals.repository = new Repository();

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        config: {
            bind: {
                repository: internals.repository
            },
            handler: Controller.list
        }
    });

    server.route({
        method: 'POST',
        path: '/',
        config: {
            bind: {
                repository: internals.repository
            },
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
