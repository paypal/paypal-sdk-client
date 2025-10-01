/* @flow */
import { afterEach, describe, it, vi } from "vitest";
import { memoize } from "@krakenjs/belter/src";

import {
  getPayPalSessionID,
  getPayPalSessionStorage,
  getPayPalStorageID,
} from "./paypalSession";

describe("payaplSession cases", () => {
  afterEach(() => {
    vi.clearAllMocks();
    memoize.clear();
  });

  it("should getStorageState", () => {
    const result = getPayPalSessionStorage();

    if (typeof result.getID() !== "string") {
      throw new TypeError(`should get storage state object, but got ${result}`);
    }
  });

  it("should getPayPalSessionID", () => {
    const id = getPayPalSessionID();

    if (typeof id !== "string") {
      throw new TypeError(
        `should get the session id, but got ${JSON.stringify(id)}`
      );
    }

    if (!id.startsWith("uid_")) {
      throw new TypeError(`session id should start with uid_ but got ${id}`);
    }
  });

  it("should getPayPalStorageID", () => {
    const id = getPayPalStorageID();

    if (typeof id !== "string") {
      throw new TypeError(
        `should get the storage id, but got ${JSON.stringify(id)}`
      );
    }

    if (!id.startsWith("uid_")) {
      throw new TypeError(`storage id should start with uid_ but got ${id}`);
    }
  });
});
