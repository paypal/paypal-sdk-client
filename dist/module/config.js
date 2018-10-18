import { getActualDomain, isCurrentDomain } from 'cross-domain-utils/src';

import { getPort } from './globals';
import { getStageHost, getAPIStageHost } from './script';

export function getPayPalDomain() {
    return {
        local: 'http://localhost.paypal.com:' + getPort(),
        stage: 'https://' + getStageHost(),
        sandbox: 'https://www.sandbox.paypal.com',
        paypal: 'https://www.paypal.com',
        test: 'mock://www.paypal.com'
    }[__ENV__];
}

export function getPayPalAPIDomain() {
    return {
        local: 'https://' + getAPIStageHost() + ':12326',
        stage: 'https://' + getAPIStageHost() + ':12326',
        sandbox: 'https://cors.api.sandbox.paypal.com',
        paypal: 'https://www.cors.api.paypal.com',
        test: 'mock://api.paypal.com'
    }[__ENV__];
}

export function getPayPalLoggerDomain() {
    return {
        local: 'https://' + getStageHost(),
        stage: getPayPalDomain(),
        sandbox: getPayPalDomain(),
        paypal: getPayPalDomain(),
        test: getPayPalDomain()
    }[__ENV__];
}

export function buildPayPalUrl() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return __TEST__ && __WEB__ ? '' + getActualDomain() + path : '' + getPayPalDomain() + path;
}

export function buildPayPalAPIUrl() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var paypalAPIDomain = isCurrentDomain(getPayPalDomain()) ? getPayPalDomain() : getPayPalAPIDomain();

    return __TEST__ && __WEB__ ? '' + getActualDomain() + path : '' + paypalAPIDomain + path;
}

var URI = {
    LOGGER: '/xoplatform/logger/api/logger'
};

export function getPayPalLoggerUrl() {
    return buildPayPalUrl(URI.LOGGER);
}

export var CLIENT_ID_ALIAS = {
    sb: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
};