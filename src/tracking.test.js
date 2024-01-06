/* @flow */
import { describe, it, vi, expect } from "vitest";

import { getSDKInitTime, setupLogger } from "./tracking";

const clientId = "foobar123";
const mockScriptSrc = `https://test.paypal.com/sdk/js?client-id=${clientId}`;

function makeMockScriptElement(src = mockScriptSrc): HTMLCanvasElement {
  const mockElement = document.createElement("script");
  mockElement.setAttribute("src", src);
  // eslint-disable-next-line compat/compat
  document.body?.appendChild(mockElement);
  return mockElement;
}

vi.mock("@krakenjs/belter/src", async () => {
  const actual = await vi.importActual("@krakenjs/belter/src");
  return {
    ...actual,
    getCurrentScript: vi.fn(() => {
      return makeMockScriptElement();
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
