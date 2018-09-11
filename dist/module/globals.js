import { COUNTRY, LANG } from './constants';

export function getHost() {
    return __HOST__;
}

export function getHostName() {
    return __HOSTNAME__;
}

export function getPort() {
    return __PORT__;
}

export function getPath() {
    return __PATH__;
}

export function getEnv() {
    return __ENV__;
}

export function getClientID() {
    return __CLIENT_ID__;
}

export function getMerchantID() {
    return __MERCHANT_ID__;
}

export function getCountry() {
    return __LOCALE__.__LANG__;
}

export function getLang() {
    return __LOCALE__.__LANG__;
}

export function getLocale() {
    return {
        lang: getLang(),
        country: getCountry()
    };
}

export function getStageHost() {
    return __STAGE_HOST__;
}

export function getIntent() {
    return __INTENT__;
}

export function getCommit() {
    return __COMMIT__;
}

export function getVault() {
    return __VAULT__;
}