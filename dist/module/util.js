var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { ZalgoPromise } from 'zalgo-promise/src/promise';

import { getGlobal } from './global';

export function extend(obj, source) {
    if (!source) {
        return obj;
    }

    if (Object.assign) {
        return Object.assign(obj, source);
    }

    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            obj[key] = source[key];
        }
    }

    return obj;
}

export function values(obj) {
    if (Object.values) {
        // $FlowFixMe
        return Object.values(obj);
    }

    var result = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(obj[key]);
        }
    }

    return result;
}

export function isObject(item) {
    return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null;
}

export function debounce(name, method) {
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

    var debouncers = getGlobal('debouncers');

    return function debouncedFunction() {
        var _this = this,
            _arguments = arguments;

        var key = name + '_' + JSON.stringify(Array.prototype.slice.call(arguments));

        var _ref = debouncers[key] || { promise: new ZalgoPromise(), timeout: 0 },
            promise = _ref.promise,
            timeout = _ref.timeout;

        clearTimeout(timeout);
        debouncers[key].timeout = setTimeout(function () {
            promise.resolve(method.apply(_this, _arguments));
        }, time);

        return promise;
    };
}