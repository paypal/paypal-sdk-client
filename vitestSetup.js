/* @flow */
import { sdkClientTestGlobals } from "./test/globals";

const applyEnvs = () => {
  Object.keys(sdkClientTestGlobals).forEach((k) => {
    // Skip crypto property as it cannot be directly assigned
    if (k !== "crypto") {
      window[k] = sdkClientTestGlobals[k];
    }
  });
};

applyEnvs();
