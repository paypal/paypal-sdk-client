import { isBrowser, getActualDomain } from 'cross-domain-utils/src';

import { getStageHost, getPort } from './globals';

export function buildConfigUrl(domain, uri) {
    if (__TEST__ && isBrowser()) {
        domain = getActualDomain();
    }
    return '' + domain + (uri || '');
}

export var DOMAINS = {
    local: {
        get PAYPAL() {
            return 'http://localhost.paypal.com:' + getPort();
        },
        get LOGGER() {
            return 'https://www.' + getStageHost();
        },
        get API() {
            return 'https://www.' + getStageHost();
        }
    },
    stage: {
        get PAYPAL() {
            return 'https://www.' + getStageHost();
        },
        get LOGGER() {
            return 'https://www.' + getStageHost();
        },
        get API() {
            return 'https://www.' + getStageHost() + ':12326';
        }
    },
    sandbox: {
        PAYPAL: 'https://www.sandbox.paypal.com',
        LOGGER: 'https://www.sandbox.paypal.com',
        API: 'https://cors.api.sandbox.paypal.com'
    },
    production: {
        PAYPAL: 'https://www.paypal.com',
        LOGGER: 'https://www.paypal.com',
        API: 'https://www.cors.api.paypal.com'
    },
    test: {
        PAYPAL: 'mock://www.paypal.com',
        LOGGER: 'mock://www.paypal.com',
        API: 'mock://api.paypal.com'
    }
}[__ENV__];

var URIS = {
    LOGGER: '/xoplatform/logger/api/logger'
};

export var URLS = {
    get LOGGER() {
        return buildConfigUrl(DOMAINS.LOGGER, URIS.LOGGER);
    }
};