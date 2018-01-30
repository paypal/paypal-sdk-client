/* @flow */

import { extend } from './util';
import { getGlobal } from './global';
import { validateConfig } from './validation';

let exportBuilders = getGlobal('exportBuilders', []);

export function attach(exportBuilder : (ConfigType) => ExportsType) {
    exportBuilders.push(exportBuilder);
}

export function client(config : ConfigType) : Object {

    validateConfig(config);

    let xports = {};

    for (let i = 0; i < exportBuilders.length; i++) {
        extend(xports, exportBuilders[i](config));
    }

    return xports;
}

window.paypal = window.paypal || {};
window.paypal.client = window.paypal.client || client;
