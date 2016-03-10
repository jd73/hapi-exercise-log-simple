'use strict';

const Workout = require('./workout');
const Controller = require('./controller');

const SwaggerRouteGenerator = require('../util/swagger_route_generator');

const internals = {};

const root = '/workouts';

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: root,
        config: Object.assign({
            tags: ['api'],
            handler: Controller.list
        }, SwaggerRouteGenerator.list('Workout', Workout))
    });

    server.route({
        method: 'POST',
        path: root,
        config: Object.assign({
            tags: ['api'],
            validate: {
                payload: Workout
            },
            handler: Controller.save
        }, SwaggerRouteGenerator.save('Workout', Workout))
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
