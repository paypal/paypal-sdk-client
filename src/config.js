/* @flow */

import { getGlobal } from './global';

function get<T>(key : string, def : ?T) : ?T {
    let config = getGlobal('config');
    return config.hasOwnProperty(key) ? config[key] : def;
}

function set<T>(key : string, value : T) : T {
    let config = getGlobal('config');
    config[key] = value;
    return value;
}

function getOrSet<T>(key : string, value : T) : ?T {
    let config = getGlobal('config');
    if (config.hasOwnProperty(key)) {
        return config[key];
    } else {
        config[key] = value;
        return value;
    }
}

export let clientConfig = { get, set, getOrSet };

export let serverConfig = __PAYPAL_BRAINTREE_SERVER_CONFIG__;

export let queryOptions = __PAYPAL_BRAINTREE_QUERY_OPTIONS__;
