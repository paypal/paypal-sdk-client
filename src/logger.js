/* @flow */

import { Logger, type LoggerType } from "@krakenjs/beaver-logger/src";
import { memoize } from "@krakenjs/belter/src";

import { getDisableSetCookie, getExperimentation } from "./global";
import { getPayPalLoggerUrl } from "./domains";

type GetLogger = () => LoggerType;

export const getLogger: GetLogger = memoize(() => {
  const disableSetCookieQuery = "disableSetCookie=true";
  let params = "";

  if (getDisableSetCookie()) {
    params = `?${disableSetCookieQuery}`;
  }

  const experimentation = getExperimentation();

  if (experimentation) {
    const { experience, treatment } = experimentation;
    let experimentationParam = params.length > 0 ? "&" : "?";

    if (experience) {
      experimentationParam += `experimation.experience=${experience}`;
    }

    if (treatment) {
      if (experience) {
        experimentationParam += `&experimation.treatment=${treatment}`;
      } else {
        experimentationParam += `experimation.treatment=${treatment}`;
      }
    }

    params += experimentationParam;
  }

  const loggerUrl =
    params.length > 1
      ? `${getPayPalLoggerUrl()}${params}`
      : getPayPalLoggerUrl();

  return Logger({
    url: loggerUrl,
  });
});
