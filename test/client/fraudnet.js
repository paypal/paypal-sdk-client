/* @flow */
import { loadFraudnet } from "../../src/fraudnet";

describe("fraudnet.js", () => {
  describe("loadFraudnet()", () => {
    const fraudnetInputs = {
      env: "test",
      clientMetadataID: "test-cmid",
      cspNonce: "test-csp-nonce",
      timeout: 100,
      appName: "sdk-test",
      queryStringParams: {},
    };

    it("creates both scripts", async () => {
      loadFraudnet(fraudnetInputs);

      expect(document.createElement).toBeCalledWith("script");
    });
  });
});
