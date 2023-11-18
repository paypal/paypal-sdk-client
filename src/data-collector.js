/* @flow */

// import { ENV } from '@paypal/sdk-constants/src';

export const FRAUDNET_FNCLS = "fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99";
export const FRAUDNET_APP_NAME = "SMART_PAYMENT_BUTTONS";

// const FRAUDNET_URL = {
//   [ENV.LOCAL]: "https://www.msmaster.qa.paypal.com/en_US/m/fb-raw.js",
//   [ENV.STAGE]: "https://stage2mb044.qa.paypal.com/fraudnetjsnodeweb/automate/develop/stage_raw.js",
//   [ENV.SANDBOX]: "https://c.paypal.com/da/r/fb.js",
//   [ENV.PRODUCTION]: "https://c.paypal.com/da/r/fb.js",
//   [ENV.TEST]: "https://c.paypal.com/da/r/fb.js",
// };

export const loadDataCollector = async ({
  cspNonce = "",
  clientMetadataID,
  env,
}) => {
  // TODO: Ensure these functions return zalgo promises accordingly. reference fraudnet.js in SPB for pattern
  createConfigScript({ cspNonce, clientMetadataID });
  createFraudnetScript({ cspNonce, env });

  // TODO: test and implement the window.fallback/timeout logic (see fraudnet.js in SPB)
};

export const createConfigScript = ({ cspNonce = "", clientMetadataID }) => {
  const fraudnetConfig = {
    f: clientMetadataID,
    s: FRAUDNET_APP_NAME,
    cb1: "fnCallback",
  };

  const configScript = document.createElement("script");

  configScript.setAttribute("nonce", cspNonce);
  configScript.setAttribute("type", "application/json");
  configScript.setAttribute("id", "fconfig");
  configScript.setAttribute("fncls", FRAUDNET_FNCLS);
  configScript.textContent = JSON.stringify(fraudnetConfig);

  document.body.appendChild(configScript);
};

export const createFraudnetScript = ({ cspNonce, env }) => {
  const fraudnetScript = document.createElement("script");

  // const fraudnetUrl = FRAUDNET_URL[env]
  fraudnetScript.setAttribute("nonce", cspNonce);
  // fraudnetScript.setAttribute('src', fraudnetUrl)
  fraudnetScript.addEventListener("error", () => {
    /* We'll want to resolve here Zalgo style */
  });

  document.body.appendChild(fraudnetScript);
};
