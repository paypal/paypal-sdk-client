/* @flow */
import { describe, it, afterEach, beforeEach, expect, vi } from "vitest";
import { getCurrentScript } from "@krakenjs/belter/src";

import {
  getStorageState,
  getStorageID,
  getSessionState,
  getClientMetadataID,
} from "../../src/session";
import { insertMockSDKScript } from "../../src/test";

const clientId = "foobar123";
const mockScriptSrc = `https://test.paypal.com/sdk/js?client-id=${clientId}`;

function makeMockScriptElement(src = mockScriptSrc) {
  const mockElement = document.createElement("script");
  mockElement.setAttribute("src", src);
  document.body.appendChild(mockElement);
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

describe("session cases", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("getStorageState", () => {
    const result = getStorageState((storage) => storage);

    if (!result.hasOwnProperty("id")) {
      throw new Error(`should get storage state object, but got ${result}`);
    }
  });

  it("getStorageID", () => {
    const result = getStorageID();

    if (typeof result !== "string") {
      throw new TypeError(`should get the storage id, but got ${result}`);
    }
  });

  it("getSessionState", () => {
    const result = getSessionState((state) => state);

    if (Object.entries(result).length > 0) {
      throw new Error(`should get an empty state object, but got ${result}`);
    }
  });

  it("getClientMetadataID", () => {
    const mockMerchantIds = "some-client-meta-data-id";
    // insertMockSDKScript({
    //   attributes: {
    //     "data-client-metadata-id": mockMerchantIds,
    //   },
    // });
    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute("data-client-metadata-id", mockMerchantIds);
    getCurrentScript.mockReturnValue(mockElement);

    const result = getClientMetadataID();
    expect(result).toEqual(mockMerchantIds);
    // if (result !== mockMerchantIds) {
    //   throw new Error(`should get the storage id, but got ${String(result)}`);
    // }
  });
});
