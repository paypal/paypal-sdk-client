/* @flow */

import { ENV } from "@paypal/sdk-constants/src";
import {
  getDomain,
  getActualDomain,
  isCurrentDomain,
} from "@krakenjs/cross-domain-utils/src";

import {
  getPayPalAPIDomain,
  getPayPalDomain,
  getProtocol,
  getStageHost,
} from "./global";
import { URI } from "./config";

export function getPayPalLoggerDomain(): string {
  if (__ENV__ === ENV.LOCAL) {
    const stageHost = getStageHost();

    if (!stageHost) {
      throw new Error(`No stage host found`);
    }

    return `${getProtocol()}://${stageHost}`;
  }

  return getPayPalDomain();
}

export function buildPayPalUrl(path: string = ""): string {
  return __TEST__ && __WEB__
    ? `${getActualDomain()}${path}`
    : `${getPayPalDomain()}${path}`;
}

export function buildPayPalAPIUrl(path: string = ""): string {
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

export function getVenmoDomainRegex(): RegExp {
  // eslint-disable-next-line security/detect-unsafe-regex
  return /http.*(\.|\/)venmo\.com(:\d*)?$/;
}

export function isPayPalDomain(): boolean {
  return Boolean(getDomain().match(getPayPalDomainRegex()));
}

export function isPayPalTrustedDomain(): boolean {
  return (
    Boolean(getDomain().match(getPayPalDomainRegex())) ||
    Boolean(getDomain().match(getVenmoDomainRegex()))
  );
}

export function isPayPalTrustedUrl(href: string): boolean {
  try {
    // eslint-disable-next-line compat/compat
    const url = new URL(href);
    const domain = url.origin;
    return (
      Boolean(domain.match(getPayPalDomainRegex())) ||
      Boolean(domain.match(getVenmoDomainRegex()))
    );
  } catch (err) {
    return false;
  }
}
