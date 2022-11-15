import { describe, it } from "vitest";

import {
  getStorageState,
  getStorageID,
  getSessionState,
  getClientMetadataID,
} from "../../src/session";
import { insertMockSDKScript } from "../../src/test";

describe("session cases", () => {
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
    const mockMerchantIds = "ids";
    insertMockSDKScript({
      attributes: {
        "data-client-metadata-id": mockMerchantIds,
      },
    });
    const result = getClientMetadataID();

    if (result !== mockMerchantIds) {
      throw new Error(`should get the storage id, but got ${String(result)}`);
    }
  });
});
