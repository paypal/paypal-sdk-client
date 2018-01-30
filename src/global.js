/* @flow */

import { GLOBAL_KEY } from './constants';

export function getGlobal<T : mixed>(key : string, def : ?T) : T {
    window[GLOBAL_KEY] = window[GLOBAL_KEY] || {};
    if (window[GLOBAL_KEY].hasOwnProperty(key)) {
        return window[GLOBAL_KEY][key];
    }
    // $FlowFixMe
    def = def || {};
    window[GLOBAL_KEY][key] = def;
    // $FlowFixMe
    return def;
}
