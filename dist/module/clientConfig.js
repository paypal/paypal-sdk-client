import { getGlobal } from './global';

/**
 * Get a shared config value or return a default
 */
function get(key, def) {
    var config = getGlobal('config');
    return config.hasOwnProperty(key) ? config[key] : def;
}

/**
 * Set a shared config value
 */
function set(key, value) {
    var config = getGlobal('config');
    config[key] = value;
    return value;
}

/**
 * Get a shared config value, or set a default value
 */
function getOrSet(key, value) {
    var config = getGlobal('config');
    if (config.hasOwnProperty(key)) {
        return config[key];
    } else {
        config[key] = value;
        return value;
    }
}

export var clientConfig = { get: get, set: set, getOrSet: getOrSet };

export var serverConfig = __PAYPAL_BRAINTREE_SERVER_CONFIG__;

export var queryOptions = __PAYPAL_BRAINTREE_QUERY_OPTIONS__;