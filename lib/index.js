'use strict';

// Load modules

const Hapi = require('hapi');

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');

const Options = require('./options');

const ExerciseModule = require('./exercise/index');
const WorkoutModule = require('./workout/index');

const internals = {
    options: {
        info: {
            'title': 'API Documentation',
            'version': Pack.version
        }
    }
};

exports.init = function (test, port, next) {

    const server = new Hapi.Server();
    server.connection({ port: port });
    server.register([
        require('blipp'),
        ExerciseModule,
        WorkoutModule,
        Inert,
        Vision,
        {
            'register': HapiSwagger,
            'options': internals.options
        },
        {
            register: require('good'),
            options: Options.goodOptions(test)
        },
        {
            register: require('hapi-sequelize'),
            options: {
                database: 'hapi_exercise_log',
                user: 'hapi',
                pass: 'hapi123',
                dialect: 'postgres',
                port: 5432,
                models: 'lib/models/**/*.js',
                sequelize: {
                    define: {
                        underscoredAll: true
                    }
                }
            }
        }
    ], (err) => {

        if (err) {
            return next(err);
        }

        const db = server.plugins['hapi-sequelize'].db;
        const syncOptions = Options.syncOptions(test);
        db.sequelize.sync(syncOptions).then(() => {

            const models = db.sequelize.models;
            server.ext('onPreHandler', (request, reply) => {

                request.models = models;
                reply.continue();
            });

            server.start((err) => {

                return next(err, server);
            });
        });
    });
};
