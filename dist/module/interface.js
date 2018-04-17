import { extend } from './util';
import { getGlobal } from './global';
import { validateClientOptions } from './validation';
import { serverConfig, queryOptions } from './serverData';


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


    validateClientOptions(clientOptions);

    var xports = {};

    Object.keys(exportBuilders).forEach(function (moduleName) {
        extend(xports, exportBuilders[moduleName]({
            clientOptions: clientOptions,
            queryOptions: queryOptions,
            serverConfig: serverConfig && serverConfig[moduleName]
        }));
    });

    return xports;
}

window.paypal = window.paypal || {};
window.paypal.client = window.paypal.client || client;