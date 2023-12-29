/* @flow */

import { sdkClientTestGlobals } from "./test/globals";

const applyEnvs = () => {
  Object.keys(sdkClientTestGlobals).forEach((k, v) => {
    window[k] = sdkClientTestGlobals[k];
  });
};

applyEnvs();
