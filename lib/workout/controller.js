'use strict';

const internals = {};

internals.formatDate = (dbDate) => {

    return dbDate.toISOString();
};

internals.formatWorkout = (dbObject) => {

    const workout = dbObject.dataValues;
    workout.date = internals.formatDate(workout.date);
    workout.createdAt = internals.formatDate(workout.createdAt);
    workout.updatedAt = internals.formatDate(workout.updatedAt);
    return workout;
};

module.exports.save = function (request, reply) {

    request.models.Workout.create(
        request.payload,
        {
            include: [request.models.Exercise]
        }).then((workout) => {

            return reply(internals.formatWorkout(workout));
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
