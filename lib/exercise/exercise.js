'use strict';

const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().required().description('The name of the exercise')
}).label('Exercise');
