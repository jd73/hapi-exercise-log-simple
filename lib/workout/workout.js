'use strict';

const Joi = require('joi');

module.exports = Joi.object({
    date: Joi.date().required().description('When the workout began'),
    exercises: Joi.array().items(Joi.string()).unique().description('The exercises done as part of the workout')
});
