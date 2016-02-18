'use strict';

// Load modules

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Server = require('../lib');
const Exercise = require('../lib/exercise');


// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const it = lab.test;


it('starts server and returns hapi server object', (done) => {

    Server.init(0, (err, server) => {

        expect(err).to.not.exist();
        expect(server).to.be.instanceof(Hapi.Server);

        server.stop(done);
    });
});

it('starts server on provided port', (done) => {

    Server.init(5000, (err, server) => {

        expect(err).to.not.exist();
        expect(server.info.port).to.be.equal(5000);

        server.stop(done);
    });
});

it('handles register plugin errors', { parallel: false }, (done) => {

    const orig = Exercise.register;

    Exercise.register = function (server, options, next) {

        Exercise.register = orig;
        return next(new Error('register exercise failed'));
    };

    Exercise.register.attributes = {
        name: 'fake exercise'
    };

    Server.init(0, (err, server) => {

        expect(err).to.exist();
        expect(err.message).to.equal('register exercise failed');

        done();
    });
});
