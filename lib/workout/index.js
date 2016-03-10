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
            tags: ['api'],
            handler: Controller.list,
            description: 'Get Workouts',
            notes: 'Returns all saved workouts'
        }
    });

    server.route({
        method: 'POST',
        path: root,
        config: {
            tags: ['api'],
            validate: {
                payload: Workout
            },
            handler: Controller.save,
            description: 'Save Workout',
            notes: 'Saves a new workout'
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
