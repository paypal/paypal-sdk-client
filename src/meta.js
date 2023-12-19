/* @flow */

import { SDK_SETTINGS } from "@paypal/sdk-constants/src";
import { base64encode, ATTRIBUTES } from "@krakenjs/belter/src";

import { getScriptUrl, getSDKAttributes } from "./script";
import { getSessionState } from "./session";

const ALLOWED_ATTRS = [
  SDK_SETTINGS.AMOUNT,
  SDK_SETTINGS.MERCHANT_ID,
  SDK_SETTINGS.PARTNER_ATTRIBUTION_ID,
  SDK_SETTINGS.POPUPS_DISABLED,
  SDK_SETTINGS.ENABLE_3DS,
  SDK_SETTINGS.SDK_INTEGRATION_SOURCE,
  SDK_SETTINGS.CLIENT_METADATA_ID,
  ATTRIBUTES.UID,
  SDK_SETTINGS.CSP_NONCE,
];

export function getSDKMeta(): string {
  const url = getScriptUrl();

  const scriptAttrs = getSDKAttributes();
  const handler = () => {};
  const shopperInsights = getSessionState(handler);

  const attrs = {};
  for (const attr of Object.keys(scriptAttrs)) {
    if (ALLOWED_ATTRS.indexOf(attr) !== -1) {
      attrs[attr] = scriptAttrs[attr];
    }
  }
  return base64encode(JSON.stringify({ url, attrs, shopperInsights })).replace(
    /\=+$/,
    ""
  );
}
