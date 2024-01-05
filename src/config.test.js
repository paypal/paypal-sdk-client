/* @flow */
import { describe, it, expect } from "vitest";

import {
  getPayPalLoggerDomain,
  buildPayPalUrl,
  buildPayPalAPIUrl,
  getPayPalLoggerUrl,
} from "./domains";

describe(`config cases`, () => {
  it("should successfully get the global paypal logger domain", () => {
    const expectedDomain = "mock://www.paypal.com";
    window.__PAYPAL_DOMAIN__ = expectedDomain;
    const domain = getPayPalLoggerDomain();
    expect(domain).toEqual(expectedDomain);
  });

  it("should successfully build a paypal url", () => {
    const expectedPayPalUrl = `${window.location.protocol}//${window.location.host}/foo/bar`;
    const result = buildPayPalUrl("/foo/bar");

    expect(result).toEqual(expectedPayPalUrl);
  });

  it("should successfully build a paypal api url", () => {
    const expectedPayPalUrl = `${window.location.protocol}//${window.location.host}/bar/baz`;
    const result = buildPayPalAPIUrl("/bar/baz");

    expect(result).toEqual(expectedPayPalUrl);
  });

  it("should successfully build a paypal logger url", () => {
    const expectedPayPalUrl = `${window.location.protocol}//${window.location.host}/xoplatform/logger/api/logger`;
    const result = getPayPalLoggerUrl();

    expect(result).toEqual(expectedPayPalUrl);
  });
});
