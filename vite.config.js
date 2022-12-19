import { defineConfig } from "vite";

// Configure Vitest (https://vitest.dev/config/)
import path from "path";
// import { defineConfig } from "vite";

// import { sdkClientTestGlobals } from "./test/globals";

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

// $FlowIssue
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "sdk-client",
      fileName: (format) => `sdk-client.${format}.js`,
      formats: ["es", "umd"],
    },
    sourcemap: true,
    rollupOptions: {
      ouput: {
        preserveModules: true,
      },
    },
  },
  esbuild: {
    define,
  },
  define,
  test: {
    // environment: "jsdom",
    // setupFiles: ["vitestSetup.js"],
    include: ["./test/**/*.test.ts"],
    deps: {
      inline: ["@krakenjs/post-robot"],
    },
    globals: true,
  },
});
