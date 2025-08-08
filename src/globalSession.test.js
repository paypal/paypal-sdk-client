/* @flow */
import { describe, it, afterEach, expect, vi } from "vitest";

import {
  getGlobalSessionName,
  getGlobalSessionID,
  setGlobalSessionID,
} from "./globalSession";

let storageState = {};

vi.mock("@krakenjs/belter/src", async () => {
  const actual = await vi.importActual("@krakenjs/belter/src");
  return {
    ...actual,
    getStorage: vi.fn(() => ({
      getState: (handler) => handler(storageState),
    })),
  };
});

vi.mock("./global", async () => {
  const actual = await vi.importActual("./global");
  return {
    ...actual,
    getVersion: vi.fn(() => "5.0.500"),
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

  it("should warn if state is not an object when setting globalSessionID", async () => {
    const logger = await import("./logger");
    storageState = null;
    const warnSpy = vi.spyOn(logger, "getLogger").mockReturnValue({
      warn: vi.fn(),
    });

    setGlobalSessionID("uid_error");

    expect(warnSpy().warn).toHaveBeenCalledWith(
      "global_session_no_storage_state_found"
    );
  });

  it("should warn if version is not defined", async () => {
    const { getLogger } = await import("./logger");
    const { getVersion } = await import("./global");

    getVersion.mockImplementation(() => undefined);
    const warnSpy = getLogger.mockReturnValue({
      warn: vi.fn(),
    });

    getGlobalSessionName();

    expect(warnSpy().warn).toHaveBeenCalledWith(
      "global_session_no_sdk_version"
    );
  });

  it("should warn if global session is not found", async () => {
    const { getLogger } = await import("./logger");
    const warnSpy = getLogger.mockReturnValue({
      warn: vi.fn(),
    });

    storageState = null;
    getGlobalSessionID();

    expect(warnSpy().warn).toHaveBeenCalledWith("global_session_not_found");
  });
});
