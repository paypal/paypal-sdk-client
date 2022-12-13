import { SDK_SETTINGS } from "@paypal/sdk-constants/dist/esm";
import { base64encode, ATTRIBUTES } from "@krakenjs/belter/dist/esm";

import { getScriptUrl, getSDKAttributes } from "./script";

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
  const attrs = {};

  for (const attr of Object.keys(scriptAttrs)) {
    if (ALLOWED_ATTRS.includes(attr)) {
      // @ts-ignore
      attrs[attr] = scriptAttrs[attr as keyof typeof scriptAttrs];
    }
  }

  return base64encode(
    JSON.stringify({
      url,
      attrs,
    })
  ).replace(/\=+$/, ""); // eslint-disable-line no-useless-escape
}
