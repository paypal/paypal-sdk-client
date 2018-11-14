/* @flow */

import { memoize, values } from 'belter';

export const memoizedValues = memoize(values);

export const constHas = <X : (string | boolean | number), T : {[string] : X }>(constant : T, value : X) : boolean => {
    return memoizedValues(constant).indexOf(value) !== -1;
};

export function entries<T>(obj : { [string] : T }) : $ReadOnlyArray<[ string, T ]> {
    const result = [];

    for (const key of Object.keys(obj)) {
        result.push([ key, obj[key] ]);
    }

    return result;
}
