import { ENV } from "@paypal/sdk-constants/src";
import { beforeEach, describe, it } from "vitest";

import { getPayPalDomainRegex } from "../../src";
import {
  getPayPalLoggerDomain,
  getAuthAPIUrl,
  getOrderAPIUrl,
} from "../../src/domains";

beforeEach(() => {
  (<any>window).__ENV__ = "test";
});
describe(`domains test`, () => {
  it("should successfully match valid domain", () => {
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
      if (!domain.match(getPayPalDomainRegex())) {
        throw new Error(`${domain} must match the regex`);
      }
    }
  });
  it("should not match invalid domains", () => {
    const invalidDomains = [
      "www.paypal.com.example.com",
      "www.paypal.cn.example.com",
    ];

    for (const domain of invalidDomains) {
      if (domain.match(getPayPalDomainRegex())) {
        throw new Error(`${domain} must not match the regex`);
      }
    }
  });
  it("getPayPalLoggerDomain should return the logger domain when is a local environment", () => {
    (<any>window).__ENV__ = ENV.LOCAL;
    const result = getPayPalLoggerDomain();

    if (result !== "https://mock://msmaster.qa.paypal.com") {
      throw new Error(
        `should get the logger domain "https://mock://msmaster.qa.paypal.com", but got: ${result}`
      );
    }
  });
  it("getPayPalLoggerDomain should thrown an Error when is a local environment and the stage host is undefined", () => {
    (<any>window).__ENV__ = ENV.LOCAL;
    (<any>window).__STAGE_HOST__ = undefined;

    try {
      getPayPalLoggerDomain();
    } catch (err) {
      if ((err as Error).message !== "No stage host found") {
        throw new Error(
          `should thrown exception with message "No stage host found", but got ${
            (err as Error).message
          }`
        );
      }
    }

    (<any>window).__STAGE_HOST__ = "mock://msmaster.qa.paypal.com";
  });
  it("getAuthAPIUrl should return a valid authentication string URL", () => {
    const url = new URL(getAuthAPIUrl());

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
    const url = new URL(getOrderAPIUrl());

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
