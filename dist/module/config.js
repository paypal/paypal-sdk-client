import { store } from './store';

var listeners = {};

export function get(key, def) {
    return store.has(key) ? store.get(key) : def;
}

export function set(key, value) {
    store.set(key, value);

    if (listeners[key]) {
        for (var _iterator = listeners[key], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var listener = _ref;

            listener(value);
        }
    }

    return value;
}

export function get_or_set(key, value) {
    return store.has(key) ? get(key) : set(key, value);
}

export function on(key, handler) {
    listeners[key] = listeners[key] || [];
    listeners[key].push(handler);
    return {
        cancel: function cancel() {
            listeners[key].splice(listeners[key].indexOf(handler), 1);
        }
    };
}