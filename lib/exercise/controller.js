'use strict';

module.exports.save = function (request, reply) {

    request.models.Exercise.create(request.payload).then(() => {

        return reply('Saved');
    });
};

module.exports.list = function (request, reply) {

    request.models.Exercise.findAll().then((exercises) => {

        return reply(exercises);
    });
};
