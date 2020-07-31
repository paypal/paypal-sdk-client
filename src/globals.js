/* @flow */

import { ENV, PROTOCOL, COMPONENTS, PLATFORM, type FundingEligibilityType } from '@paypal/sdk-constants/src';
import { isDevice } from 'belter/src';

export function getSDKHost() : string {
    return __SDK_HOST__;
}

export function getProtocol() : $Values<typeof PROTOCOL> {
    return (typeof __PROTOCOL__ !== 'undefined') ? __PROTOCOL__ : PROTOCOL.HTTPS;
}

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

export function getDefaultNamespace() : string {
    return __NAMESPACE__;
}

export function getDebug() : boolean {
    return __DEBUG__;
}

export function getComponents() : $ReadOnlyArray<$Values<typeof COMPONENTS>> {
    return __COMPONENTS__;
}

export function getFundingEligibility() : FundingEligibilityType {
    return __FUNDING_ELIGIBILITY__;
}

export function getPlatform() : $Values<typeof PLATFORM> {
    return isDevice() ? PLATFORM.MOBILE : PLATFORM.DESKTOP;
}
