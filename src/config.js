/* @flow */

import { isBrowser, getActualDomain } from 'cross-domain-utils/src';

import { getPort } from './globals';
import { getStageHost, getAPIStageHost } from './script';

export function buildConfigUrl(domain : string, uri? : string) : string {
    if (__TEST__ && isBrowser()) {
        domain = getActualDomain();
    }
    return `${ domain }${ uri || '' }`;
}

export function getPayPalDomain() : string {
    return {
        local:   `http://localhost.paypal.com:${ getPort() }`,
        stage:   `https://${ getStageHost() }`,
        sandbox: `https://www.sandbox.paypal.com`,
        paypal:  `https://www.paypal.com`,
        test:    `mock://www.paypal.com`
    }[__ENV__];
}

export function getPayPalAPIDomain() : string {
    return {
        local:   `https://${ getAPIStageHost() }:12326`,
        stage:   `https://${ getAPIStageHost() }:12326`,
        sandbox: `https://cors.api.sandbox.paypal.com`,
        paypal:  `https://www.cors.api.paypal.com`,
        test:    `mock://api.paypal.com`
    }[__ENV__];
}

export function getPayPalLoggerDomain() : string {
    return {
        local:   `https://${ getStageHost() }`,
        stage:   getPayPalDomain(),
        sandbox: getPayPalDomain(),
        paypal:  getPayPalDomain(),
        test:    getPayPalDomain()
    }[__ENV__];
}

export function getPayPalLoggerUrl() : string {
    return `${ getPayPalLoggerDomain() }/xoplatform/logger/api/logger`;
}
