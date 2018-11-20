/* @flow */

import { COUNTRY, ENV } from 'paypal-sdk-constants/src';

export function getHost() : string {
    return __HOST__;
}

export function getHostName() : string {
    return __HOSTNAME__;
}

export function getPort() : number {
    return __PORT__;
}

export function getPath() : string {
    return __PATH__;
}

export function getEnv() : $Values<typeof ENV> {
    return __ENV__;
}

export function getCountry() : $Values<typeof COUNTRY> {
    return __LOCALE_COUNTRY__;
}

export function getDefaultStageHost() : string {
    return __STAGE_HOST__;
}

export function getVersion() : string {
    return __VERSION__;
}

export function getCorrelationID() : string {
    return __CORRELATION_ID__;
}

export function getNamespace() : string {
    return __NAMESPACE__;
}

