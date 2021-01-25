/* @flow */

import { ENV } from '@paypal/sdk-constants/src';
import { getDomain, getActualDomain, isCurrentDomain } from 'cross-domain-utils/src';

import { getProtocol, getHost, getStageHost, getAPIStageHost } from './global';
import { URI } from './config';

export function getPayPalDomain() : string {
    if (__ENV__ === ENV.LOCAL) {
        return `${ getProtocol() }://${ getHost() }`;
    }

    if (__ENV__ === ENV.STAGE) {
        const stageHost = getStageHost();
        
        if (!stageHost) {
            throw new Error(`No stage host found`);
        }

        return `${ getProtocol() }://${ stageHost }`;
    }

    if (__ENV__ === ENV.SANDBOX) {
        return `${ getProtocol() }://www.sandbox.paypal.com`;
    }

    if (__ENV__ === ENV.PRODUCTION) {
        return `${ getProtocol() }://www.paypal.com`;
    }

    if (__ENV__ === ENV.TEST) {
        return `mock://www.paypal.com`;
    }

    throw new Error(`Can not get paypal domain for env: ${ __ENV__ }`);
}

export function getPayPalAPIDomain() : string {
    if (__ENV__ === ENV.LOCAL || __ENV__ === ENV.STAGE) {
        const apiStageHost = getAPIStageHost();
        
        if (!apiStageHost) {
            throw new Error(`No api stage host found`);
        }

        return `${ getProtocol() }://${ apiStageHost }`;
    }

    if (__ENV__ === ENV.SANDBOX) {
        return `${ getProtocol() }://cors.api.sandbox.paypal.com`;
    }

    if (__ENV__ === ENV.PRODUCTION) {
        return `${ getProtocol() }://cors.api.paypal.com`;
    }

    if (__ENV__ === ENV.TEST) {
        return `mock://api.paypal.com`;
    }

    throw new Error(`Can not get paypal api domain for env: ${ __ENV__ }`);
}

export function getPayPalLoggerDomain() : string {
    if (__ENV__ === ENV.LOCAL) {
        const stageHost = getStageHost();
        
        if (!stageHost) {
            throw new Error(`No stage host found`);
        }

        return `${ getProtocol() }://${ stageHost }`;
    }

    return getPayPalDomain();
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
    if (__ENV__ === ENV.LOCAL) {
        // eslint-disable-next-line security/detect-non-literal-regexp
        return /.*loca.*|.*ngrok.*/;
    }
    // eslint-disable-next-line security/detect-unsafe-regex
    return /\.paypal\.com(:\d+)?$/;
}

export function isPayPalDomain() : boolean {
    return Boolean(getDomain().match(getPayPalDomainRegex()));
}
