'use strict';

const Exercise = require('./exercise');
const Controller = require('./controller');

const SwaggerRouteGenerator = require('../util/swagger_route_generator');

const internals = {};

const root = '/exercises';

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: root,
        config: Object.assign({
            tags: ['api'],
            handler: Controller.list
        }, SwaggerRouteGenerator.list('Exercise', Exercise))
    });

    server.route({
        method: 'POST',
        path: root,
        config: Object.assign({
            tags: ['api'],
            validate: {
                payload: Exercise
            },
            handler: Controller.save
        }, SwaggerRouteGenerator.save('Exercise', Exercise))
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
