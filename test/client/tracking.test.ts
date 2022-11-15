import { describe, it } from "vitest";

import { getSDKInitTime, setupLogger } from "../../src/tracking";

describe(`tracking cases`, () => {
  it("should throw an Error", async () => {
    const errorMessage = "SDK not initialized";

    const { getSDKInitTime: getSDKInitTimeA } = await import(
      // $FlowFixMe
      "../../src/tracking?q=1" as any
    );

    /* eslint-enable */
    try {
      getSDKInitTimeA();
      throw new Error(`No exception launched`);
    } catch (err) {
      if ((err as Error).message !== errorMessage) {
        throw new Error(
          `should  get a valid Error message, instead got: ${
            (err as Error).message
          }`
        );
      }
    }
  });
  it("should find a saved Date instance", () => {
    try {
      Date.parse(getSDKInitTime().toString());
    } catch (err) {
      throw new Error(
        `should  get a valid Date instance, instead got an error: ${
          (err as Error).message
        }`
      );
    }
  });
  it("setupLogger should setup logger with IEIntranet enabled", () => {
    (<any>window.document).documentMode = true;
    setupLogger();
  });
});
