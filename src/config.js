/* @flow */

import { isBrowser, getActualDomain } from 'cross-domain-utils/src';

import { getStageHost, getPort } from './globals';

export function buildConfigUrl(domain : string, uri? : string) : string {
    if (__TEST__ && isBrowser()) {
        domain = getActualDomain();
    }
    return `${ domain }${ uri || '' }`;
}

export const DOMAINS = {
    local: {
        get PAYPAL() : string {
            return `http://localhost.paypal.com:${ getPort() }`;
        },
        get LOGGER() : string {
            return `https://${ getStageHost() }`;
        },
        get API() : string {
            return `https://${ getStageHost() }`;
        }
    },
    stage: {
        get PAYPAL() : string {
            return `https://${ getStageHost() }`;
        },
        get LOGGER() : string {
            return `https://${ getStageHost() }`;
        },
        get API() : string {
            return `https://${ getStageHost() }:12326`;
        }
    },
    sandbox: {
        PAYPAL: `https://www.sandbox.paypal.com`,
        LOGGER: `https://www.sandbox.paypal.com`,
        API:    `https://cors.api.sandbox.paypal.com`
    },
    production: {
        PAYPAL: `https://www.paypal.com`,
        LOGGER: `https://www.paypal.com`,
        API:    `https://www.cors.api.paypal.com`
    },
    test: {
        PAYPAL: `mock://www.paypal.com`,
        LOGGER: `mock://www.paypal.com`,
        API:    `mock://api.paypal.com`
    }
}[__ENV__];


const URIS = {
    LOGGER: `/xoplatform/logger/api/logger`
};

export const URLS = {
    get LOGGER() : string {
        return buildConfigUrl(DOMAINS.LOGGER, URIS.LOGGER);
    }
};
