import { describe, it, afterEach, expect, vi } from "vitest";
import {
  getGlobalSessionName,
  getGlobalSessionID,
  setGlobalSessionID,
} from "./globalSession";
import { getVersion } from "./global";

vi.mock("@krakenjs/belter/src", async () => {
  const actual = await vi.importActual("@krakenjs/belter/src");
  let storageState = {};
  return {
    ...actual,
    getStorage: vi.fn(() => ({
      getState: (handler) => handler(storageState),
      setState: (newState) => {
        storageState = { ...storageState, ...newState };
      },
    })),
  };
});

vi.mock("./global", () => ({
  getVersion: vi.fn(() => "5.0.500"),
}));

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
    const sessionID = getGlobalSessionID();

    expect(sessionID).toBeUndefined();
  });

  it("should set and get the globalSessionID", () => {
    const testID = "uid_123456";
    setGlobalSessionID(testID);

    const sessionID = getGlobalSessionID();

    expect(sessionID).toBe(testID);
  });

  it("should overwrite the globalSessionID if set multiple times", () => {
    const firstID = "uid_first";
    const secondID = "uid_second";

    setGlobalSessionID(firstID);
    setGlobalSessionID(secondID);
    const sessionID = getGlobalSessionID();

    expect(sessionID).toBe(secondID);
  });

  it("should handle setting globalSessionID to an empty string", () => {
    const emptyID = "";

    setGlobalSessionID(emptyID);
    const sessionID = getGlobalSessionID();

    expect(sessionID).toBe(emptyID);
  });
});
