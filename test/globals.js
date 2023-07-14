/* @flow */

type TestGlobals = {|
  [string]: string | number | boolean | (() => string | (() => number)),
  __COMPONENTS__: $ReadOnlyArray<string>,
|};

export const sdkClientTestGlobals: TestGlobals = {
  __PORT__: 8000,
  __STAGE_HOST__: "sandbox.paypal.com",
  __HOST__: "test.paypal.com",
  __HOSTNAME__: "test.paypal.com",
  __SDK_HOST__: "test.paypal.com",
  __PATH__: "/sdk/js",

  __VERSION__: "1.0.45",
  __CORRELATION_ID__: "abc123",
  __NAMESPACE__: "paypaltest",
  __PAYPAL_DOMAIN__: "mock://www.paypal.com",
  __PAYPAL_API_DOMAIN__: "mock://sandbox.paypal.com",
  __COMPONENTS__: ["buttons"],
  __DISABLE_SET_COOKIE__: true,
};
