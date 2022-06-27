/* @flow */

import { getSDKInitTime, setupLogger } from "../../src/tracking";

describe(`tracking cases`, () => {
  it("should throw an Error", async () => {
    const errorMessage = "SDK not initialized";
    /* eslint-disable import/no-unresolved */
    const { getSDKInitTime: getSDKInitTimeA } = await import(
      // $FlowFixMe
      "../../src/tracking?q=1"
    );
    /* eslint-enable */

    try {
      getSDKInitTimeA();
      throw new Error(`No exception launched`);
    } catch (err) {
      if (err.message !== errorMessage) {
        throw new Error(
          `should  get a valid Error message, instead got: ${err.message}`
        );
      }
    }
  });

  it("should find a saved Date instance", () => {
    try {
      Date.parse(getSDKInitTime().toString());
    } catch (err) {
      throw new Error(
        `should  get a valid Date instance, instead got an error: ${err.message}`
      );
    }
  });

  it("setupLogger should setup logger with IEIntranet enabled", () => {
    window.document.documentMode = true;
    setupLogger();
  });
});
