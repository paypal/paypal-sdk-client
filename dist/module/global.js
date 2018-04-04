import { GLOBAL_KEY } from './constants';

/**
 * Get a shared global object namespaced for the client
 */
export function getGlobal(key, def) {
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