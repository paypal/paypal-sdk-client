/* @flow */

import { extend, getScript } from 'belter/src';

import { GLOBAL_NAMESPACE, DEFAULT_ENV } from './constants';
import type { ClientOptionsType, ExportsType } from './types';

type AttachOptions = {
    clientOptions : ClientOptionsType
};

let exportBuilders : { [string] : (?AttachOptions) => ExportsType } = {};

type SDKScriptSettings = {
    clientToken : ?string
};

const currentScript = document.currentScript;  // eslint-disable-line compat/compat

function getSDKScriptSettings() : SDKScriptSettings {
    let script = getScript({ host: __HOST__, path: __PATH__ });

    if (!script) {
        throw new Error(`PayPal Payments SDK script not loaded on page!`);
    }

    if (currentScript && script !== currentScript) {
        throw new Error(`PayPal Payments SDK is not the current script!`);
    }

    return {
        clientToken: script.getAttribute('data-client-token')
    };
}

/**
 * Instantiate the public client
 */
export function client(clientOptions? : ClientOptionsType = { env: DEFAULT_ENV }) : Object {

    let scriptSettings = getSDKScriptSettings();

    clientOptions = JSON.parse(JSON.stringify(clientOptions));
    clientOptions.env = __ENV__;
    clientOptions.auth = clientOptions.auth || {
        [ __ENV__ ]: scriptSettings.clientToken
    };

    window[GLOBAL_NAMESPACE] = window[GLOBAL_NAMESPACE] || {};
    Object.keys(exportBuilders).forEach(moduleName => {
        extend(window[GLOBAL_NAMESPACE], exportBuilders[moduleName]({ clientOptions }));
    });

    return window[GLOBAL_NAMESPACE];
}


/**
 * Attach an interface builder function
 */
export function attach(moduleName : string, exportBuilder : (?AttachOptions) => ExportsType, auto : boolean = false) {
    if (exportBuilders[moduleName]) {
        throw new Error(`Already attached ${ moduleName }`);
    }

    window[GLOBAL_NAMESPACE] = window[GLOBAL_NAMESPACE] || {};
    window[GLOBAL_NAMESPACE].client = client;

    if (auto) {
        extend(window[GLOBAL_NAMESPACE], exportBuilders[moduleName]());
    } else {
        exportBuilders[moduleName] = exportBuilder;
    }
}
