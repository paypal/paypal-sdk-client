/* @flow */

type TestGlobals = {|
  [string]: string | number | (() => string | (() => number)),
  __COMPONENTS__: $ReadOnlyArray<string>,
|};

export const sdkClientTestGlobals: TestGlobals = {
  __PORT__: 8000,
  __STAGE_HOST__: "msmaster.qa.paypal.com",
  __HOST__: "test.paypal.com",
  __HOSTNAME__: "test.paypal.com",
  __SDK_HOST__: "test.paypal.com",
  __PATH__: "/sdk/js",

  __VERSION__: "1.0.45",
  __CORRELATION_ID__: "abc123",
  __NAMESPACE__: "paypaltest",
  __PAYPAL_DOMAIN__: "mock://www.paypal.com",
  __PAYPAL_API_DOMAIN__: "mock://msmaster.qa.paypal.com",
  __PAYPAL_POPUP_DOMAIN__: "mock://history.paypal.com",
  __COMPONENTS__: ["buttons"],
};
