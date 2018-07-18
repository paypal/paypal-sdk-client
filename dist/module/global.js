'use strict';

exports.__esModule = true;
exports.getGlobal = getGlobal;

var _constants = require('./constants');

/**
 * Get a shared global object namespaced for the client
 */
function getGlobal(key, def) {
    window[_constants.GLOBAL_KEY] = window[_constants.GLOBAL_KEY] || {};
    if (window[_constants.GLOBAL_KEY].hasOwnProperty(key)) {
        return window[_constants.GLOBAL_KEY][key];
    }
    // $FlowFixMe
    def = def || {};
    window[_constants.GLOBAL_KEY][key] = def;
    // $FlowFixMe
    return def;
}