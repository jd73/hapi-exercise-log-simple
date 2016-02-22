'use strict';

// Load modules

const Hoek = require('hoek');
const Server = require('./index');

const internals = {
    test: true
};

Server.init(internals.test, 3000, (err, server) => {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
    console.log('Test: ' + internals.test);
});
