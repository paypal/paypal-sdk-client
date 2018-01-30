/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src/promise';

import { getGlobal } from './global';

export function extend<T : Object | Function > (obj : T, source : Object) : T {
    if (!source) {
        return obj;
    }

    if (Object.assign) {
        return Object.assign(obj, source);
    }

    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            obj[key] = source[key];
        }
    }

    return obj;
}

export function values<T : mixed>(obj : { [string] : T }) : Array<T> {
    if (Object.values) {
        // $FlowFixMe
        return Object.values(obj);
    }

    let result = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(obj[key]);
        }
    }

    return result;
}

export function isObject(item : mixed) : boolean {
    return (typeof item === 'object' && item !== null);
}

export function debounce<T, A>(name : string, method : (...args: Array<A>) => ZalgoPromise<T>, time : number = 100) : (...args: Array<A>) => ZalgoPromise<T> {
    let debouncers = getGlobal('debouncers');

    return function debouncedFunction() : ZalgoPromise<T> {
        let key = `${ name }_${ JSON.stringify(Array.prototype.slice.call(arguments)) }`;

        let { promise, timeout } = debouncers[key] || { promise: new ZalgoPromise(), timeout: 0 };
        
        clearTimeout(timeout);
        debouncers[key].timeout = setTimeout(() => {
            promise.resolve(method.apply(this, arguments));
        }, time);

        return promise;
    };
}
