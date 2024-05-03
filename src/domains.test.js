/* @flow */
import { ENV } from "@paypal/sdk-constants/src";
import { describe, it, expect } from "vitest";

import {
  getAuthAPIUrl,
  getOrderAPIUrl,
  getPayPalDomainRegex,
  getVenmoDomainRegex,
  isPayPalTrustedDomain,
} from "./domains";

describe(`domains test`, () => {
  it("should successfully match valid paypal domain", () => {
    const validDomains = [
      "master.qa.paypal.com",
      "test-env.qa.paypal.com:3000",
      "geo.qa.paypal.com",
      "www.paypal.com:3080",
      "www.paypal.cn",
      "www.paypal.cn:3000",
      "www.mschina.qa.paypal.cn",
      "www.paypal.com",
    ];

    for (const domain of validDomains) {
      expect(domain).toMatch(getPayPalDomainRegex());
    }
  });

  it("should not match invalid paypal domains", () => {
    const invalidDomains = [
      "www.paypal.com.example.com",
      "www.paypal.cn.example.com",
    ];

    for (const domain of invalidDomains) {
      expect(domain).not.toMatch(getPayPalDomainRegex());
    }
  });

  it("should successfully match valid venmo domain", () => {
    const validDomains = [
      "https://venmo.com",
      "http://www.venmo.com",
      "https://id.venmo.com",
      "http://www.venmo.com:8000",
      "https://account.qa.venmo.com",
      "http://www.account.qa.venmo.com",
      "https://account.qa.venmo.com",
      "https://account.venmo.com",
    ];

    for (const domain of validDomains) {
      expect(domain).toMatch(getVenmoDomainRegex());
    }
  });

  it("should successfully match valid venmo testing domain", () => {
    window.__ENV__ = "local";
    const domain = "https://localhost.venmo.com";

    expect(domain).toMatch(getVenmoDomainRegex());
  });

  it("should not match invalid venmo domains", () => {
    const invalidDomains = [
      "https://www.venmo.com.example.com",
      "https://www.venmo.cn.example.com",
      "http://www.venmo.com.example.com",
      "http://www.venmo.cn.example.com",
      "http://www.example.com",
      "https://www.example.com",
      "https://venmo.com.example.com",
      "https://venmo.cn.example.com",
      "http://venmo.com.example.com",
      "http://venmo.cn.example.com",
    ];

    for (const domain of invalidDomains) {
      expect(domain).not.toMatch(getVenmoDomainRegex());
    }
  });

  it("isPayPalTrustedDomain should return true", () => {
    window.__ENV__ = ENV.LOCAL;
    const result = isPayPalTrustedDomain();

    expect(result).toBe(true);
  });

  it("getAuthAPIUrl should return a valid authentication string URL", () => {
    const url = new URL(getAuthAPIUrl()); // eslint-disable-line compat/compat
    const baseUrl = `${url.protocol}//${url.hostname}`;
    expect(baseUrl).toEqual("http://localhost");
    expect(url.pathname).toEqual("/v1/oauth2/token");
  });

  it("getOrderAPIUrl should return a valid order string URL", () => {
    const url = new URL(getOrderAPIUrl()); // eslint-disable-line compat/compat

    const baseUrl = `${url.protocol}//${url.hostname}`;
    expect(baseUrl).toEqual("http://localhost");
    expect(url.pathname).toEqual("/v2/checkout/orders");
  });
});
