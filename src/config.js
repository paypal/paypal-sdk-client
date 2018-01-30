/* @flow */

import { getGlobal } from './global';

export function get<T>(key : string, def : ?T) : ?T {
    let config = getGlobal('config');
    return config.hasOwnProperty(key) ? config[key] : def;
}

export function set<T>(key : string, value : T) : T {
    let config = getGlobal('config');
    config[key] = value;
    return value;
}

export function get_or_set<T>(key : string, value : T) : ?T {
    let config = getGlobal('config');
    if (config.hasOwnProperty(key)) {
        return config[key];
    } else {
        config[key] = value;
        return value;
    }
}
