'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const ExerciseRepository = require('../../lib/exercise/repository');


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('ExerciseRepository', () => {

    it('returns an empty list at first', (done) => {

        const repository = new ExerciseRepository();

        expect(repository.list()).to.deep.equal([]);

        done();
    });

    it('allows you to add and retrieve an exercise', (done) => {

        const repository = new ExerciseRepository();

        const exerciseOne = { name: 'kettlebell swings' };
        const exerciseTwo = { name: 'Turkish getup' };

        repository.add(exerciseOne);
        repository.add(exerciseTwo);

        expect(repository.list()).to.deep.equal([exerciseOne, exerciseTwo]);

        done();
    });

    it('allows you to add and retrieve an exercise by name', (done) => {

        const repository = new ExerciseRepository();

        const exerciseOne = { name: 'kettlebell swings' };
        const exerciseTwo = { name: 'Turkish getup' };

        repository.add(exerciseOne);
        repository.add(exerciseTwo);

        expect(repository.find('Turkish getup')).to.deep.equal(exerciseTwo);

        done();
    });
});
