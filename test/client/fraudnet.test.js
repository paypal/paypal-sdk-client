/* @flow */
import { beforeEach, describe, it, expect, vi } from "vitest";
import { memoize } from "@krakenjs/belter/src";

import {
  loadFraudnet,
  createConfigScript,
  createFraudnetScript,
} from "../../src/fraudnet";
import { FRAUDNET_FNCLS, FRAUDNET_URL } from "../../src/constants";
import * as logger from "../../src/logger";

vi.spyOn(logger, "getLogger");

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
      // $FlowIgnore
      actual.addEventListener = vi.fn((event, cb) => {
        if (event === "load") {
          cb();
        }
      });
    });

    it("creates both scripts", () => {
      loadFraudnet(fraudnetInputs);
      // $FlowIgnore
      expect(document.createElement).toBeCalledTimes(2);
    });

    it("should be memoized and thus cache subsequent calls", () => {
      loadFraudnet(fraudnetInputs);
      loadFraudnet(fraudnetInputs);

      // once for createConfigScript, another for createFraudnetScript
      expect(createElementSpy).toBeCalledTimes(2);
    });

    it("returns collect function", () => {
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

    it("should suppress the error if collect fails", async () => {
      const mockCollect = vi.fn().mockRejectedValue("fraudnet collect fail");
      window.PAYPAL.asyncData.collect = mockCollect;

      const { collect } = loadFraudnet(fraudnetInputs);

      await expect(collect).not.toThrow();
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
      // $FlowIgnore
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
      // $FlowIgnore
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
      // $FlowIgnore
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
