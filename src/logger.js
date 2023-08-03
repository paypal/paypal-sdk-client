/* @flow */

import { Logger, type LoggerType } from "@krakenjs/beaver-logger/src";
import { memoize } from "@krakenjs/belter/src";

import { getDisableSetCookie, getExperimentation } from "./global";
import { getPayPalLoggerUrl } from "./domains";

type GetLogger = () => LoggerType;

export const getLogger: GetLogger = memoize(() => {
  const disableSetCookieQuery = "disableSetCookie=true";
  let params = "?";
  const experimentation = getExperimentation();

  if (getDisableSetCookie()) {
    params += disableSetCookieQuery;
  }

  if (experimentation) {
    params =
      params.length > 1
        ? `${params}&experimentation=${JSON.stringify(experimentation)}`
        : `${params}experimentation=${JSON.stringify(experimentation)}`;
  }

  const loggerUrl =
    params.length > 1
      ? `${getPayPalLoggerUrl()}${params}`
      : getPayPalLoggerUrl();

  return Logger({
    url: loggerUrl,
  });
});
