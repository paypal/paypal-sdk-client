/* @flow */

import { getScript, getCurrentScriptUID, ATTRIBUTES, parseQuery, getBrowserLocales, base64decode, values, getCurrentScript, memoize } from 'belter/src';
import { COUNTRY, SDK_SETTINGS, SDK_QUERY_KEYS, INTENT, COMMIT, VAULT, CURRENCY,
    FUNDING, CARD, COUNTRY_LANGS, DEFAULT_INTENT, DEFAULT_CURRENCY, DEFAULT_VAULT,
    QUERY_BOOL, LANG, type LocaleType, DEFAULT_SALE_COMMIT, DEFAULT_NONSALE_COMMIT,
    ENV, PAGE_TYPES } from '@paypal/sdk-constants/src';

import { getHost, getPath, getEnv, getDefaultNamespace, getSDKHost } from './globals';
import { CLIENT_ID_ALIAS } from './config';
import { getLogger } from './logger';

export const getSDKScript = memoize(() : HTMLScriptElement => {
    let currentScript;

    try {
        currentScript = getCurrentScript();
    } catch (err) {
        // pass
    }

    // Add new __SDK_HOST__ global instead of determining this on the client side
    const host = (getEnv() === ENV.SANDBOX) ? 'www.paypal.com' : getHost();

    const path = getPath();
    const inferredScript = getScript({ host, path, reverse: true });

    let script;

    if (currentScript) {
        if (currentScript === inferredScript) {
            script = currentScript;
        } else {
            script = inferredScript;
        }
    } else {
        script = inferredScript;
    }

    if (!script) {
        throw new Error(`PayPal Payments SDK script not present on page! Expected to find <script src="https://${ host }${ path }">`);
    }

    return script;
});

export function checkSDKScript() {
    let currentScript;

    try {
        currentScript = getCurrentScript();
    } catch (err) {
        // pass
    }

    const inferredScript = getSDKScript();
    
    if (currentScript) {
        if (currentScript === inferredScript) {
            getLogger().info('current_script_inferred_script_match').flush();
        } else {
            getLogger().info('current_script_inferred_script_no_match').flush();
        }
    } else {
        getLogger().info('no_current_script_found').flush();
    }
    
    const host = (getEnv() === ENV.SANDBOX) ? 'www.paypal.com' : getHost();
    const sdkHost = getSDKHost();

    if (host === sdkHost) {
        getLogger().info('host_sdk_host_match').flush();
    } else {
        getLogger().info('host_sdk_host_no_match').flush();
    }
}

export const getSDKAttributes = memoize(() : { [string] : string } => {
    const sdkScript = getSDKScript();
    const result = {};
    for (const attr of sdkScript.attributes) {
        if (attr.name.indexOf('data-') === 0) {
            result[attr.name] = attr.value;
        }
    }
    result[ATTRIBUTES.UID] = getCurrentScriptUID();
    return result;
});

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

export function getMerchantID() : $ReadOnlyArray<string> {
    let merchantID = getSDKQueryParam(SDK_QUERY_KEYS.MERCHANT_ID);

    if (merchantID === '*') {
        // get multiple merchant ids or emails from data-merchant-id
        merchantID = getSDKAttribute(SDK_SETTINGS.MERCHANT_ID);

        if (!merchantID) {
            throw new Error(`Must pass ${ SDK_SETTINGS.MERCHANT_ID } when ${ SDK_QUERY_KEYS.MERCHANT_ID }=* passed in url`);
        }
        
        merchantID = merchantID.split(',');

        if (merchantID.length <= 1) {
            throw new Error(`Must pass multiple merchant ids to ${ SDK_SETTINGS.MERCHANT_ID }. If passing a single id, pass ${ SDK_QUERY_KEYS.MERCHANT_ID }=XYZ in url`);
        }

        // check duplicates
        const hasDuplicate = merchantID.some((val, i) => merchantID && merchantID.indexOf(val) !== i);

        if (hasDuplicate) {
            throw new Error(`Duplicates ${ SDK_SETTINGS.MERCHANT_ID }. Must pass unique merchant ids to ${ SDK_SETTINGS.MERCHANT_ID }.`);
        }
        return merchantID;
    }
    
    if (merchantID) {
        return merchantID.split(',');
    }

    return [];
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

export function getEnableFunding() : $ReadOnlyArray<?$Values<typeof FUNDING>> {
    const funding = getSDKQueryParam(SDK_QUERY_KEYS.ENABLE_FUNDING);
    if (funding) {
        return funding.split(',');
    }
    return [];
}

export function getDisableFunding() : $ReadOnlyArray<?$Values<typeof FUNDING>> {
    const funding = getSDKQueryParam(SDK_QUERY_KEYS.DISABLE_FUNDING);
    if (funding) {
        return funding.split(',');
    }
    return [];
}

export function getDisableCard() : $ReadOnlyArray<?$Values<typeof CARD>> {
    const funding = getSDKQueryParam(SDK_QUERY_KEYS.DISABLE_CARD);
    if (funding) {
        return funding.split(',');
    }
    return [];
}

export function getBuyerCountry() : ?$Values<typeof COUNTRY> {
    return getSDKQueryParam(SDK_QUERY_KEYS.BUYER_COUNTRY);
}

export function getNamespace() : string {
    return getSDKAttribute(SDK_SETTINGS.NAMESPACE) || getDefaultNamespace();
}

export function getClientToken() : ?string {
    return getSDKAttribute(SDK_SETTINGS.CLIENT_TOKEN);
}

export function getAmount() : ?string {
    const amount = getSDKAttribute(SDK_SETTINGS.AMOUNT);
    if (amount && !amount.match(/^\d+\.\d\d$/)) {
        throw new Error(`Invalid amount: ${ amount }`);
    }
    return amount;
}

export function getUserIDToken() : ?string {
    return getSDKAttribute(SDK_SETTINGS.USER_ID_TOKEN);
}

export function getClientAccessToken() : ?string {
    const clientToken = getClientToken();

    if (clientToken) {
        return JSON.parse(base64decode(clientToken)).paypal.accessToken;
    }
}

export function getPartnerAttributionID() : ?string {
    return getSDKAttribute(SDK_SETTINGS.PARTNER_ATTRIBUTION_ID);
}

export function getPageType() : ?string {
    const pageType = getSDKAttribute(SDK_SETTINGS.PAGE_TYPE, '');
    const validPageType = values(PAGE_TYPES).indexOf(pageType.toLowerCase()) !== -1;
    
    if (!validPageType && pageType.length) {
        throw new Error(`Invalid page type, '${ pageType }'`);
    }
    return pageType.toLowerCase();
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

export function getEnableThreeDomainSecure() : boolean {
    return getSDKAttributes().hasOwnProperty(SDK_SETTINGS.ENABLE_3DS);
}

export function getSDKIntegrationSource() : ?string {
    return getSDKAttribute(SDK_SETTINGS.SDK_INTEGRATION_SOURCE);
}

// whether in zoid window
export function isChildWindow() : boolean {
    return Boolean(window.xprops);
}

export function getUserAccessToken() : ?string {
    // pass
}

export function getUserAuthCode() : ?string {
    // pass
}

// Remove
export function getCountry() : $Values<typeof COUNTRY> {
    return getLocale().country;
}

// Remove
export function getLang() : $Values<typeof LANG> {
    return getLocale().lang;
}
