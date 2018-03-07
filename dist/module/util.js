var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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