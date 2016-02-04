'use strict';

const _ = require('lodash');

function ExerciseRepository() {
  this.exercises = [];
}

ExerciseRepository.prototype.add = function(exercise) {

  this.exercises.push(exercise);
};

ExerciseRepository.prototype.list = function () {

  return this.exercises;
};

ExerciseRepository.prototype.find = function (name) {

  return _.find(this.exercises, function(exercise) {

    return exercise.name === name;
  });
};

// export the class
module.exports = ExerciseRepository;