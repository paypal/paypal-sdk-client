/* @flow */

import { getStorage, type Storage } from 'belter/src';

import { getNamespace } from './script';

function getSDKStorage() : Storage {
    return getStorage({
        name: getNamespace()
    });
}

export function getSessionID() : string {
    return getSDKStorage().getSessionID();
}

export function getStorageState<T>(handler : (storage : Object) => T) : T {
    return getSDKStorage().getState(handler);
}

export function getStorageID() : string {
    return getSDKStorage().getID();
}

export function getSessionState<T>(handler : (state : Object) => T) : T {
    return getSDKStorage().getSessionState(handler);
}
