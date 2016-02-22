'use strict';

module.exports.save = function (request, reply) {

    request.models.Workout.create(request.payload).then((workout) => {

        return reply(workout);
    });
};

module.exports.list = function (request, reply) {

    request.models.Workout.findAll().then((workouts) => {

        return reply(workouts);
    });
};
