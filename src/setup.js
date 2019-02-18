/* @flow */

import { getNamespace, getVersion } from './globals';

export type SetupComponent<T> = {|
    name : string,
    requirer : () => T,
    setupHandler? : string
|};

export function setupSDK(components : $ReadOnlyArray<SetupComponent<mixed>>) {
    const namespace = getNamespace();
    const version = getVersion();

    const INTERNAL_DESTROY_KEY = `__destroy_${ version }_internal__`;

    if (window[namespace]) {
        if (!window[namespace][INTERNAL_DESTROY_KEY]) {
            throw new Error(`Error loading ${ namespace } version ${ version } - version ${ window[namespace].version || '(unknown)' } already loaded on page`);
        }

        window[namespace][INTERNAL_DESTROY_KEY]();
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
        value:      () => {
            destroyers.forEach(destroy => destroy());
            delete window[namespace];
        }
    });
}
