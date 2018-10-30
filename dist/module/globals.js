import { getBrowserLocales } from 'belter/src';
import { COUNTRY, LANG, ENV, COUNTRY_LANGS } from 'paypal-sdk-constants/src';

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

export function getCountry() {
    return __LOCALE_COUNTRY__;
}

export function getLang() {
    if (typeof __LOCALE_LANG__ !== 'undefined') {
        return __LOCALE_LANG__;
    }

    for (var _i2 = 0, _getBrowserLocales2 = getBrowserLocales(), _length2 = _getBrowserLocales2 == null ? 0 : _getBrowserLocales2.length; _i2 < _length2; _i2++) {
        var _ref2 = _getBrowserLocales2[_i2];
        var country = _ref2.country,
            lang = _ref2.lang;

        if (country && country === __LOCALE_COUNTRY__ && COUNTRY_LANGS[__LOCALE_COUNTRY__].indexOf(lang) !== -1) {
            // $FlowFixMe
            return lang;
        }
    }

    return __DEFAULT_LANG__;
}

export function getLocale() {
    return {
        lang: getLang(),
        country: getCountry()
    };
}

export function getDefaultStageHost() {
    return __STAGE_HOST__;
}

export function getVersion() {
    return __VERSION__;
}

export function getCorrelationID() {
    return __CORRELATION_ID__;
}