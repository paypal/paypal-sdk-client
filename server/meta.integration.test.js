/* @flow */

import cheerio from "cheerio";
import { test } from "vitest";

import { unpackSDKMeta } from ".";

/**
 * List with real URL query parameters.
 * Each value is a tuple with the URL parameters and attributes
 * The values for all the keys should be a string.
 */
const sdkMetaList = [
  [
    {
      url: "https://www.paypal.com/sdk/js?",
      "client-id":
        "AQbghYd-7mRPyimEriYScIgTnYUsLnr5wVnPnmfPaSzwKrUe3qNzfEc5hXr9Ucf_JG_HFAZpJMJYXMuk",
      "merchant-id": "K2US3FE3PQUEQ",
      intent: "capture",
      locale: "it_IT",
      components: "buttons,funding-eligibility,messages",
      commit: "false",
      currency: "EUR",
    },
    {
      attrs: {
        "data-partner-attribution-id": "WooThemes_EC",
        "data-uid": "uid_gwakesmdhfvakwylnuczrbplzdthxe",
      },
    },
  ],
  [
    {
      url: "https://www.paypal.com/sdk/js?",
      "client-id":
        "AfjD8CKlCiagY3OXl46F4HJKHIP7k2wRU3UDfMSuo52DBiXuc0srow-uyWGeHT0EXd67zADzzkm-5eoy",
      components: "buttons",
      currency: "GBP",
      intent: "authorize",
      locale: "en_GB",
      "merchant-id": "ASCDJ8AE36AYQ",
    },
    {
      attrs: {
        "data-amount": "7.99",
        "data-uid": "uid_issqwuttcumomcdjzbomwiprpnsgjx",
      },
    },
  ],
  [
    {
      url: "https://www.paypal.com/sdk/js?",
      "client-id":
        "AebICI1y5FXWLTk3MHJ-I8g9_lUMlpxf6AP95fnbdtx3WQQFKpMFBP0KsEzeYQAE4GeQ18DlVxvw1qQ9",
      commit: "false",
      currency: "USD",
      components: "buttons,funding-eligibility",
      "merchant-id": "VWPTBSYGC33KJ",
    },
    {
      attrs: {
        "data-partner-attribution-id": "WIX_SP_EC",
        "data-uid": "uid_gsgwcqyaamrhxpucosxljrmoppaadh",
      },
    },
  ],
  [
    {
      url: "https://www.paypal.com/sdk/js?",
      "client-id":
        "AebICI1y5FXWLTk3MHJ-I8g9_lUMlpxf6AP95fnbdtx3WQQFKpMFBP0KsEzeYQAE4GeQ18DlVxvw1qQ9",
      commit: "false",
      currency: "EUR",
      components: "buttons,funding-eligibility",
      "merchant-id": "HG62CLUW5KYW2",
    },
    {
      attrs: {
        "data-partner-attribution-id": "WIX_SP_EC",
        "data-uid": "uid_gsgwcqyaamrhxpucosxljrmoppaadh",
      },
    },
  ],
  [
    {
      url: "https://www.paypal.com/sdk/js?",
      "client-id":
        "AfjD8CKlCiagY3OXl46F4HJKHIP7k2wRU3UDfMSuo52DBiXuc0srow-uyWGeHT0EXd67zADzzkm-5eoy",
      components: "buttons",
      currency: "GBP",
      intent: "authorize",
      locale: "en_GB",
      "merchant-id": "ASCDJ8AE36AYQ",
    },
    {
      attrs: {
        "data-amount": "57.00",
        "data-uid": "uid_ssqwuttcumomcdjzbomwijromscjzs",
      },
    },
  ],
  [
    {
      url: "https://www.paypal.com/sdk/js?",
      "client-id":
        "AfjD8CKlCiagY3OXl46F4HJKHIP7k2wRU3UDfMSuo52DBiXuc0srow-uyWGeHT0EXd67zADzzkm-5eoy",
      components: "buttons",
      currency: "EUR",
      intent: "authorize",
      locale: "de_DE",
      "merchant-id": "3PA5M5QDS5BES",
    },
    {
      attrs: {
        "data-amount": "29.90",
        "data-uid": "uid_ssqwuttcumomcdjzbomwiakaomcjzs",
      },
    },
  ],
  [
    {
      url: "https://www.paypal.com/web-sdk/v6/bridge?",
      origin: "https://www.whiterabbitvintagemarket.com",
      version: "6.4.1",
      "payment-flow": "popup",
      debug: "false",
    },
    // no attributes
    {},
  ],
];

// $FlowIgnore[prop-missing] missing each property for test
test.each(sdkMetaList)(
  "should unpack `sdkMeta` and load the script",
  (queryParamsSource, attributes) => {
    const { url, ...queryParams } = queryParamsSource;
    // eslint-disable-next-line compat/compat
    const encodeQueryParams = new URLSearchParams(queryParams).toString();
    const sourceData = { url: `${url}${encodeQueryParams}`, ...attributes };
    const { getSDKLoader } = unpackSDKMeta(
      Buffer.from(JSON.stringify(sourceData)).toString("base64")
    );

    const $ = cheerio.load(getSDKLoader());
    const src = $("script").attr("src");

    if (sourceData.url !== src) {
      throw new Error("The url should be the same");
    }
  }
);
