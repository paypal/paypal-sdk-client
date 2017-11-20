var _stores;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { CONFIG_KEY, STORE } from './constants';
import { isSessionStorageEnabled } from './util';

var stores = (_stores = {}, _defineProperty(_stores, STORE.GLOBAL, {
    get: function get(key) {
        var storage = window[CONFIG_KEY] || {};
        return storage[key];
    },
    set: function set(key, value) {
        var storage = window[CONFIG_KEY] || {};
        storage[key] = value;
        window[CONFIG_KEY] = storage;
        return value;
    },
    has: function has(key) {
        var storage = window[CONFIG_KEY] || {};
        return storage.hasOwnProperty(key);
    }
}), _defineProperty(_stores, STORE.SESSIONSTORAGE, {
    get: function get(key) {
        var storage = window.sessionStorage.getItem(CONFIG_KEY);
        storage = storage ? JSON.parse(storage) : {};
        return storage[key];
    },
    set: function set(key, value) {
        var storage = window.sessionStorage.getItem(CONFIG_KEY);
        storage = storage ? JSON.parse(storage) : {};
        storage[key] = value;
        window.sessionStorage.setItem(CONFIG_KEY, JSON.stringify(storage));
        return value;
    },
    has: function has(key) {
        var storage = window.sessionStorage.getItem(CONFIG_KEY);
        storage = storage ? JSON.parse(storage) : {};
        return storage.hasOwnProperty(key);
    }
}), _stores);

export var store = isSessionStorageEnabled() ? stores[STORE.SESSIONSTORAGE] : stores[STORE.GLOBAL];

export function use(storeType) {
    store = stores[storeType];
}