'use strict';

module.exports.save = function (request, reply) {
  this.repository.add(request.payload);
  return reply('Saved');
};

module.exports.list = function (request, reply) {
  return reply(this.repository.list());
};
