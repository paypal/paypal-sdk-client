import { extend } from './util';
import { getGlobal } from './global';
import { validateClientOptions } from './validation';
import { clientConfig, serverConfig } from './config';

var exportBuilders = getGlobal('exportBuilders', []);

export function attach(exportBuilder) {
    exportBuilders.push(exportBuilder);
}

export function client(clientOptions) {

    validateClientOptions(clientOptions);

    var xports = {};

    for (var i = 0; i < exportBuilders.length; i++) {
        extend(xports, exportBuilders[i]({ clientOptions: clientOptions, clientConfig: clientConfig, serverConfig: serverConfig }));
    }

    return xports;
}

window.paypal = window.paypal || {};
window.paypal.client = window.paypal.client || client;