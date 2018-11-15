/* @flow */

import { getBrowserLocales } from 'belter/src';
import { type LocaleType, COUNTRY, LANG, ENV, COUNTRY_LANGS } from 'paypal-sdk-constants/src';

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

export function getEnv() : $Values<typeof ENV> {
    return __ENV__;
}

export function getCountry() : $Values<typeof COUNTRY> {
    return __LOCALE_COUNTRY__;
}

export function getLang() : $Values<typeof LANG> {
    if (typeof __LOCALE_LANG__ !== 'undefined') {
        return __LOCALE_LANG__;
    }
    
    for (const { country, lang } of getBrowserLocales()) {
        if (country && country === __LOCALE_COUNTRY__ && COUNTRY_LANGS[__LOCALE_COUNTRY__].indexOf(lang) !== -1) {
            // $FlowFixMe
            return lang;
        }
    }

    return __DEFAULT_LANG__;
}

export function getLocale() : LocaleType {
    return {
        lang:    getLang(),
        country: getCountry()
    };
}

export function getDefaultStageHost() : string {
    return __STAGE_HOST__;
}

export function getVersion() : string {
    return __VERSION__;
}

export function getCorrelationID() : string {
    return __CORRELATION_ID__;
}

export function getNamespace() : string {
    return __NAMESPACE__;
}

