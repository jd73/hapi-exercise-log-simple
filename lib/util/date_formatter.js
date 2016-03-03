'use strict';
/*jshint esnext: true */

module.exports.formatDate = (date) => {

    return date instanceof Date ? date.toISOString() : date;
};
