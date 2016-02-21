'use strict';

exports.GOOD_OPTIONS_TEST = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }, {
        reporter: require('good-file'),
        events: { ops: '*' },
        config: './log/test_log'
    }]
};

exports.GOOD_OPTIONS = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }, {
        reporter: require('good-file'),
        events: { ops: '*' },
        config: './log/ops_log'
    }]
};

exports.goodOptions = function (test) {

    return test ? this.GOOD_OPTIONS_TEST : this.GOOD_OPTIONS;
};

exports.syncOptions = function (test) {

    return test ? { force: true } : {};
};
