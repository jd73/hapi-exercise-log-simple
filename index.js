'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');

const Exercise = require('./lib/exercise/index');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register([
  Blipp,
  Exercise
], (err) => {
  if (err) {
    console.error('Failed to load a plugin:', err);
  }
});

server.start(() => {
  console.log('Server running at:', server.info.uri);
});