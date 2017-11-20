/* @flow */

import { CONFIG_KEY, STORE } from './constants';
import { isLocalStorageEnabled } from './util';

let stores = {

    [ STORE.GLOBAL ]: {
        get<T>(key : string) : T {
            let storage = window[CONFIG_KEY] || {};
            return storage[key];
        },
        set<T>(key : string, value : T) : T {
            let storage = window[CONFIG_KEY] || {};
            storage[key] = value;
            window[CONFIG_KEY] = storage;
            return value;
        },
        has(key : string) : boolean {
            let storage = window[CONFIG_KEY] || {};
            return storage.hasOwnProperty(key);
        }
    },

    [ STORE.LOCALSTORAGE ]: {
        get<T>(key : string) : T {
            let storage = localStorage.getItem(CONFIG_KEY);
            storage = storage ? JSON.parse(storage) : {};
            return storage[key];
        },
        set<T>(key : string, value : T) : T {
            let storage = localStorage.getItem(CONFIG_KEY);
            storage = storage ? JSON.parse(storage) : {};
            storage[key] = value;
            localStorage.setItem(CONFIG_KEY, JSON.stringify(storage));
            return value;
        },
        has(key : string) : boolean {
            let storage = localStorage.getItem(CONFIG_KEY);
            storage = storage ? JSON.parse(storage) : {};
            return storage.hasOwnProperty(key);
        }
    }
};

export let store = isLocalStorageEnabled()
    ? stores[STORE.LOCALSTORAGE]
    : stores[STORE.GLOBAL];

export function use(storeType : string) {
    store = stores[storeType];
}
