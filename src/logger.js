/* @flow */

import { Logger, type LoggerType } from "@krakenjs/beaver-logger/src";
import { memoize } from "@krakenjs/belter/src";
import { BASE_SDK_METRIC_NAMESPACE } from "@paypal/sdk-constants/src";

import { getDisableSetCookie } from "./global";
import { getPayPalLoggerUrl } from "./domains";

type GetLogger = () => LoggerType;

export const getLogger: GetLogger = memoize(() => {
  const disableSetCookieQuery = "disableSetCookie=true";

  const loggerUrl = getDisableSetCookie()
    ? `${getPayPalLoggerUrl()}?${disableSetCookieQuery}`
    : getPayPalLoggerUrl();

  return Logger({
    url: loggerUrl,
    metricNamespacePrefix: BASE_SDK_METRIC_NAMESPACE,
  });
});

// Deprecated - will remove once we have verified no other clients are importing this function
export const sendCountMetric = ({
  dimensions,
  event,
  name,
  value = 1,
}: {|
  event: string,
  name: string,
  value?: number,
  dimensions: {
    [string]: mixed,
  },
  // $FlowIssue return type
|}) =>
  getLogger().metric({
    dimensions,
    metricEventName: event,
    metricNamespace: name,
    metricValue: value,
    metricType: "counter",
  });
