/* @flow */

import { destroyElement } from 'belter/src';

import { getVersion } from './global';
import { getSDKScript, getNamespace } from './script';

export type SetupComponent<T> = {|
    name : string,
    requirer : () => T,
    setupHandler? : string
|};

export function setupSDK(components : $ReadOnlyArray<SetupComponent<mixed>>) {
    const namespace = getNamespace();
    const version = getVersion();

    const INTERNAL_DESTROY_KEY = `__internal_destroy__`;

    const existingNamespace = window[namespace];
    const existingVersion = existingNamespace && existingNamespace.version;

    if (existingNamespace) {
        if (existingNamespace[INTERNAL_DESTROY_KEY]) {
            existingNamespace[INTERNAL_DESTROY_KEY](new Error(`New SDK instance loaded, existing instance destroyed (${ namespace } / ${ version })`));
            delete window[namespace];
        } else if (version) {
            throw new Error(`Attempted to load sdk version ${ version } on page, but window.${ namespace } at version ${ existingVersion } already loaded.\n\nTo load this sdk alongside the existing version, please specify a different namespace in the script tag, e.g. <script src="https://www.paypal.com/sdk/js?client-id=CLIENT_ID" data-namespace="paypal_sdk"></script>, then use the paypal_sdk namespace in place of paypal in your code.`);
        } else {
            throw new Error(`Attempted to load sdk version ${ version } on page, but window.${ namespace } already present. Please ensure window.${ namespace } is not previously set before loading the sdk`);
        }
    }

    window[namespace] = window[namespace] || {};
    window[namespace].version = version;
    
    const destroyers = [];

    for (const { name, requirer, setupHandler } of components) {
        try {
            // $FlowFixMe
            const { [setupHandler]: setupComponent, setup, destroy, ...xports } = requirer();

            if (setupComponent) {
                setupComponent();
            } else if (setup) {
                setup();
            }

            if (destroy) {
                destroyers.push(destroy);
            }

            for (const key of Object.keys(xports)) {
                let xport = xports[key];
                if (xport && xport.__get__) {
                    xport = xport.__get__();
                }
                if (xport) {
                    window[namespace][key] = xport;
                }
            }
        } catch (err) {
            setTimeout(() => {
                throw new Error(`Bootstrap Error for ${ name }:\n\n${ err.message }\n\n${ err.stack }`);
            }, 1);
            continue;
        }
    }

    Object.defineProperty(window[namespace], INTERNAL_DESTROY_KEY, {
        enumerable: false,
        value:      (err? : mixed = new Error(`SDK instance destroyed (${ namespace } / ${ version })`)) => {
            destroyers.forEach(destroy => destroy(err));
            destroyElement(getSDKScript());
            delete window[namespace];
        }
    });
}
