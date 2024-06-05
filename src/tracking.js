/* @flow */

import {
  noop,
  stringifyError,
  stringifyErrorMessage,
  isIEIntranet,
  getResourceLoadTime,
  waitForWindowReady,
  ATTRIBUTES,
  isLocalStorageEnabled,
} from "@krakenjs/belter/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import {
  FPTI_KEY,
  FPTI_FEED,
  FPTI_DATA_SOURCE,
  FPTI_SDK_NAME,
  FPTI_USER_ACTION,
  payPalWebV5Dimensions,
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
  getJsSdkLibrary,
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

export const getJsLibrary = (): string => {
  const jsSdkLibrary = getJsSdkLibrary();

  if (jsSdkLibrary) {
    return jsSdkLibrary;
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
  const jsSdkLibrary = getJsLibrary();
  const version = getVersion();
  const userAction = getCommit()
    ? FPTI_USER_ACTION.COMMIT
    : FPTI_USER_ACTION.CONTINUE;
  const { lang, country } = getLocale();
  const mID = getMerchantID();

  sdkInitTime = Date.now();

  logger.addPayloadBuilder(() => ({
    uid: getSessionID(),
    env: getEnv(),
    clientId: getClientID(),
    csnwCorrelationId: getCorrelationID(),
    referrer: window.location.host,
    version,
    merchantId: mID,
    sessionId: getSessionID(),
    userAction,
  }));

  logger.addTrackingBuilder(() => ({
    [FPTI_KEY.CLIENT_ID]: getClientID(),
    [FPTI_KEY.CONTEXT_CORRID]: getCorrelationID(),
    [FPTI_KEY.DATA_SOURCE]: FPTI_DATA_SOURCE.PAYMENTS_SDK,
    [FPTI_KEY.FEED]: FPTI_FEED.PAYMENTS_SDK,
    [FPTI_KEY.INTEGRATION_IDENTIFIER]: getClientID(),
    [FPTI_KEY.JS_SDK_LIBRARY]: jsSdkLibrary,
    [FPTI_KEY.LOCALE]: `${lang}_${country}`,
    [FPTI_KEY.PAGE_TYPE]: pageType,
    [FPTI_KEY.PARTNER_ATTRIBUTION_ID]: getPartnerAttributionID(),
    [FPTI_KEY.REFERER]: window.location.host,
    [FPTI_KEY.SDK_INTEGRATION_SOURCE]: integrationSource,
    [FPTI_KEY.SDK_NAME]: FPTI_SDK_NAME.PAYMENTS_SDK,
    [FPTI_KEY.SDK_VERSION]: version,
    [FPTI_KEY.SELLER_ID]: mID && mID.toString(),
    [FPTI_KEY.SESSION_UID]: getSessionID(),
    [FPTI_KEY.USER_ACTION]: userAction,
    [FPTI_KEY.USER_AGENT]: window.navigator && window.navigator.userAgent,
  }));

  logger.addMetricDimensionBuilder(() => payPalWebV5Dimensions);

  ZalgoPromise.onPossiblyUnhandledException((err) => {
    logger.track({
      [FPTI_KEY.ERROR_CODE]: "payments_sdk_error",
      [FPTI_KEY.ERROR_DESC]: stringifyErrorMessage(err),
    });

    logger.error("paypal_js_sdk_v5_unhandled_exception", {
      err: stringifyError(err),
    });

    // eslint-disable-next-line promise/no-promise-in-callback
    logger.flush().catch(noop);
  });

  waitForWindowReady().then(() => {
    const sdkScript = getSDKScript();
    const loadTime = getResourceLoadTime(sdkScript.src);
    const localStorageEnabled = isLocalStorageEnabled();

    // Exclude apps that use the JS SDK and are hosted directly on www.paypal.com. Ex:
    // https://www.paypal.com/buttons/smart
    // https://www.paypal.com/us/gifts/
    const loadedInFrame =
      isPayPalDomain() && window.xprops ? "paypal" : "non_paypal";

    logger
      .addPayloadBuilder(() => ({ loadedInFrame }))
      .addTrackingBuilder(() => ({ loaded_in_frame: loadedInFrame }))
      .addMetricDimensionBuilder(() => ({
        isPayPalDomain: Boolean(loadedInFrame).toString(),
      }));

    let cacheType;
    if (loadTime === 0) {
      cacheType = "sdk_client_cache_hit";
    } else if (typeof loadTime === "number") {
      cacheType = "sdk_client_cache_miss";
    } else {
      cacheType = "sdk_client_cache_unknown";
    }

    const sdkLoadTime = typeof loadTime === "number" ? loadTime : undefined;

    logger
      .info("paypal_js_sdk_v5_init", {
        ...(isIEIntranet() ? { ie_intranet_mode: true } : {}),
        uidAttribute: sdkScript.hasAttribute(ATTRIBUTES.UID)
          ? "present"
          : "missing",
        loadTime: sdkLoadTime,
        cacheType,
        jsSdkLibrary,
        locale: `${lang}_${country}`,
        integrationSource,
        localStorageEnabled,
      })
      .track({
        [FPTI_KEY.TRANSITION]: "process_js_sdk_init_client",
        [FPTI_KEY.SDK_LOAD_TIME]: sdkLoadTime,
        [FPTI_KEY.SDK_CACHE]: cacheType,
        local_storage_enabled: localStorageEnabled,
      })
      .metricCounter({
        namespace: "sdk_client.init.count",
        event: "init",
        dimensions: {
          components: getComponents().join(","),
          integrationSource,
          jsSdkLibrary,
          localStorageEnabled,
          pageType,
          token: getTokenType(),
          userAction,
          version,
        },
      });
  });
}
