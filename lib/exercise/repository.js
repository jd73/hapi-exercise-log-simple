'use strict';

const _ = require('lodash');

const ExerciseRepository = function () {

    this.exercises = [];
};

ExerciseRepository.prototype.add = function (exercise) {

    this.exercises.push(exercise);
};

ExerciseRepository.prototype.list = function () {

    return this.exercises;
};

ExerciseRepository.prototype.find = function (name) {

    return _.find(this.exercises, (exercise) => {

        return exercise.name === name;
    });
};

// export the class
module.exports = ExerciseRepository;
