/* @flow */

import { ENV } from '@paypal/sdk-constants/src';

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

export function getDefaultStageHost() : string {
    return __STAGE_HOST__;
}

export function getDefaultAPIStageHost() : string {
    return (typeof __SERVICE_STAGE_HOST__ !== 'undefined')
        ? __SERVICE_STAGE_HOST__
        : __STAGE_HOST__.replace('www.', '');
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

export function getDebug() : boolean {
    return __DEBUG__;
}
