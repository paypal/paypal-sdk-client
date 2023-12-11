/* @flow */
import { vi } from "vitest";

import { sdkClientTestGlobals } from "./test/globals";

// TODO: Why can't we map? OR do we just delete ./test/globals?
// sdkClientTestGlobals.map((k, v) => {
//   window[k] = v
// })

window.__ENV__ = "test";
window.__PORT__ = 8000;
window.__STAGE_HOST__ = "sandbox.paypal.com";
window.__HOST__ = "test.paypal.com";
window.__HOSTNAME__ = "test.paypal.com";
window.__SDK_HOST__ = "test.paypal.com";
window.__PATH__ = "/sdk/js";
window.__VERSION__ = "1.0.45";
window.__CORRELATION_ID__ = "abc123";
window.__NAMESPACE__ = "paypaltest";
window.__PAYPAL_DOMAIN__ = "mock://www.paypal.com";
window.__PAYPAL_API_DOMAIN__ = "mock://sandbox.paypal.com";
window.__COMPONENTS__ = ["buttons"];
window.__DISABLE_SET_COOKIE__ = true;
window.__EXPERIMENTATION__ = {
  __EXPERIENCE__: "1122",
  __TREATMENT__: "1234",
};
