import type {
  FundingEligibilityType,
  ENV,
  COMPONENTS,
} from "@paypal/sdk-constants/src";
import { PROTOCOL, PLATFORM } from "@paypal/sdk-constants/src";
import { isDevice } from "@krakenjs/belter/src";

import {
  __SDK_HOST__,
  __PROTOCOL__,
  __HOST__,
  __HOSTNAME__,
  __PORT__,
  __PATH__,
  __ENV__,
  __PAYPAL_DOMAIN__,
  __PAYPAL_API_DOMAIN__,
  __SERVICE_STAGE_HOST__,
  __STAGE_HOST__,
  __VERSION__,
  __CORRELATION_ID__,
  __NAMESPACE__,
  __DEBUG__,
  __COMPONENTS__,
  __FUNDING_ELIGIBILITY__,
} from "./declarations";

export function getSDKHost(): string {
  return __SDK_HOST__;
}
export function getProtocol(): typeof PROTOCOL[keyof typeof PROTOCOL] {
  return typeof __PROTOCOL__ !== "undefined" ? __PROTOCOL__ : PROTOCOL.HTTPS;
}
export function getHost(): string {
  return __HOST__;
}
export function getHostName(): string {
  return __HOSTNAME__;
}
export function getPort(): number {
  return __PORT__;
}
export function getPath(): string {
  return __PATH__;
}
export function getEnv(): typeof ENV[keyof typeof ENV] {
  return __ENV__;
}
export function getPayPalDomain(): string {
  return __PAYPAL_DOMAIN__;
}
export function getPayPalAPIDomain(): string {
  return __PAYPAL_API_DOMAIN__;
}
export function getDefaultServiceStageHost(): string | null | undefined {
  if (
    typeof __SERVICE_STAGE_HOST__ !== "undefined" &&
    __SERVICE_STAGE_HOST__ !== null
  ) {
    return __SERVICE_STAGE_HOST__;
  }
}
export function getDefaultStageHost(): string | null | undefined {
  if (typeof __STAGE_HOST__ !== "undefined" && __STAGE_HOST__ !== null) {
    return __STAGE_HOST__;
  }
}
export function getDefaultAPIStageHost(): string | null | undefined {
  const serviceStageHost = getDefaultServiceStageHost();
  const stageHost = getDefaultStageHost();

  if (serviceStageHost) {
    return serviceStageHost;
  } else if (stageHost) {
    return stageHost;
  }
}
export function getStageHost(): string | null | undefined {
  return getDefaultStageHost();
}
export function getAPIStageHost(): string | null | undefined {
  const defaultAPIStageHost = getDefaultAPIStageHost();

  if (defaultAPIStageHost) {
    return defaultAPIStageHost.replace("www.", "api.");
  }
}
export function getVersion(): string {
  return __VERSION__;
}
export function getCorrelationID(): string {
  return __CORRELATION_ID__;
}
export function getDefaultNamespace(): string {
  return __NAMESPACE__;
}
export function getDebug(): boolean {
  return __DEBUG__;
}
export function getComponents(): ReadonlyArray<
  typeof COMPONENTS[keyof typeof COMPONENTS]
> {
  return __COMPONENTS__;
}
export function getFundingEligibility(): typeof FundingEligibilityType {
  return __FUNDING_ELIGIBILITY__;
}
export function getPlatform(): typeof PLATFORM[keyof typeof PLATFORM] {
  return isDevice() ? PLATFORM.MOBILE : PLATFORM.DESKTOP;
}
