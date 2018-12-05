/* @flow */

import { getDomain, getActualDomain, isCurrentDomain } from 'cross-domain-utils/src';

import { getPort } from './globals';
import { getStageHost, getAPIStageHost } from './script';

export const SUPPORTED_BROWSERS = {
    msie:           '11',
    firefox:        '30',
    chrome:         '27',
    safari:         '7',
    opera:          '16',
    msedge:         '12',
    samsungBrowser: '2.1',
    silk:           '59.3',
    ucbrowser:      '10.0.0.488',
    vivaldi:        '1.91'
};

export const URI = {
    LOGGER: `/xoplatform/logger/api/logger`,
    AUTH:   `/v1/oauth2/token`,
    ORDER:  `/v2/checkout/orders`
};

export function getPayPalDomain() : string {
    return {
        local:      `http://localhost.paypal.com:${ getPort() }`,
        stage:      `https://${ getStageHost() }`,
        sandbox:    `https://www.sandbox.paypal.com`,
        production: `https://www.paypal.com`,
        test:       `mock://www.paypal.com`
    }[__ENV__];
}

export function getPayPalAPIDomain() : string {
    return {
        local:      `https://${ getAPIStageHost() }:12326`,
        stage:      `https://${ getAPIStageHost() }:12326`,
        sandbox:    `https://api.sandbox.paypal.com`,
        production: `https://api.paypal.com`,
        test:       `mock://api.paypal.com`
    }[__ENV__];
}

export function getPayPalLoggerDomain() : string {
    return {
        local:      `https://${ getStageHost() }`,
        stage:      getPayPalDomain(),
        sandbox:    getPayPalDomain(),
        production: getPayPalDomain(),
        test:       getPayPalDomain()
    }[__ENV__];
}

export function buildPayPalUrl(path : string = '') : string {
    return (__TEST__ && __WEB__)
        ? `${ getActualDomain() }${ path }`
        : `${ getPayPalDomain() }${ path }`;
}

export function buildPayPalAPIUrl(path : string = '') : string {
    const paypalAPIDomain = isCurrentDomain(getPayPalDomain())
        ? getPayPalDomain()
        : getPayPalAPIDomain();

    return (__TEST__ && __WEB__)
        ? `${ getActualDomain() }${ path }`
        : `${ paypalAPIDomain }${ path }`;
}

export function getPayPalLoggerUrl() : string {
    return buildPayPalUrl(URI.LOGGER);
}

export function getAuthAPIUrl() : string {
    return buildPayPalAPIUrl(URI.AUTH);
}

export function getOrderAPIUrl() : string {
    return buildPayPalAPIUrl(URI.ORDER);
}

export function getPayPalDomainRegex() : RegExp {
    return /\.paypal\.com$/;
}

export function isPayPalDomain() : boolean {
    return Boolean(getDomain().match(getPayPalDomainRegex()));
}
