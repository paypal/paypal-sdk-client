/* @flow */

import { sdkClientTestGlobals } from "./test/globals";

Object.keys(sdkClientTestGlobals).forEach((k, v) => {
  window[k] = sdkClientTestGlobals[k];
});
