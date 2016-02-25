'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const Options = require('../lib/options');

// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const it = lab.test;


it('sets sync options correctly according to whether test is true or false', (done) => {

    expect(Options.syncOptions(true)).to.deep.equal({ force: true });
    expect(Options.syncOptions(false)).to.deep.equal({});

    done();
});

it('sets good options correctly according to whether test is true or false', (done) => {

    expect(Options.goodOptions(true)).to.deep.equal(Options.GOOD_OPTIONS_TEST);
    expect(Options.goodOptions(false)).to.deep.equal(Options.GOOD_OPTIONS);

    done();
});

