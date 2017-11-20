/* @flow */

import { CONFIG_KEY, STORE } from './constants';
import { isSessionStorageEnabled } from './util';

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

    [ STORE.SESSIONSTORAGE ]: {
        get<T>(key : string) : T {
            let storage = window.sessionStorage.getItem(CONFIG_KEY);
            storage = storage ? JSON.parse(storage) : {};
            return storage[key];
        },
        set<T>(key : string, value : T) : T {
            let storage = window.sessionStorage.getItem(CONFIG_KEY);
            storage = storage ? JSON.parse(storage) : {};
            storage[key] = value;
            window.sessionStorage.setItem(CONFIG_KEY, JSON.stringify(storage));
            return value;
        },
        has(key : string) : boolean {
            let storage = window.sessionStorage.getItem(CONFIG_KEY);
            storage = storage ? JSON.parse(storage) : {};
            return storage.hasOwnProperty(key);
        }
    }
};

export let store = isSessionStorageEnabled()
    ? stores[STORE.SESSIONSTORAGE]
    : stores[STORE.GLOBAL];

export function use(storeType : string) {
    store = stores[storeType];
}
