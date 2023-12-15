/* @flow */
import { beforeEach, describe, it, expect, vi } from "vitest";

import { loadFraudnet, createConfigScript } from "../../src/fraudnet";
import { FRAUDNET_FNCLS } from "../../src/constants";

describe("fraudnet.js", () => {
  // const mockElement = document.createElement("script")
  // mockElement.setAttribute = vi.fn()
  // mockElement.text = ""

  const actual = document.createElement("script");
  const createElementSpy = vi
    .spyOn(document, "createElement")
    .mockImplementation(() => actual);
  const appendChildSpy = vi.spyOn(document.body, "appendChild");
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const fraudnetInputs = {
    env: "test",
    clientMetadataID: "test-cmid",
    cspNonce: "test-csp-nonce",
    timeout: 100,
    appName: "sdk-test",
    // queryStringParams: {},
  };
  describe.skip("loadFraudnet()", () => {
    it("creates both scripts", async () => {
      loadFraudnet(fraudnetInputs);

      expect(document.createElement).toBeCalledWith("script");
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
    it("sets up the fraudnet script properly", async () => {
      await createFraudnetScript(fraudnetInputs);
    });
  });
});
