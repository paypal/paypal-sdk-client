/* @flow */

import { extend } from './util';
import { getGlobal } from './global';
import { validateClientOptions } from './validation';
import { clientConfig, serverConfig, queryOptions } from './clientConfig';

type AttachOptions = {
    clientOptions : ClientOptionsType,
    clientConfig : ClientConfigType,
    serverConfig : ServerConfigType,
    queryOptions : QueryOptionsType
};

let exportBuilders: Array<(AttachOptions) => ExportsType> = getGlobal('exportBuilders', []);

export function attach(exportBuilder : (AttachOptions) => ExportsType) {
    exportBuilders.push(exportBuilder);
}

export function client(clientOptions? : ClientOptionsType = {}) : Object {

    validateClientOptions(clientOptions);

    let xports = {};

    for (let i = 0; i < exportBuilders.length; i++) {
        extend(xports, exportBuilders[i]({ clientOptions, clientConfig, serverConfig, queryOptions }));
    }

    return xports;
}

window.paypal = window.paypal || {};
window.paypal.client = window.paypal.client || client;
