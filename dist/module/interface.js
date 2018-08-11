'use strict';

exports.__esModule = true;
exports.client = client;
exports.attach = attach;

var _util = require('./util');

var _global = require('./global');

var _validation = require('./validation');

var _constants = require('./constants');

var exportBuilders = (0, _global.getGlobal)('exportBuilders', {});

/**
 * Instantiate the public client
 */
function client() {
    var clientOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { env: _constants.DEFAULT_ENV };

    clientOptions = JSON.parse(JSON.stringify(clientOptions));

    if (typeof __sdk__ !== 'undefined') {
        clientOptions.env = __sdk__.queryOptions.env;
    }

    (0, _validation.validateClientOptions)(clientOptions);

    var xports = {};

    Object.keys(exportBuilders).forEach(function (moduleName) {
        (0, _util.extend)(xports, exportBuilders[moduleName]({ clientOptions: clientOptions }));
    });

    return xports;
}

/**
 * Attach an interface builder function
 */
function attach(moduleName, exportBuilder) {
    if (exportBuilders[moduleName]) {
        throw new Error('Already attached ' + moduleName);
    }

    window[_constants.GLOBAL_NAMESPACE] = window[_constants.GLOBAL_NAMESPACE] || {};
    window[_constants.GLOBAL_NAMESPACE].client = window.client || client;

    exportBuilders[moduleName] = exportBuilder;
}