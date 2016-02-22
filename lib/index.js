'use strict';

// Load modules

const Hapi = require('hapi');

const Options = require('./options');

const ExerciseModule = require('./exercise/index');
const WorkoutModule = require('./workout/index');

exports.init = function (test, port, next) {

    const server = new Hapi.Server();
    server.connection({ port: port });
    server.register([
        require('blipp'),
        ExerciseModule,
        WorkoutModule,
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
            console.log('models');
            console.dir(models);

            models.Exercise.create({
                name: "Kettlebell swings"
            }).then((exercise) => {

                models.Workout.create({
                    name: "Kettlebell swing workout"
                }).then((workout) => {

                    console.dir(workout);

                    workout.addExercise(exercise).then((assWorkout) => {


                        console.log('associated');
                        console.dir(workout);

                        console.log('models synced');
                        server.ext('onPreHandler', (request, reply) => {

                            request.models = server.plugins['hapi-sequelize'].db.sequelize.models;
                            reply.continue();
                        });
                    });

                });
            });

            server.start((err) => {

                return next(err, server);
            });
        });
    });
};
