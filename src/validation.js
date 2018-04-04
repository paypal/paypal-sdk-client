/* @flow */

import { ENV } from './constants';
import { values, isObject } from './util';
import type { ClientOptionsType } from './types';

/**
 * Validate options passed to the public client
 */
export function validateClientOptions({ env, auth } : ClientOptionsType) {

    if (env && values(ENV).indexOf(env) === -1) {
        throw new Error(`Invalid env: ${ env }`);
    }

    if (auth && !isObject(auth)) {
        throw new Error(`Expected auth to be passed`);
    }

    if (auth && env && !auth[env]) {
        throw new Error(`Expected auth to be passed for env: ${ env }`);
    }
}
