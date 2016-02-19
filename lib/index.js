'use strict';

// Load modules

const Hapi = require('hapi');
const Blipp = require('blipp');

const ExerciseModule = require('./exercise/index');

exports.init = function (port, next) {

    const server = new Hapi.Server();
    server.connection({ port: port });
    server.register([
        Blipp,
        ExerciseModule,
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

        let db = server.plugins['hapi-sequelize'].db;
        db.sequelize.sync().then(() => {
            console.log('models synced');
        });

        server.ext('onPreHandler', function(modelCollections) {
            console.log('onPreHandler');
            return (request, reply) => {
                request.models = modelCollections;
                reply.continue();
            }
        }(server.plugins['hapi-sequelize'].db.sequelize.models));

        server.start((err) => {

            return next(err, server);
        });
    });
};
