/* eslint-disable spaced-comment */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import path from "path";

import { flowPlugin, esbuildFlowPlugin } from "@bunchtogether/vite-plugin-flow";
import { defineConfig } from "vite";

const define = {
  __DEBUG__: false,
  __TEST__: true,
  __WEB__: true,

  // __PORT__: 8000,
  // __STAGE_HOST__: "msmaster.qa.paypal.com",
  // __HOST__: "test.paypal.com",
  // __HOSTNAME__: "test.paypal.com",
  __SDK_HOST__: true,
  __PATH__: true,

  // __VERSION__: "1.0.45",
  // __CORRELATION_ID__: "abc123",
  // __NAMESPACE__: "paypaltest",
  __PAYPAL_DOMAIN__: true,
  __PAYPAL_API_DOMAIN__: true,

  __POST_ROBOT__: JSON.stringify({
    __GLOBAL_KEY__: `__post_robot__`,
    __AUTO_SETUP__: false,
    __IE_POPUP_SUPPORT__: false,
    __GLOBAL_MESSAGE_SUPPORT__: true,
    __SCRIPT_NAMESPACE__: false,
  }),
  __PAYPAL_CHECKOUT__: JSON.stringify({
    _MAJOR_VERSION__: "",
    __MINOR_VERSION__: "",
  }),
  // ...sdkClientTestGlobals,
};

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  define,
  esbuild: {
    define,
  },
  test: {
    environment: "jsdom",
    clearMocks: true,
    include: ["**/test/**/*.test.js"],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildFlowPlugin()],
    },
  },
  plugins: [flowPlugin({ exclude: "" })],
});
