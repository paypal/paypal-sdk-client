import { getGlobal } from './global';

export function get(key, def) {
    var config = getGlobal('config');
    return config.hasOwnProperty(key) ? config[key] : def;
}

export function set(key, value) {
    var config = getGlobal('config');
    config[key] = value;
    return value;
}

export function get_or_set(key, value) {
    var config = getGlobal('config');
    if (config.hasOwnProperty(key)) {
        return config[key];
    } else {
        config[key] = value;
        return value;
    }
}