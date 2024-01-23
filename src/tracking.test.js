/* @flow */
import { describe, it, vi, expect } from "vitest";

import { makeMockScriptElement } from "../test/helpers";

import { getSDKInitTime, setupLogger } from "./tracking";

const clientId = "foobar123";
const mockScriptSrc = `https://test.paypal.com/sdk/js?client-id=${clientId}`;

vi.mock("@krakenjs/belter/src", async () => {
  const actual = await vi.importActual("@krakenjs/belter/src");
  return {
    ...actual,
    getCurrentScript: vi.fn(() => {
      return makeMockScriptElement(mockScriptSrc);
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
});
