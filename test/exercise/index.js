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


describe('/exercise', () => {

    it('returns an empty list at first', (done) => {

        Server.init(true, 0, (err, server) => {

            expect(err).to.not.exist();

            server.inject('/exercise', (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal([]);

                server.stop(done);
            });
        });
    });

    it('returns a bad request error if sent an invalid exercise', (done) => {

        Server.init(true, 0, (err, server) => {

            expect(err).to.not.exist();

            const request = { method: 'POST', url: '/exercise', payload: { garbage: 'some garbage' } };
            server.inject(request, (res) => {

                expect(res.statusCode).to.equal(400);

                server.stop(done);
            });
        });
    });

    it('allows you to post and get a valid exercise', (done) => {

        Server.init(true, 0, (err, server) => {

            expect(err).to.not.exist();

            const exercise = { name: 'kettlebell swings' };
            const request = { method: 'POST', url: '/exercise', payload: exercise };
            server.inject(request, (postRes) => {

                expect(postRes.statusCode).to.equal(200);

                server.inject('/exercise', (getRes) => {

                    expect(getRes.statusCode).to.equal(200);
                    expect(getRes.result).to.deep.equal([exercise]);

                    server.stop(done);
                });
            });
        });
    });
});
