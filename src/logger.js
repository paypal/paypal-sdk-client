/* @flow */

import { Logger, type LoggerType } from "@krakenjs/beaver-logger/src";
import { memoize } from "@krakenjs/belter/src";

import { getDisableSetCookie } from "./global";
import { getPayPalLoggerUrl } from "./domains";

type GetLogger = () => LoggerType;

const disableSetCookieQuery = "disableSetCookie=true";

const loggerUrl = getDisableSetCookie()
  ? `${getPayPalLoggerUrl()}?${disableSetCookieQuery}`
  : getPayPalLoggerUrl();

export const getLogger: GetLogger = memoize(() => {
  return Logger({
    url: loggerUrl,
  });
});
