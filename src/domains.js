/* @flow */

import { getDomain, getActualDomain, isCurrentDomain } from 'cross-domain-utils/src';

import { getProtocol, getHost, getStageHost, getAPIStageHost } from './globals';
import { URI } from './config';

export function getPayPalDomain() : string {
    return {
        local:      `${ getProtocol() }://${ getHost() }`,
        stage:      `${ getProtocol() }://${ getStageHost() }`,
        sandbox:    `${ getProtocol() }://www.sandbox.paypal.com`,
        production: `${ getProtocol() }://www.paypal.com`,
        test:       `mock://www.paypal.com`
    }[__ENV__];
}

export function getPayPalAPIDomain() : string {
    return {
        local:      `${ getProtocol() }://${ getAPIStageHost() }`,
        stage:      `${ getProtocol() }://${ getAPIStageHost() }`,
        sandbox:    `${ getProtocol() }://cors.api.sandbox.paypal.com`,
        production: `${ getProtocol() }://cors.api.paypal.com`,
        test:       `mock://api.paypal.com`
    }[__ENV__];
}

export function getPayPalLoggerDomain() : string {
    return {
        local:      `${ getProtocol() }://${ getStageHost() }`,
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
    // eslint-disable-next-line security/detect-unsafe-regex
    return /\.paypal\.com(:\d+)?$/;
}

export function isPayPalDomain() : boolean {
    return Boolean(getDomain().match(getPayPalDomainRegex()));
}
