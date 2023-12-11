/* @flow */
import { beforeEach, describe, it, expect } from "vitest";

import { sdkClientTestGlobals } from "../globals";
import {
  getPayPalLoggerDomain,
  buildPayPalUrl,
  buildPayPalAPIUrl,
  getPayPalLoggerUrl,
} from "../../src";

beforeEach(() => {
  window.__ENV__ = "test";
  window.__PAYPAL_DOMAIN__ = sdkClientTestGlobals.__PAYPAL_DOMAIN__;
});

describe(`config cases`, () => {
  it("should successfully get the global paypal logger domain", () => {
    const domain = getPayPalLoggerDomain();
    expect(domain).toEqual(sdkClientTestGlobals.__PAYPAL_DOMAIN__);
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
