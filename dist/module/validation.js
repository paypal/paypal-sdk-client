import { ENV } from './constants';
import { values, isObject } from './util';

export function validateClientOptions(_ref) {
    var env = _ref.env,
        auth = _ref.auth;


    if (!env || values(ENV).indexOf(env) === -1) {
        throw new Error('Invalid env: ' + env);
    }

    if (!isObject(auth)) {
        throw new Error('Expected auth to be passed');
    }

    if (!auth[env]) {
        throw new Error('Expected auth to be passed for current env');
    }
}