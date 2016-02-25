'use strict';

const Joi = require('joi');

module.exports = Joi.object({
    date: Joi.date().required(),
    exercises: Joi.array().items(Joi.string()).unique()
});
