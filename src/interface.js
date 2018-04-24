/* @flow */

import { extend } from './util';
import { getGlobal } from './global';
import { validateClientOptions } from './validation';
import { GLOBAL_NAMESPACE, DEFAULT_ENV } from './constants';
import type { ClientOptionsType, ExportsType } from './types';

type AttachOptions = {
    clientOptions : ClientOptionsType
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
export function client(clientOptions? : ClientOptionsType = { env: DEFAULT_ENV }) : Object {
    clientOptions = JSON.parse(JSON.stringify(clientOptions));

    if (typeof __sdk__ !== 'undefined') {
        clientOptions.env = __sdk__.queryOptions.env;
    }
    
    validateClientOptions(clientOptions);

    let xports = {};

    Object.keys(exportBuilders).forEach(moduleName => {
        extend(xports, exportBuilders[moduleName]({ clientOptions }));
    });

    return xports;
}

window[GLOBAL_NAMESPACE] = window[GLOBAL_NAMESPACE] || {};
window[GLOBAL_NAMESPACE].client = window.client || client;
