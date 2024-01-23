/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable spaced-comment */
/* eslint-disable import/no-default-export */
/// <reference types="vitest" />

/* @flow */
import { flowPlugin, esbuildFlowPlugin } from "@bunchtogether/vite-plugin-flow";
import { defineConfig } from "vite";

const define = {
  __DEBUG__: false,
  __TEST__: true,
  __WEB__: true,

  __SDK_HOST__: true,
  __PATH__: true,

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
};

// $FlowIssue
export default defineConfig({
  define,
  esbuild: {
    define,
  },
  test: {
    setupFiles: ["vitestSetup.js"],
    environment: "jsdom",
    clearMocks: true,
    include: ["**src/**/*.test.js", "**/server/**/*.test.js"],
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      include: ["src/**/*.js"],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildFlowPlugin()],
    },
  },
  // $FlowIssue
  plugins: [flowPlugin({ exclude: "" })],
});
