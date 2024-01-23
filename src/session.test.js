/* @flow */
import { describe, it, afterEach, expect, vi } from "vitest";
import { getCurrentScript, memoize, getStorage } from "@krakenjs/belter/src";

import { makeMockScriptElement } from "../test/helpers";

import {
  getStorageState,
  getStorageID,
  getSessionState,
  getClientMetadataID,
  getSDKStorage,
} from "./session";

const clientId = "foobar123";
const mockScriptSrc = `https://test.paypal.com/sdk/js?client-id=${clientId}`;

vi.mock("@krakenjs/belter/src", async () => {
  const actual = await vi.importActual("@krakenjs/belter/src");
  return {
    ...actual,
    getCurrentScript: vi.fn(() => {
      return makeMockScriptElement(mockScriptSrc);
    }),
    getStorage: vi.fn((args) => actual.getStorage(args)),
  };
});

describe("session cases", () => {
  afterEach(() => {
    vi.clearAllMocks();
    memoize.clear();
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
    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute("data-client-metadata-id", mockMerchantIds);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    const result = getClientMetadataID();
    expect(result).toEqual(mockMerchantIds);
  });

  it("uses getStorage to retrieve the storage", () => {
    // // $FlowIgnore
    // getStorage = vi.fn();
    getSDKStorage();

    expect(getStorage).toBeCalledWith({
      name: expect.any(String),
      stickySessionId: expect.any(String),
    });
  });
});
