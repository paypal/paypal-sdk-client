/* eslint flowtype/require-valid-file-annotation: off, flowtype/require-return-type: off */

export const sdkClientTestGlobals = {
  __PORT__: 8000,
  __STAGE_HOST__: "sandbox.paypal.com",
  __HOST__: "test.paypal.com",
  __HOSTNAME__: "test.paypal.com",
  __SDK_HOST__: "test.paypal.com",
  __PATH__: "/sdk/js",

  __ENV__: "test",
  __VERSION__: "1.0.45",
  __CORRELATION_ID__: "abc123",
  __NAMESPACE__: "paypaltest",
  __PAYPAL_DOMAIN__: "mock://www.paypal.com",
  __PAYPAL_API_DOMAIN__: "mock://sandbox.paypal.com",
  __COMPONENTS__: ["buttons"],
  __DISABLE_SET_COOKIE__: true,
  __EXPERIMENTATION__: {
    __EXPERIENCE__: "1122",
    __TREATMENT__: "1234",
  },
};
