/* @flow */
import { describe, it, afterEach, expect, vi } from "vitest";

import {
  getGlobalSessionName,
  getGlobalSessionID,
  setGlobalSessionID,
} from "./globalSession";

let storageState = {};
let storageExistsMock = vi.fn(() => true);

vi.mock("./global", async () => {
  const actual = await vi.importActual("./global");
  return {
    ...actual,
    getVersion: vi.fn(() => "5.0.500"),
  };
});

vi.mock("@krakenjs/belter/src", async () => {
  const actual = await vi.importActual("@krakenjs/belter/src");
  return {
    ...actual,
    getStorage: vi.fn(() => ({
      getState: (handler) => handler(storageState),
      checkIfStorageExists: () => storageExistsMock,
    })),
  };
});

describe("globalSession", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should generate the correct global session storage name", () => {
    const expectedName = "paypal_global_5_0_500";

    const name = getGlobalSessionName();

    expect(name).toBe(expectedName);
  });

  it("should return undefined if globalSessionID is not set", () => {
    const globalSessionID = getGlobalSessionID();

    expect(globalSessionID).toBeUndefined();
  });

  it("should set and get the globalSessionID", () => {
    const testID = "uid_123456";
    setGlobalSessionID(testID);

    const globalSessionID = getGlobalSessionID();

    expect(globalSessionID).toBe(testID);
  });

  it("should overwrite the globalSessionID if set multiple times", () => {
    const firstID = "uid_first";
    const secondID = "uid_second";

    setGlobalSessionID(firstID);
    setGlobalSessionID(secondID);
    const globalSessionID = getGlobalSessionID();

    expect(globalSessionID).toBe(secondID);
  });

  it("should handle setting globalSessionID to an empty string", () => {
    const emptyID = "";

    setGlobalSessionID(emptyID);
    const globalSessionID = getGlobalSessionID();

    expect(globalSessionID).toBe(emptyID);
  });

  it("should return undefined if state is not an object", () => {
    storageState = null;
    const globalSessionID = getGlobalSessionID();
    expect(globalSessionID).toBeUndefined();
  });

  it("should return undefined if storage does not exist", () => {
    storageExistsMock = vi.fn(() => false);
    const globalSessionID = getGlobalSessionID();
    expect(globalSessionID).toBeUndefined();
    storageExistsMock = vi.fn(() => true);
  });

  it("should return undefined if storage is undefined", async () => {
    const { getStorage } = await import("@krakenjs/belter/src");
    // $FlowFixMe
    getStorage.mockImplementation(({ name }) => undefined);
    const globalSessionID = getGlobalSessionID();
    expect(globalSessionID).toBeUndefined();
  });

  it("should return unknown version if getVersion returns null", async () => {
    const { getVersion } = await import("./global");
    // $FlowFixMe
    getVersion.mockImplementation(() => undefined);
    const name = getGlobalSessionName();
    expect(name).toBe("paypal_global_unknown");
  });
});
