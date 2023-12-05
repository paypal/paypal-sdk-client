/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { ENV } from "@paypal/sdk-constants/src";
import { memoize, type Memoized } from "@krakenjs/belter/src";

import { FRAUDNET_FNCLS, FRAUDNET_URL } from "./constants";

type FraudnetOptions = {|
  env: $Values<typeof ENV>,
  clientMetadataID: string,
  cspNonce?: ?string,
  timeout?: number,
  appName?: string,
  queryStringParams?: { [string]: string | boolean },
|};

type FraudnetConfig = {|
  f: string,
  s: string,
  u: string,
  cb1: string,
  sandbox?: boolean,
|};

export const createConfigScript = ({
  env,
  cspNonce = "",
  clientMetadataID,
  appName,
}) => {
  return new ZalgoPromise((resolve) => {
    if (__TEST__) {
      return resolve();
    }

    const config: FraudnetConfig = {
      f: clientMetadataID,
      s: appName,
      io: true,
      cb1: "fnCallback",
    };

    if (env === ENV.SANDBOX) {
      config.sandbox = true;
    }

    const configScript = document.createElement("script");

    configScript.setAttribute("nonce", cspNonce);
    configScript.setAttribute("type", "application/json");
    configScript.setAttribute("id", "fconfig");
    configScript.setAttribute("fncls", FRAUDNET_FNCLS);
    configScript.text = JSON.stringify(config);
    // eslint-disable-next-line compat/compat
    document.body.appendChild(configScript);
  });
};

export const createFraudnetScript = ({
  cspNonce,
  env,
  queryStringParams,
  timeout,
}) => {
  return new ZalgoPromise((resolve) => {
    const fraudnetScript = document.createElement("script");
    const queryString = Object.keys(queryStringParams)
      .map(
        (key) => `${key}=${encodeURIComponent(String(queryStringParams[key]))}`
      )
      .join("&");

    const fraudnetUrl = queryString.length
      ? `${FRAUDNET_URL[env]}?${queryString}`
      : FRAUDNET_URL[env];

    fraudnetScript.setAttribute("nonce", cspNonce || "");
    fraudnetScript.setAttribute("src", fraudnetUrl);
    fraudnetScript.addEventListener("error", () => resolve());

    window.fnCallback = resolve;
    setTimeout(resolve, timeout);
    // eslint-disable-next-line compat/compat
    document.body.appendChild(fraudnetScript);
    // wait on load events
    // once load event fires::: resolve with _something_
    // return `connect`
    // `connect` will be a function we define that wraps the resolve
    // to the load
  });
};

export const loadFraudnet: Memoized<FraudnetOptions> = memoize(
  ({
    env,
    clientMetadataID,
    cspNonce,
    timeout = 1000,
    appName,
    queryStringParams = {},
  }) => {
    createConfigScript({ env, cspNonce, clientMetadataID, appName });
    const fraudnetPromise = createFraudnetScript({
      cspNonce,
      env,
      timeout,
      queryStringParams,
    });

    return {
      // init
      collect: async () => {
        const { collect } = await fraudnetPromise;
        try {
          await collect();
        } catch (error) {
          // log/swallow error
        }
      },
    };
  }
);
