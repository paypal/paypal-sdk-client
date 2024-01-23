/* @flow */
import { sdkClientTestGlobals } from "./test/globals";

const applyEnvs = () => {
  Object.keys(sdkClientTestGlobals).forEach((k) => {
    window[k] = sdkClientTestGlobals[k];
  });
};

applyEnvs();
