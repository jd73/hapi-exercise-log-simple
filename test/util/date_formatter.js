'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const DateFormatter = require('../../lib/util/date_formatter');


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('DateFormatter', () => {

    it('formats dates correctly', (done) => {

        const date = new Date();
        expect(DateFormatter.formatDate(date)).to.equal(date.toISOString());
        done();
    });

    it('handles non-dates correctly', (done) => {

        const somethingElse = 'something not a date';
        expect(DateFormatter.formatDate(somethingElse)).to.equal(somethingElse);
        done();
    });

    it('handles null correctly', (done) => {

        expect(DateFormatter.formatDate(null)).to.equal(null);
        done();
    });
});
