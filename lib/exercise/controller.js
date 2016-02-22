'use strict';

module.exports.save = function (request, reply) {

    request.models.Exercise.create(request.payload).then((exercise) => {

        return reply(exercise);
    });
};

module.exports.list = function (request, reply) {

    request.models.Exercise.findAll().then((exercises) => {

        return reply(exercises);
    });
};
