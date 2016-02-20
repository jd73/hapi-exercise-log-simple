'use strict';

exports.syncOptions = function (test) {

    return test ? { force: true } : {};
};
