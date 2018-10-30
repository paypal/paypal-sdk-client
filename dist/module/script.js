import { getScript, inlineMemoize, parseQuery } from 'belter/src';
import { SDK_SETTINGS, SDK_QUERY_KEYS, INTENT, COMMIT, VAULT, CURRENCY, DEFAULT_INTENT, DEFAULT_COMMIT, DEFAULT_CURRENCY, DEFAULT_VAULT, QUERY_BOOL } from 'paypal-sdk-constants/src';

import { getHost, getPath, getDefaultStageHost } from './globals';

export var CLIENT_ID_ALIAS = {
    sb: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
};

export function getSDKScript() {
    return inlineMemoize(getSDKScript, function () {
        var _host$path = { host: getHost(), path: getPath() },
            host = _host$path.host,
            path = _host$path.path;

        var script = getScript({ host: host, path: path });

        if (!script) {
            throw new Error('PayPal Payments SDK script not present on page! Excected to find <script src="https://' + host + path + '">');
        }

        return script;
    });
}

export function getSDKAttributes() {
    return inlineMemoize(getSDKAttributes, function () {
        var sdkScript = getSDKScript();
        var result = {};

        for (var _i2 = 0, _sdkScript$attributes2 = sdkScript.attributes, _length2 = _sdkScript$attributes2 == null ? 0 : _sdkScript$attributes2.length; _i2 < _length2; _i2++) {
            var attr = _sdkScript$attributes2[_i2];
            result[attr.name] = attr.value;
        }

        return result;
    });
}

export function getSDKAttribute(name, def) {
    // $FlowFixMe
    return getSDKAttributes()[name] || def;
}

export function getSDKQueryParams() {
    var script = getSDKScript();
    return parseQuery(script.src.split('?')[1] || '');
}

export function getSDKQueryParam(name, def) {
    // $FlowFixMe
    return getSDKQueryParams()[name] || def;
}

export function getSDKQueryParamBool(name, def) {
    // $FlowFixMe
    return getSDKQueryParam(name, def ? def.toString() : QUERY_BOOL.FALSE) === QUERY_BOOL.TRUE;
}

export function getClientToken() {
    var _getSDKAttributes = getSDKAttributes(),
        clientToken = _getSDKAttributes.clientToken;

    if (!clientToken) {
        throw new Error('Expected data-client-token="xyz" to be passed with client token, to ' + getSDKScript().outerHTML);
    }

    return clientToken;
}

export function getClientID() {
    var clientID = getSDKQueryParam(SDK_QUERY_KEYS.CLIENT_ID);

    if (!clientID) {
        throw new Error('Expected ' + SDK_QUERY_KEYS.CLIENT_ID + ' parameter in SDK URL');
    }

    if (CLIENT_ID_ALIAS[clientID]) {
        return CLIENT_ID_ALIAS[clientID];
    }

    return clientID;
}

export function getMerchantID() {
    return getSDKQueryParam(SDK_QUERY_KEYS.MERCHANT_ID);
}

export function getPartnerAttributionID() {
    return getSDKAttribute(SDK_SETTINGS.PARTNER_ATTRIBUTION_ID);
}

export function getStageHost() {
    return getSDKAttribute(SDK_SETTINGS.STAGE_HOST, getDefaultStageHost());
}

export function getAPIStageHost() {
    return getSDKAttribute(SDK_SETTINGS.API_STAGE_HOST, getStageHost());
}

export function getIntent() {
    return getSDKQueryParam(SDK_QUERY_KEYS.ORDER_INTENT, DEFAULT_INTENT);
}

export function getCommit() {
    return getSDKQueryParamBool(SDK_QUERY_KEYS.ORDER_COMMIT, DEFAULT_COMMIT);
}

export function getVault() {
    return getSDKQueryParamBool(SDK_QUERY_KEYS.ORDER_VAULT, DEFAULT_VAULT);
}

export function getCurrency() {
    return getSDKQueryParam(SDK_QUERY_KEYS.ORDER_CURRENCY, DEFAULT_CURRENCY);
}