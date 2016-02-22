'use strict';

const Workout = require('./workout');
const Controller = require('./controller');

const internals = {};

const root = '/workouts';

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: root,
        config: {
            handler: Controller.list
        }
    });

    server.route({
        method: 'POST',
        path: root,
        config: {
            //validate: {
            //    payload: Workout
            //},
            handler: Controller.save
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
