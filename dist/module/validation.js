'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateClientOptions = validateClientOptions;

var _constants = require('./constants');

var _util = require('./util');

/**
 * Validate options passed to the public client
 */
function validateClientOptions(_ref) {
    var env = _ref.env,
        auth = _ref.auth;


    if (env && (0, _util.values)(_constants.ENV).indexOf(env) === -1) {
        throw new Error('Invalid env: ' + env);
    }

    if (auth && !(0, _util.isObject)(auth)) {
        throw new Error('Expected auth to be passed');
    }

    if (auth && env && !auth[env]) {
        throw new Error('Expected auth to be passed for env: ' + env);
    }
}