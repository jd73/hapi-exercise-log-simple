'use strict';

const Joi = require('joi');

const internals = {};

internals.exercise_id_object = Joi.object({
    name: Joi.string().required()
});

module.exports = Joi.object({
    name: Joi.string().required(),
    exercises: Joi.array().items(internals.exercise_id_object).unique()
});
