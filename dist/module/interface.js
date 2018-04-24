import { extend } from './util';
import { getGlobal } from './global';
import { validateClientOptions } from './validation';
import { GLOBAL_NAMESPACE, DEFAULT_ENV } from './constants';


var exportBuilders = getGlobal('exportBuilders', {});

/**
 * Attach an interface builder function
 */
export function attach(moduleName, exportBuilder) {
    if (exportBuilders[moduleName]) {
        throw new Error('Already attached ' + moduleName);
    }
    exportBuilders[moduleName] = exportBuilder;
}

/**
 * Instantiate the public client
 */
export function client() {
    var clientOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    clientOptions = JSON.parse(JSON.stringify(clientOptions));
    clientOptions.env = __sdk__.queryOptions.env || clientOptions.env || DEFAULT_ENV;

    validateClientOptions(clientOptions);

    var xports = {};

    Object.keys(exportBuilders).forEach(function (moduleName) {
        extend(xports, exportBuilders[moduleName]({ clientOptions: clientOptions }));
    });

    return xports;
}

window[GLOBAL_NAMESPACE] = window[GLOBAL_NAMESPACE] || {};
window[GLOBAL_NAMESPACE].client = window.client || client;