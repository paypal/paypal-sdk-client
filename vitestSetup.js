/* @flow */
import { sdkClientTestGlobals } from "./test/globals";

const applyEnvs = () => {
  Object.keys(sdkClientTestGlobals).forEach((k) => {
    const descriptor = Object.getOwnPropertyDescriptor(window, k);
    if (descriptor && !descriptor.writable && !descriptor.set) {
      Object.defineProperty(window, k, {
        value: sdkClientTestGlobals[k],
        writable: true,
        configurable: true,
      });
    } else {
      window[k] = sdkClientTestGlobals[k];
    }
  });
};

applyEnvs();
