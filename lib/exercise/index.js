'use strict';

const Repository = require('./repository');
const Exercise = require('./exercise');
const Routes = require('./routes');

var internals = {};

internals.repository = new Repository();

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/',
    config: {
      bind: {
        repository: internals.repository
      },
      handler: Routes.list
    }
  });

  server.route({
    method: 'POST',
    path: '/',
    config: {
      bind: {
        repository: internals.repository
      },
      validate: {
        payload: Exercise
      },
      handler: Routes.save
    }
  });

  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};