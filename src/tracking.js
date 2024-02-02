/* @flow */

import {
  noop,
  stringifyError,
  stringifyErrorMessage,
  isIEIntranet,
  getResourceLoadTime,
  waitForWindowReady,
  ATTRIBUTES,
} from "@krakenjs/belter/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import {
  FPTI_KEY,
  FPTI_FEED,
  FPTI_DATA_SOURCE,
  FPTI_SDK_NAME,
  FPTI_USER_ACTION,
} from "@paypal/sdk-constants/src";

import { getEnv, getVersion, getCorrelationID, getComponents } from "./global";
import {
  getPartnerAttributionID,
  getClientID,
  getMerchantID,
  getCommit,
  getLocale,
  getSDKScript,
  getSDKIntegrationSource,
  getPageType as getSDKPageType,
  getClientToken,
  getUserIDToken,
  getSDKToken,
} from "./script";
import { getSessionID } from "./session";
import { getLogger } from "./logger";
import { isPayPalDomain } from "./domains";

let sdkInitTime;

const getTokenType = (): string => {
  if (getClientToken()) {
    return "client-token";
  }

  if (getUserIDToken()) {
    return "user-id-token";
  }

  if (getSDKToken()) {
    return "sdk-token";
  }

  return "none";
};

const getIntegrationSource = (): string => {
  const integrationSource = getSDKIntegrationSource();

  if (integrationSource) {
    return integrationSource;
  } else {
    return "none";
  }
};

const getPageType = (): string => {
  const pageType = getSDKPageType();

  if (pageType) {
    return pageType;
  } else {
    return "none";
  }
};

export function getSDKInitTime(): number {
  if (typeof sdkInitTime === "undefined") {
    throw new TypeError(`SDK not initialized`);
  }

  return sdkInitTime;
}

export function setupLogger() {
  const logger = getLogger();
  const pageType = getPageType();
  const integrationSource = getIntegrationSource();
  const version = getVersion();
  const userAction = getCommit()
    ? FPTI_USER_ACTION.COMMIT
    : FPTI_USER_ACTION.CONTINUE;

  sdkInitTime = Date.now();

  logger.addPayloadBuilder(() => {
    return {
      referer: window.location.host,
      uid: getSessionID(),
      env: getEnv(),
    };
  });

  logger.addTrackingBuilder(() => {
    const { lang, country } = getLocale();
    const mID = getMerchantID();

    return {
      [FPTI_KEY.FEED]: FPTI_FEED.PAYMENTS_SDK,
      [FPTI_KEY.DATA_SOURCE]: FPTI_DATA_SOURCE.PAYMENTS_SDK,
      [FPTI_KEY.CLIENT_ID]: getClientID(),
      [FPTI_KEY.SELLER_ID]: mID && mID.toString(),
      [FPTI_KEY.SESSION_UID]: getSessionID(),
      [FPTI_KEY.REFERER]: window.location.host,
      [FPTI_KEY.LOCALE]: `${lang}_${country}`,
      [FPTI_KEY.INTEGRATION_IDENTIFIER]: getClientID(),
      [FPTI_KEY.PARTNER_ATTRIBUTION_ID]: getPartnerAttributionID(),
      [FPTI_KEY.PAGE_TYPE]: pageType,
      [FPTI_KEY.SDK_NAME]: FPTI_SDK_NAME.PAYMENTS_SDK,
      [FPTI_KEY.SDK_VERSION]: version,
      [FPTI_KEY.USER_AGENT]: window.navigator && window.navigator.userAgent,
      [FPTI_KEY.USER_ACTION]: userAction,
      [FPTI_KEY.CONTEXT_CORRID]: getCorrelationID(),
      [FPTI_KEY.SDK_INTEGRATION_SOURCE]: integrationSource,
    };
  });

  ZalgoPromise.onPossiblyUnhandledException((err) => {
    logger.track({
      [FPTI_KEY.ERROR_CODE]: "payments_sdk_error",
      [FPTI_KEY.ERROR_DESC]: stringifyErrorMessage(err),
    });

    logger.error("unhandled_error", {
      err: stringifyError(err),
    });

    // eslint-disable-next-line promise/no-promise-in-callback
    logger.flush().catch(noop);
  });

  waitForWindowReady().then(() => {
    const sdkScript = getSDKScript();
    const loadTime = getResourceLoadTime(sdkScript.src);
    let cacheType;

    if (loadTime === 0) {
      cacheType = "sdk_client_cache_hit";
    } else if (typeof loadTime === "number") {
      cacheType = "sdk_client_cache_miss";
    } else {
      cacheType = "sdk_client_cache_unknown";
    }

    // Exclude apps that use the JS SDK and are hosted directly on www.paypal.com. Ex:
    // https://www.paypal.com/buttons/smart
    // https://www.paypal.com/us/gifts/
    const isLoadedInFrame = isPayPalDomain() && window.xprops;
    const sdkLoadTime = typeof loadTime === "number" ? loadTime : undefined;

    logger.info(
      `sdk_${isLoadedInFrame ? "paypal" : "non_paypal"}_domain_script_uid_${
        sdkScript.hasAttribute(ATTRIBUTES.UID) ? "present" : "missing"
      }`
    );

    if (loadTime) {
      logger
        // We can not send gauge metrics to our logger backend currently
        // once we have that ability, we should uncomment this gauge metric
        // .metric({
        //   metricNamespace: "pp.app.paypal_sdk.init.gauge",
        //   metricType: "gauge",
        //   metricEventName: "load_performance",
        //   metricValue: sdkLoadTime,
        //   dimensions: {
        //     cacheType,
        //     version,
        //     components: getComponents().join(","),
        //     isPayPalDomain: isLoadedInFrame,
        //     token: getTokenType(),
        //   },
        // })
        // $FlowIssue
        .metric({
          metricNamespace: "pp.app.paypal_sdk.init.count",
          metricEventName: "load",
          dimensions: {
            integrationSource,
            pageType,
            userAction,
            version,
            components: getComponents().join(","),
            isPayPalDomain: isLoadedInFrame,
            token: getTokenType(),
          },
        })
        .track({
          [FPTI_KEY.TRANSITION]: "process_js_sdk_init_client",
          [FPTI_KEY.SDK_LOAD_TIME]: sdkLoadTime,
          [FPTI_KEY.SDK_CACHE]: cacheType,
        });
    }

    if (isIEIntranet()) {
      logger.warn("ie_intranet_mode");
    }
  });
}
