/* @flow */

import { Logger, type LoggerType } from "@krakenjs/beaver-logger/src";
import { memoize } from "@krakenjs/belter/src";

import { getDisableSetCookie } from "./global";
import { getPayPalLoggerUrl } from "./domains";

type GetLogger = () => LoggerType;

// TODO: Try to get this aliased with csnw
// TODO: Validate that the logic below is good
// -- Will getDisableSetCookie() be a boolean or string? String, right??
// -- Should I turn it into a boolean within the getDisableSetCookie() function??
const loggerUrl =
  getDisableSetCookie() === "true"
    ? `${getPayPalLoggerUrl}?disable-set-cookie=true`
    : getPayPalLoggerUrl();

export const getLogger: GetLogger = memoize(() => {
  return Logger({
    url: loggerUrl,
  });
});
