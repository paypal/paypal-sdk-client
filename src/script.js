/* @flow */

import { getScript, inlineMemoize, parseQuery, getBrowserLocales } from 'belter/src';
import { COUNTRY, SDK_SETTINGS, SDK_QUERY_KEYS, INTENT, COMMIT, VAULT, CURRENCY, COUNTRY_LANGS,
    DEFAULT_INTENT, DEFAULT_CURRENCY, DEFAULT_VAULT, QUERY_BOOL, LANG, type LocaleType, DEFAULT_SALE_COMMIT, DEFAULT_NONSALE_COMMIT } from '@paypal/sdk-constants/src';

import { getHost, getPath, getDefaultStageHost, getDefaultAPIStageHost } from './globals';

export const CLIENT_ID_ALIAS = {
    sb: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
};

export function getSDKScript() : HTMLScriptElement {
    return inlineMemoize(getSDKScript, () => {
        const { host, path } = { host: getHost(), path: getPath() };
        const script = getScript({ host, path });

        if (!script) {
            throw new Error(`PayPal Payments SDK script not present on page! Excected to find <script src="https://${ host }${ path }">`);
        }

        return script;
    });
}

export function getSDKAttributes() : { [string] : string } {
    return inlineMemoize(getSDKAttributes, () => {
        const sdkScript = getSDKScript();
        const result = {};
        for (const attr of sdkScript.attributes) {
            if (attr.name.indexOf('data-') === 0) {
                result[attr.name] = attr.value;
            }
        }
        return result;
    });
}

export function getSDKAttribute<T : string | void>(name : $Values<typeof SDK_SETTINGS>, def : T) : T {
    // $FlowFixMe
    return getSDKAttributes()[name] || def;
}

export function getSDKQueryParams() : { [string] : string } {
    const script = getSDKScript();
    return parseQuery(script.src.split('?')[1] || '');
}

export function getSDKQueryParam<T : string | void>(name : $Values<typeof SDK_QUERY_KEYS>, def : T) : T {
    // $FlowFixMe
    return getSDKQueryParams()[name] || def;
}

export function getScriptUrl() : string {
    const src = getSDKScript().getAttribute('src');
    if (!src) {
        throw new Error(`Can not find src for sdk script`);
    }
    return src;
}

export function getSDKQueryParamBool<T : boolean>(name : $Values<typeof SDK_QUERY_KEYS>, def? : T) : T {
    // $FlowFixMe
    return getSDKQueryParam(name, def ? def.toString() : QUERY_BOOL.FALSE) === QUERY_BOOL.TRUE;
}

export function getClientID() : string {
    const clientID = getSDKQueryParam(SDK_QUERY_KEYS.CLIENT_ID);

    if (!clientID) {
        throw new Error(`Expected ${ SDK_QUERY_KEYS.CLIENT_ID } parameter in sdk url`);
    }

    if (CLIENT_ID_ALIAS[clientID]) {
        return CLIENT_ID_ALIAS[clientID];
    }

    return clientID;
}

export function getMerchantID() : ?string {
    return getSDKQueryParam(SDK_QUERY_KEYS.MERCHANT_ID);
}

export function getIntent() : $Values<typeof INTENT> {
    return getSDKQueryParam(SDK_QUERY_KEYS.INTENT, DEFAULT_INTENT);
}

export function getCommit() : $Values<typeof COMMIT> {
    return getSDKQueryParamBool(SDK_QUERY_KEYS.COMMIT, getIntent() === INTENT.CAPTURE ? DEFAULT_SALE_COMMIT : DEFAULT_NONSALE_COMMIT);
}

export function getVault() : $Values<typeof VAULT> {
    return getSDKQueryParamBool(SDK_QUERY_KEYS.VAULT, DEFAULT_VAULT);
}

export function getCurrency() : $Values<typeof CURRENCY> {
    return getSDKQueryParam(SDK_QUERY_KEYS.CURRENCY, DEFAULT_CURRENCY);
}

export function getBuyerCountry() : ?$Values<typeof COUNTRY> {
    return getSDKQueryParam(SDK_QUERY_KEYS.BUYER_COUNTRY);
}

export function getClientToken() : string {
    const clientToken = getSDKAttribute(SDK_SETTINGS.CLIENT_TOKEN);

    if (!clientToken) {
        throw new Error(`Expected data-client-token to be passed with client token, to ${ getSDKScript().outerHTML }`);
    }

    return clientToken;
}

export function getPartnerAttributionID() : ?string {
    return getSDKAttribute(SDK_SETTINGS.PARTNER_ATTRIBUTION_ID);
}

export function getStageHost() : string {
    return getSDKAttribute(SDK_SETTINGS.STAGE_HOST, getDefaultStageHost());
}

export function getAPIStageHost() : string {
    return getSDKAttribute(SDK_SETTINGS.API_STAGE_HOST, getDefaultAPIStageHost());
}

export function getLocale() : LocaleType {
    const locale = getSDKQueryParam(SDK_QUERY_KEYS.LOCALE);

    if (locale) {
        const [ lang, country ] = locale.split('_');
        return { lang, country };
    }
    
    for (const { country, lang } of getBrowserLocales()) {
        // $FlowFixMe
        if (COUNTRY_LANGS.hasOwnProperty(country) && COUNTRY_LANGS[country].indexOf(lang) !== -1) {
            // $FlowFixMe
            return { country, lang };
        }
    }

    for (const { country } of getBrowserLocales()) {
        // $FlowFixMe
        if (COUNTRY_LANGS.hasOwnProperty(country)) {
            // $FlowFixMe
            return { country, lang: COUNTRY_LANGS[country][0] };
        }
    }

    return {
        lang:    LANG.EN,
        country: COUNTRY.US
    };
}

export function getCSPNonce() : ?string {
    return getSDKAttribute(SDK_SETTINGS.CSP_NONCE);
}

// Remove
export function getCountry() : $Values<typeof COUNTRY> {
    return getLocale().country;
}

// Remove
export function getLang() : $Values<typeof LANG> {
    return getLocale().lang;
}
