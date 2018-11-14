/* @flow */

import { getScript, inlineMemoize, parseQuery } from 'belter/src';
import { SDK_SETTINGS, SDK_QUERY_KEYS, INTENT, COMMIT, VAULT, CURRENCY,
    DEFAULT_INTENT, DEFAULT_COMMIT, DEFAULT_CURRENCY, DEFAULT_VAULT, QUERY_BOOL } from 'paypal-sdk-constants/src';

import { getHost, getPath, getDefaultStageHost } from './globals';

export const CLIENT_ID_ALIAS = {
    sb: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
};

export function getSDKScript() : HTMLScriptElement {
    return inlineMemoize(getSDKScript, () => {
        let { host, path } = { host: getHost(), path: getPath() };
        let script = getScript({ host, path });

        if (!script) {
            throw new Error(`PayPal Payments SDK script not present on page! Excected to find <script src="https://${ host }${ path }">`);
        }

        return script;
    });
}

export function getSDKAttributes() : { [string] : string } {
    return inlineMemoize(getSDKAttributes, () => {
        let sdkScript = getSDKScript();
        let result = {};
        for (let attr of sdkScript.attributes) {
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
    let script = getSDKScript();
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
    let clientID = getSDKQueryParam(SDK_QUERY_KEYS.CLIENT_ID);

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
    return getSDKQueryParam(SDK_QUERY_KEYS.ORDER_INTENT, DEFAULT_INTENT);
}

export function getCommit() : $Values<typeof COMMIT> {
    return getSDKQueryParamBool(SDK_QUERY_KEYS.ORDER_COMMIT, DEFAULT_COMMIT);
}

export function getVault() : $Values<typeof VAULT> {
    return getSDKQueryParamBool(SDK_QUERY_KEYS.ORDER_VAULT, DEFAULT_VAULT);
}

export function getCurrency() : $Values<typeof CURRENCY> {
    return getSDKQueryParam(SDK_QUERY_KEYS.ORDER_CURRENCY, DEFAULT_CURRENCY);
}

export function getClientToken() : string {
    let clientToken = getSDKAttribute(SDK_SETTINGS.CLIENT_TOKEN);

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
    return getSDKAttribute(SDK_SETTINGS.API_STAGE_HOST, getStageHost());
}
