/* @flow */

import { extend } from './util';
import { getGlobal } from './global';
import { validateClientOptions } from './validation';
import { serverConfig, queryOptions } from './serverData';
import type { ClientOptionsType, ServerConfigType, QueryOptionsType, ExportsType } from './types';

type AttachOptions = {
    clientOptions : ClientOptionsType,
    serverConfig : ServerConfigType,
    queryOptions : QueryOptionsType
};

let exportBuilders: { [string] : (AttachOptions) => ExportsType } = getGlobal('exportBuilders', {});

/**
 * Attach an interface builder function
 */
export function attach(moduleName : string, exportBuilder : (AttachOptions) => ExportsType) {
    if (exportBuilders[moduleName]) {
        throw new Error(`Already attached ${ moduleName }`);
    }
    exportBuilders[moduleName] = exportBuilder;
}

/**
 * Instantiate the public client
 */
export function client(clientOptions? : ClientOptionsType = {}) : Object {

    validateClientOptions(clientOptions);

    let xports = {};

    Object.keys(exportBuilders).forEach(moduleName => {
        extend(xports, exportBuilders[moduleName]({
            clientOptions,
            queryOptions,
            serverConfig: serverConfig && serverConfig[moduleName]
        }));
    });

    return xports;
}

window.paypal = window.paypal || {};
window.paypal.client = window.paypal.client || client;
