'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const Server = require('../../lib');


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('/workouts', () => {

    it('returns an empty list at first', (done) => {

        Server.init({ test: true }, 0, (err, server) => {

            expect(err).to.not.exist();

            server.inject('/workouts', (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal([]);

                server.stop(done);
            });
        });
    });

    it('returns a bad request error if sent an invalid workout', (done) => {

        Server.init({ test: true }, 0, (err, server) => {

            expect(err).to.not.exist();

            const request = { method: 'POST', url: '/workouts', payload: { garbage: 'some garbage' } };
            server.inject(request, (res) => {

                expect(res.statusCode).to.equal(400);

                server.stop(done);
            });
        });
    });

    it('allows you to post and get a valid workout', (done) => {

        Server.init({ test: true }, 0, (err, server) => {

            expect(err).to.not.exist();

            const exercise = { name: 'kettlebell swings' };
            const exerciseRequest = { method: 'POST', url: '/exercises', payload: exercise };
            server.inject(exerciseRequest, (exercisePostResponse) => {

                expect(exercisePostResponse.statusCode).to.equal(200);

                const workout = {
                    date: new Date().toISOString(),
                    exercises: [exercise.name]
                };

                const request = { method: 'POST', url: '/workouts', payload: workout };
                server.inject(request, (postRes) => {

                    expect(postRes.statusCode).to.equal(200);

                    const returnedExercise = JSON.parse(exercisePostResponse.payload);

                    const expectedAssociatedExercise = {
                        name: exercise.name,
                        createdAt: returnedExercise.createdAt,
                        updatedAt: returnedExercise.updatedAt
                    };

                    const expectedPostSaveWorkout = {
                        id: 1,
                        date: workout.date,
                        exercises: [expectedAssociatedExercise]
                    };

                    server.inject('/workouts', (getRes) => {

                        expect(getRes.statusCode).to.equal(200);
                        expect(getRes.result).to.deep.include(expectedPostSaveWorkout);

                        server.stop(done);
                    });
                });
            });
        });
    });
});
