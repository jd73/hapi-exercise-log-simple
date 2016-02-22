'use strict';

module.exports.save = function (request, reply) {

    request.models.Workout.create(
        request.payload,
        {
            include: [request.models.Exercise]
        }).then((workout) => {

        return reply(workout);
    });
};

module.exports.list = function (request, reply) {

    request.models.Workout.findAll({
        include: [{
            model: request.models.Exercise
        }]
    }).then((workouts) => {
        return reply(workouts);
    });
};
