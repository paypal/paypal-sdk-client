/* @flow */

import type { LocaleType } from './constants';

export function getHost() : string {
    return __HOST__;
}

export function getHostName() : string {
    return __HOSTNAME__;
}

export function getPort() : number {
    return __PORT__;
}

export function getPath() : string {
    return __PATH__;
}

export function getEnv() : string {
    return __ENV__;
}

export function getClientID() : string {
    return __CLIENT_ID__;
}

export function getMerchantID() : string {
    return __MERCHANT_ID__;
}

export function getLocale() : LocaleType {
    return {
        lang:    __LOCALE__.__LANG__,
        country: __LOCALE__.__COUNTRY__
    };
}

export function getStageHost() : string {
    return __STAGE_HOST__;
}

export function getIntent() : string {
    return __INTENT__;
}

export function getCommit() : boolean {
    return __COMMIT__;
}

export function getVault() : boolean {
    return __VAULT__;
}
