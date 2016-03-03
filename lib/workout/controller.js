'use strict';

const DateFormatter = require('../util/date_formatter');

const internals = {};

internals.formatExercise = (dbExercise) => {

    const exercise = dbExercise.get({
        plain: true
    });
    exercise.createdAt = DateFormatter.formatDate(exercise.createdAt);
    exercise.updatedAt = DateFormatter.formatDate(exercise.updatedAt);
    return exercise;
};

internals.formatWorkout = (dbObject) => {

    const workout = dbObject.dataValues;
    workout.date = DateFormatter.formatDate(workout.date);
    workout.createdAt = DateFormatter.formatDate(workout.createdAt);
    workout.updatedAt = DateFormatter.formatDate(workout.updatedAt);

    const exerciseArray = [];
    if (dbObject.Exercises) {
        dbObject.Exercises.forEach((dbExercise) => {

            exerciseArray.push(internals.formatExercise(dbExercise));
        });
        delete workout.Exercises;
    }
    workout.exercises = exerciseArray;
    return workout;
};

module.exports.save = function (request, reply) {

    request.models.Workout.create(request.payload)
        .then((workout) => {

            workout.setExercises(request.payload.exercises).then(() => {

                return reply(internals.formatWorkout(workout));
            });
        });
};

module.exports.list = function (request, reply) {

    request.models.Workout.findAll({
        include: [{
            model: request.models.Exercise
        }]
    }).then((workouts) => {

        const response = [];
        workouts.forEach( (workout) => {

            response.push(internals.formatWorkout(workout));
        });

        return reply(response);
    });
};
