/* @flow */
import { ENV } from "@paypal/sdk-constants/src";

export const FPTI_CONTEXT_TYPE = {
  ORDER_ID: ("EC-Token": "EC-Token"),
};

export const FPTI_TRANSITION = {
  CREATE_ORDER: ("process_create_order": "process_create_order"),
  SCRIPT_LOAD: ("process_script_load": "process_script_load"),
  PXP: ("process_pxp_check": "process_pxp_check"),
};

export const FPTI_STATE = {
  PXP: ("PXP_CHECK": "PXP_CHECK"),
};

type FraudnetUrl = {|
  [$Values<typeof ENV>]: string,
|};

export const FRAUDNET_URL: FraudnetUrl = {
  [ENV.LOCAL]:
    "https://cdn-latest.static.engineering.dev.paypalinc.com/rdaAssets/fraudnet/async/fb-raw.js",
  [ENV.STAGE]:
    "https://cdn-latest.static.engineering.dev.paypalinc.com/rdaAssets/fraudnet/async/fb-raw.js",
  [ENV.SANDBOX]: "https://c.paypal.com/da/r/fb.js",
  [ENV.PRODUCTION]: "https://c.paypal.com/da/r/fb.js",
  [ENV.TEST]: "https://c.paypal.com/da/r/fb.js",
};

export const FRAUDNET_FNCLS = "fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99";
