/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { ENV } from "@paypal/sdk-constants/src";
import { memoize, type Memoized } from "@krakenjs/belter/src";

import { FRAUDNET_FNCLS, FRAUDNET_URL } from "./constants";
import { getLogger } from "./logger";

type FraudnetOptions = {|
  env: $Values<typeof ENV>,
  clientMetadataID: string,
  cspNonce?: ?string,
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

export const createFraudnetScript = ({ cspNonce, env, queryStringParams }) => {
  return new ZalgoPromise((resolve, reject) => {
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
    // eslint-disable-next-line compat/compat
    document.body.appendChild(fraudnetScript);

    fraudnetScript.addEventListener("load", () => {
      resolve();
    });
    fraudnetScript.addEventListener("error", () => {
      reject(new Error(`Fraudnet failed to load.`));
    });
    fraudnetScript.addEventListener("abort", () => {
      reject(new Error(`Fraudnet load was aborted.`));
    });
  });
};

type LoadFraudnet = (opts: FraudnetOptions) => { collect: () => void };

export const loadFraudnet: LoadFraudnet = memoize(
  ({ env, clientMetadataID, cspNonce, appName, queryStringParams = {} }) => {
    createConfigScript({ env, cspNonce, clientMetadataID, appName });

    const fraudnetPromise = createFraudnetScript({
      cspNonce,
      env,
      queryStringParams,
    }).catch(() => {
      getLogger().warn("ppcp_axo_init_fraudnet_failed");
    });

    return {
      collect: async () => {
        try {
          await fraudnetPromise;
          await window.PAYPAL.asyncData.collect();
        } catch (err) {
          getLogger().warn("ppcp_axo_collect_fraudnet_failed");
        }
      },
    };
  }
);
