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
        ExerciseModule
    ], (err) => {

        if (err) {
            return next(err);
        }

        server.start((err) => {

            return next(err, server);
        });
    });
};
