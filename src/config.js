/* @flow */

import { getActualDomain, isCurrentDomain } from 'cross-domain-utils/src';

import { getPort } from './globals';
import { getStageHost, getAPIStageHost } from './script';

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

const URI = {
    LOGGER: `/xoplatform/logger/api/logger`
};

export function getPayPalLoggerUrl() : string {
    return buildPayPalUrl(URI.LOGGER);
}
