/* @flow */

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
