'use strict';

const Joi = require('joi');

module.exports.list = (name, responseModel) => {

    const plural = name + 's';

    return {
        description: 'Get ' + plural,
        notes: 'Returns all saved ' + name.toLowerCase() + 's',
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': {
                        'description': 'Success',
                        'schema': Joi.array().items(responseModel).label(plural + ' Array')
                    }
                }
            }
        }
    };
};

module.exports.save = (name, responseModel) => {

    return {
        description: 'Save ' + name,
        notes: 'Saves a new ' + name.toLowerCase(),
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': {
                        'description': 'Success',
                        'schema': responseModel
                    },
                    '400': { 'description': 'Bad Request' }
                }
            }
        }
    };
};
