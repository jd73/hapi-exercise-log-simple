'use strict';

const Hapi = require('hapi');
const ExerciseRepository = require('./src/repository/exercise_repository');
const Exercise = require('./src/models/exercise');
const Blipp = require('blipp');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register([Blipp], (err) => {
  if (err) {
    console.error('Failed to load a plugin:', err);
  }
});

server.bind({
  repository: new ExerciseRepository()
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    return reply(this.repository.list());
  }
});

server.route({
  method: 'POST',
  path: '/',
  handler: function (request, reply) {
    this.repository.add(request.payload);
    return reply('Saved');
  },
  config: {
    validate: {
      payload: Exercise
    }
  }
});

server.start(() => {
  console.log('Server running at:', server.info.uri);
});