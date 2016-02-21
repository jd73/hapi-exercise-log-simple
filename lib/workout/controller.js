'use strict';

module.exports.save = function (request, reply) {

    request.models.Workout.create(request.payload).then(() => {

        return reply('Workout saved');
    });
};

module.exports.list = function (request, reply) {

    request.models.Workout.findAll().then((workouts) => {

        return reply(workouts);
    });
};
