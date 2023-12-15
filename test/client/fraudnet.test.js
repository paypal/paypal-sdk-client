/* @flow */
import { beforeEach, describe, it, expect, vi } from "vitest";
import { memoize } from "@krakenjs/belter/src";

import {
  loadFraudnet,
  createConfigScript,
  createFraudnetScript,
} from "../../src/fraudnet";
import { FRAUDNET_FNCLS, FRAUDNET_URL } from "../../src/constants";
import { getLogger } from "../../src/logger";

vi.mock("../../src/logger", () => {
  return {
    getLogger: vi.fn(() => ({
      metric: vi.fn().mockReturnThis(),
      error: vi.fn().mockReturnThis(),
      track: vi.fn().mockReturnThis(),
      flush: vi.fn().mockReturnThis(),
      warn: vi.fn().mockReturnThis(),
    })),
  };
});

describe("fraudnet.js", () => {
  const actual = document.createElement("script");
  const createElementSpy = vi
    .spyOn(document, "createElement")
    .mockImplementation(() => actual);
  const appendChildSpy = vi.spyOn(document.body, "appendChild");

  beforeEach(() => {
    vi.clearAllMocks();
    memoize.clear();
  });

  const fraudnetInputs = {
    env: "test",
    clientMetadataID: "test-cmid",
    cspNonce: "test-csp-nonce",
    timeout: 100,
    appName: "sdk-test",
    // queryStringParams: {},
  };
  describe("loadFraudnet()", () => {
    window.PAYPAL = {
      asyncData: {
        collect: vi.fn().mockResolvedValue(),
      },
    };
    beforeEach(() => {
      actual.addEventListener = vi.fn((event, cb) => {
        if (event === "load") {
          cb();
        }
      });
    });

    it("creates both scripts", async () => {
      loadFraudnet(fraudnetInputs);

      expect(document.createElement).toBeCalledTimes(2);
    });

    it("should be memoized and thus cache subsequent calls", async () => {
      loadFraudnet(fraudnetInputs);
      loadFraudnet(fraudnetInputs);

      // once for createConfigScript, another for createFraudnetScript
      expect(createElementSpy).toBeCalledTimes(2);
    });

    it("returns collect function", async () => {
      const result = loadFraudnet(fraudnetInputs);
      expect(result).toEqual({ collect: expect.any(Function) });
    });

    it("collect function calls fraudnet collect", async () => {
      const mockCollect = vi.fn().mockResolvedValue();
      window.PAYPAL.asyncData.collect = mockCollect;
      const { collect } = loadFraudnet(fraudnetInputs);
      await collect();
      expect(mockCollect).toBeCalled();
    });

    it("should log and suppress the error if collect fails", async () => {
      const warnMock = vi.fn();
      getLogger.mockReturnValue({ warn: warnMock });

      const mockCollect = vi.fn().mockRejectedValue("fraudnet collect fail");
      window.PAYPAL.asyncData.collect = mockCollect;

      const { collect } = loadFraudnet(fraudnetInputs);

      await expect(collect).not.toThrow();
      // TODO: Hm, why can't I get the dang thing to get the right pointer?
      expect(getLogger().warn).toBeCalled();
    });
  });

  describe("createConfigScript", () => {
    it("sets up the config script properly", async () => {
      const inputs = {
        env: "test",
        cspNonce: "test-nonce",
        clientMetadataID: "test-cmid",
        appName: "local-test-connect",
      };
      const expectedText = {
        f: inputs.clientMetadataID,
        s: inputs.appName,
        io: true,
        cb1: "fnCallback",
      };

      await createConfigScript(inputs);

      expect(createElementSpy).toBeCalledWith("script");
      expect(actual.getAttribute("nonce")).toEqual(inputs.cspNonce);
      expect(actual.getAttribute("type")).toEqual("application/json");
      expect(actual.getAttribute("id")).toEqual("fconfig");
      expect(actual.getAttribute("fncls")).toEqual(FRAUDNET_FNCLS);
      expect(actual.text).toEqual(JSON.stringify(expectedText));
      expect(appendChildSpy).toBeCalledWith(actual);
    });
  });

  describe("createFraudnetScript()", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    const inputs = {
      env: "test",
      cspNonce: "test-nonce",
    };

    it("sets up the fraudnet script properly", async () => {
      actual.addEventListener = vi.fn((event, cb) => {
        if (event === "load") {
          cb();
        }
      });

      await createFraudnetScript(inputs);

      expect(createElementSpy).toBeCalledWith("script");
      expect(actual.getAttribute("nonce")).toEqual(inputs.cspNonce);
      expect(actual.getAttribute("src")).toEqual(FRAUDNET_URL[inputs.env]);
      expect(appendChildSpy).toBeCalledWith(actual);
    });

    it("rejects if loading errors out", async () => {
      actual.addEventListener = vi.fn((event, cb) => {
        if (event === "error") {
          cb(event);
        }
      });

      await expect(() => createFraudnetScript(inputs)).rejects.toThrow(
        "Fraudnet failed to load."
      );
    });

    it("rejects if loading aborts", async () => {
      actual.addEventListener = vi.fn((event, cb) => {
        if (event === "abort") {
          cb(event);
        }
      });

      await expect(() => createFraudnetScript(inputs)).rejects.toThrow(
        "Fraudnet load was aborted."
      );
    });
  });
});
