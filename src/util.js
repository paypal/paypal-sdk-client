/* @flow */

/**
 * Extend an object with another object
 */
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

/**
 * Extract the values from an object
 */
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

/**
 * Return true if the passed value is an object
 */
export function isObject(item : mixed) : boolean {
    return (typeof item === 'object' && item !== null);
}
