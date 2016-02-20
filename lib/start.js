'use strict';

// Load modules

const Hoek = require('hoek');
const Server = require('./index');

Server.init(false, 3000, (err, server) => {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});
