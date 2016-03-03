'use strict';

const internals = {};

internals.formatDate = (dbDate) => {

    return dbDate instanceof Date ? dbDate.toISOString() : dbDate;
};

internals.formatExercise = (dbExercise) => {

    const exercise = dbExercise.get({
        plain: true
    });

    exercise.createdAt = internals.formatDate(exercise.createdAt);
    exercise.updatedAt = internals.formatDate(exercise.updatedAt);
    delete exercise.exercise_workout;

    // {
    //    name: dbExercise.dataValues.name,
    //    createdAt: internals.formatDate(dbExercise.dataValues.createdAt),
    //    updatedAt: internals.formatDate(dbExercise.dataValues.updatedAt)
    //
    //};

    console.log('format exercise');
    console.dir(exercise);

    return exercise;
};

internals.formatWorkout = (dbObject) => {

    const workout = dbObject.dataValues;
    workout.date = internals.formatDate(workout.date);
    workout.createdAt = internals.formatDate(workout.createdAt);
    workout.updatedAt = internals.formatDate(workout.updatedAt);

    const exerciseArray = [];
    if (dbObject.Exercises) {
        dbObject.Exercises.forEach((dbExercise) => {
            exerciseArray.push(internals.formatExercise(dbExercise));
        });
        delete workout.Exercises;
    }
    workout.exercises = exerciseArray;
    return workout;
};

module.exports.save = function (request, reply) {

    console.log('== BEGIN WORKOUT SAVE ==');
    request.models.Workout.create(request.payload)
        .then((workout) => {

            console.log('== WORKOUT SAVED ==');
            workout.setExercises(request.payload.exercises).then(() => {

                console.log('== EXERCISE ASSOCIATED TO WORKOUT ==');
                return reply(internals.formatWorkout(workout));
            });
        });
};

module.exports.list = function (request, reply) {

    request.models.Workout.findAll({
        include: [{
            model: request.models.Exercise
        }]
    }).then((workouts) => {

        const response = [];

        workouts.forEach( (workout) => {

            console.log('== GOT WORKOUT ==');
            //console.dir(workout);
            //console.log('== WORKOUT.EXERCISES ==');
            //console.dir(workout.Exercises);

            response.push(internals.formatWorkout(workout));
        });

        return reply(response);
    });
};
