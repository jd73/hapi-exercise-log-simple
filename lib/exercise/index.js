'use strict';

const Joi = require('joi');

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
            handler: Controller.list,
            description: 'Get Exercises',
            notes: 'Returns all saved workouts',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema': Joi.array().items(Exercise).label('Exercises Array')
                        }
                    }
                }
            }
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
            handler: Controller.save,
            description: 'Save Exercise',
            notes: 'Saves a new exercise',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema': Exercise
                        },
                        '400': { 'description': 'Bad Request' }
                    }
                }
            }
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
