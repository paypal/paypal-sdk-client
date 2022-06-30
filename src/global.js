/* @flow */

import {
  ENV,
  PROTOCOL,
  COMPONENTS,
  PLATFORM,
  type FundingEligibilityType,
} from "@paypal/sdk-constants/src";
import { isDevice } from "@krakenjs/belter/src";

export function getSDKHost(): string {
  return __SDK_HOST__;
}

export function getProtocol(): $Values<typeof PROTOCOL> {
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

export function getEnv(): $Values<typeof ENV> {
  return __ENV__;
}

export function getPayPalDomain(): string {
  return __PAYPAL_DOMAIN__;
}

export function getPayPalAPIDomain(): string {
  return __PAYPAL_API_DOMAIN__;
}

export function getDefaultServiceStageHost(): ?string {
  if (
    typeof __SERVICE_STAGE_HOST__ !== "undefined" &&
    __SERVICE_STAGE_HOST__ !== null
  ) {
    return __SERVICE_STAGE_HOST__;
  }
}

export function getDefaultStageHost(): ?string {
  if (typeof __STAGE_HOST__ !== "undefined" && __STAGE_HOST__ !== null) {
    return __STAGE_HOST__;
  }
}

export function getDefaultAPIStageHost(): ?string {
  const serviceStageHost = getDefaultServiceStageHost();
  const stageHost = getDefaultStageHost();

  if (serviceStageHost) {
    return serviceStageHost;
  } else if (stageHost) {
    return stageHost;
  }
}

export function getStageHost(): ?string {
  return getDefaultStageHost();
}

export function getAPIStageHost(): ?string {
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

export function getComponents(): $ReadOnlyArray<$Values<typeof COMPONENTS>> {
  return __COMPONENTS__;
}

export function getFundingEligibility(): FundingEligibilityType {
  return __FUNDING_ELIGIBILITY__;
}

export function getPlatform(): $Values<typeof PLATFORM> {
  return isDevice() ? PLATFORM.MOBILE : PLATFORM.DESKTOP;
}
