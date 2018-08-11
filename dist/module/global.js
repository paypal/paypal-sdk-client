'use strict';

exports.__esModule = true;
exports.getGlobal = getGlobal;

var _src = require('belter/src');

var _constants = require('./constants');

/**
 * Get a shared global object namespaced for the client
 */
function getGlobal(key, def) {
    var glob = (0, _src.getGlobal)();

    glob[_constants.GLOBAL_KEY] = glob[_constants.GLOBAL_KEY] || {};
    if (glob[_constants.GLOBAL_KEY].hasOwnProperty(key)) {
        return glob[_constants.GLOBAL_KEY][key];
    }
    // $FlowFixMe
    def = def || {};
    glob[_constants.GLOBAL_KEY][key] = def;
    // $FlowFixMe
    return def;
}