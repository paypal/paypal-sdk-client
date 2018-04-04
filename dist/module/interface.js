import { extend } from './util';
import { getGlobal } from './global';
import { validateClientOptions } from './validation';
import { clientConfig, serverConfig, queryOptions } from './clientConfig';


var exportBuilders = getGlobal('exportBuilders', []);

/**
 * Attach an interface builder function
 */
export function attach(exportBuilder) {
    exportBuilders.push(exportBuilder);
}

/**
 * Instantiate the public client
 */
export function client() {
    var clientOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    validateClientOptions(clientOptions);

    var xports = {};

    for (var i = 0; i < exportBuilders.length; i++) {
        extend(xports, exportBuilders[i]({ clientOptions: clientOptions, clientConfig: clientConfig, serverConfig: serverConfig, queryOptions: queryOptions }));
    }

    return xports;
}

window.paypal = window.paypal || {};
window.paypal.client = window.paypal.client || client;