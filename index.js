'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');

const ExerciseRepository = require('./lib/repository/exercise_repository');
const Exercise = require('./lib/models/exercise');
const ExerciseController = require('./lib/controllers/exercise');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register([Blipp], (err) => {
  if (err) {
    console.error('Failed to load a plugin:', err);
  }
});

const repository = new ExerciseRepository();

server.route({
  method: 'GET',
  path: '/',
  config: {
    bind: {
      repository: repository
    },
    handler: ExerciseController.list
  }
});

server.route({
  method: 'POST',
  path: '/',
  config: {
    bind: {
      repository: repository
    },
    validate: {
      payload: Exercise
    },
    handler: ExerciseController.save
  }
});

server.start(() => {
  console.log('Server running at:', server.info.uri);
});