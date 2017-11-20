/* @flow */

import { store } from './store';

let listeners = {};

export function get<T>(key : string, def : ?T) : ?T {
    return store.has(key) ? store.get(key) : def;
}

export function set<T>(key : string, value : T) : T {
    store.set(key, value);

    if (listeners[key]) {
        for (let listener of listeners[key]) {
            listener(value);
        }
    }

    return value;
}

export function get_or_set<T>(key : string, value : T) : ?T {
    return store.has(key) ? get(key) : set(key, value);
}

export function on<T>(key : string, handler : (T) => void) : { cancel : () => void } {
    listeners[key] = listeners[key] || [];
    listeners[key].push(handler);
    return {
        cancel() {
            listeners[key].splice(listeners[key].indexOf(handler), 1);
        }
    };
}
