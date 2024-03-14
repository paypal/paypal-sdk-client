/* @flow */
/* eslint-disable promise/no-native, no-restricted-globals, compat/compat */
import { describe, it, vi, expect } from "vitest";

import { makeMockScriptElement } from "../test/helpers";

import { getSDKInitTime, setupLogger } from "./tracking";

const clientId = "foobar123";
const mockScriptSrc = `https://test.paypal.com/sdk/js?client-id=${clientId}`;

let metricCounterSpy;
let windowReadyPromiseResolver;
vi.mock("./logger", async () => {
  const actual = await vi.importActual("./logger");
  return {
    ...actual,
    getLogger: vi.fn(() => {
      const logger = actual.getLogger();
      metricCounterSpy = vi
        .spyOn(logger, "metricCounter")
        .mockImplementation(() => {}); // eslint-disable-line no-empty-function
      return logger;
    }),
  };
});
vi.mock("@krakenjs/belter/src", async () => {
  const actual = await vi.importActual("@krakenjs/belter/src");

  return {
    ...actual,
    getCurrentScript: vi.fn(() => {
      return makeMockScriptElement(mockScriptSrc);
    }),
    waitForWindowReady: vi.fn(() => {
      return new Promise((resolve) => {
        windowReadyPromiseResolver = resolve;
      });
    }),
  };
});

describe(`tracking cases`, () => {
  it("should throw an Error", () => {
    const errorMessage = "SDK not initialized";
    expect(getSDKInitTime).toThrow(errorMessage);
  });

  it("should find a saved Date instance", () => {
    setupLogger();
    expect(getSDKInitTime()).toEqual(expect.any(Number));
  });

  it("setupLogger should setup logger with IEIntranet enabled", () => {
    window.document.documentMode = true;
    setupLogger();
  });

  it("should call metric counter on window load", async () => {
    windowReadyPromiseResolver();
    await new Promise((resolve) => setTimeout(resolve)); // Flush promises

    expect(metricCounterSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        namespace: "sdk_client.init.count",
        dimensions: expect.objectContaining({
          isPayPalDomain: "false",
        }),
      })
    );
  });
});

/* eslint-enable promise/no-native, no-restricted-globals, compat/compat */
