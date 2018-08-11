/* @flow */

import { getGlobal as getGlob } from 'belter/src';

import { GLOBAL_KEY } from './constants';

/**
 * Get a shared global object namespaced for the client
 */
export function getGlobal<T : mixed>(key : string, def : ?T) : T {
    let glob = getGlob();

    glob[GLOBAL_KEY] = glob[GLOBAL_KEY] || {};
    if (glob[GLOBAL_KEY].hasOwnProperty(key)) {
        return glob[GLOBAL_KEY][key];
    }
    // $FlowFixMe
    def = def || {};
    glob[GLOBAL_KEY][key] = def;
    // $FlowFixMe
    return def;
}
