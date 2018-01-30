import { extend } from './util';
import { getGlobal } from './global';
import { validateConfig } from './validation';

var exportBuilders = getGlobal('exportBuilders', []);

export function attach(exportBuilder) {
    exportBuilders.push(exportBuilder);
}

export function client(config) {

    validateConfig(config);

    var xports = {};

    for (var i = 0; i < exportBuilders.length; i++) {
        extend(xports, exportBuilders[i](config));
    }

    return xports;
}

window.paypal = window.paypal || {};
window.paypal.client = window.paypal.client || client;