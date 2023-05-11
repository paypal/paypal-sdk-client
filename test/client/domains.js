/* @flow */
import { ENV } from "@paypal/sdk-constants/src";

import { getPayPalDomainRegex } from "../../src";
import {
  getPayPalLoggerDomain,
  getAuthAPIUrl,
  getOrderAPIUrl,
} from "../../src/domains";

beforeEach(() => {
  window.__ENV__ = "test";
});

describe(`domains test`, () => {
  describe(`valid domains test`, () => {
    function assertValidDomain(domain) {
      it(`${domain} should successfully match as valid domain`, () => {
        if (!domain.match(getPayPalDomainRegex())) {
          throw new Error(`${domain} must match the regex`);
        }
      });
    }

    const validDomains = [
      "master.qa.paypal.com",
      "test-env.qa.paypal.com:3000",
      "geo.qa.paypal.com",
      "www.paypal.com:3080",
      "www.paypal.cn",
      "www.paypal.cn:3000",
      "www.mschina.qa.paypal.cn",
      "www.paypal.com",
      "www.venmo.com",
      "www.venmo.com:8000",
      "account.qa.venmo.com",
      "www.account.qa.venmo.com",
      "venmo.com",
      "id.venmo.com",
    ];

    for (const domain of validDomains) {
      assertValidDomain(domain);
    }
  });

  describe(`invalid domains test`, () => {
    function assertInValidDomain(domain) {
      it(`${domain} should not match as valid domain`, () => {
        if (domain.match(getPayPalDomainRegex())) {
          throw new Error(`${domain} must not match the regex`);
        }
      });
    }

    const invalidDomains = [
      "www.paypal.com.example.com",
      "www.paypal.cn.example.com",
      "www.example-paypal.com",
      "www.example-venmo.com",
      "example-venmo.com",
      "www.venmo-paypal.com",
      "venmo-paypal.com",
      "www.example-paypal.cn",
      "example-paypal.cn",
      "www.venmo.com.example.com",
      "venmo.com.example.com",
      "www.venmo.cn",
      "venmo.cn",
      "examplevenmo.com",
      "www.examplevenmo.com",
    ];
    for (const domain of invalidDomains) {
      assertInValidDomain(domain);
    }
  });

  it("getPayPalLoggerDomain should return the logger domain when is a local environment", () => {
    window.__ENV__ = ENV.LOCAL;
    const result = getPayPalLoggerDomain();

    if (result !== "https://mock://msmaster.qa.paypal.com") {
      throw new Error(
        `should get the logger domain "https://mock://msmaster.qa.paypal.com", but got: ${result}`
      );
    }
  });

  it("getPayPalLoggerDomain should thrown an Error when is a local environment and the stage host is undefined", () => {
    window.__ENV__ = ENV.LOCAL;
    window.__STAGE_HOST__ = undefined;
    try {
      getPayPalLoggerDomain();
    } catch (err) {
      if (err.message !== "No stage host found") {
        throw new Error(
          `should thrown exception with message "No stage host found", but got ${err.message}`
        );
      }
    }
    window.__STAGE_HOST__ = "mock://msmaster.qa.paypal.com";
  });

  it("getAuthAPIUrl should return a valid authentication string URL", () => {
    const url = new URL(getAuthAPIUrl()); // eslint-disable-line compat/compat

    if (
      `${url.protocol}//${url.hostname}` !== "http://localhost" ||
      url.pathname !== "/v1/oauth2/token"
    ) {
      throw new Error(
        `should get the logger domain "${window.location.protocol}//${
          window.location.host
        }/v1/oauth2/token", but got: ${url.toString()}`
      );
    }
  });

  it("getOrderAPIUrl should return a valid order string URL", () => {
    const url = new URL(getOrderAPIUrl()); // eslint-disable-line compat/compat

    if (
      `${url.protocol}//${url.hostname}` !== "http://localhost" ||
      url.pathname !== "/v2/checkout/orders"
    ) {
      throw new Error(
        `should get the logger domain "${window.location.protocol}//${
          window.location.host
        }/v2/checkout/orders", but got: ${url.toString()}`
      );
    }
  });
});
