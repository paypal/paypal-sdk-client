import { ENV } from "@paypal/sdk-constants/dist/esm";
import {
  getDomain,
  getActualDomain,
  isCurrentDomain,
} from "@krakenjs/cross-domain-utils/dist/esm";

import {
  getProtocol,
  getStageHost,
  getPayPalDomain,
  getPayPalAPIDomain,
} from "./global";
import { URI } from "./config";
import { __ENV__, __TEST__, __WEB__ } from "./declarations";

export function getPayPalLoggerDomain(): string {
  if (__ENV__ === ENV.LOCAL) {
    const stageHost = getStageHost();

    if (!stageHost) {
      throw new Error(`No stage host found`);
    }

    return `${getProtocol() as string}://${stageHost}`;
  }

  return getPayPalDomain();
}

export function buildPayPalUrl(path = ""): string {
  return __TEST__ && __WEB__
    ? `${getActualDomain()}${path}`
    : `${getPayPalDomain()}${path}`;
}

export function buildPayPalAPIUrl(path = ""): string {
  const paypalAPIDomain = isCurrentDomain(getPayPalDomain())
    ? getPayPalDomain()
    : getPayPalAPIDomain();
  return __TEST__ && __WEB__
    ? `${getActualDomain()}${path}`
    : `${paypalAPIDomain}${path}`;
}

export function getPayPalLoggerUrl(): string {
  return buildPayPalUrl(URI.LOGGER);
}

export function getAuthAPIUrl(): string {
  return buildPayPalAPIUrl(URI.AUTH);
}

export function getOrderAPIUrl(): string {
  return buildPayPalAPIUrl(URI.ORDER);
}

export function getPayPalDomainRegex(): RegExp {
  if (__ENV__ === ENV.LOCAL) {
    return /.*loca.*/;
  }

  // eslint-disable-next-line security/detect-unsafe-regex
  return /\.paypal\.(com|cn)(:\d+)?$/;
}

export function isPayPalDomain(): boolean {
  return Boolean(getPayPalDomainRegex().exec(getDomain()));
}
