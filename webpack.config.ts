/* eslint import/no-nodejs-modules: off, import/no-default-export: off */
import type { WebpackConfig } from "@krakenjs/webpack-config-grumbler/index.flow";
import { getWebpackConfig } from "@krakenjs/webpack-config-grumbler";
import { sdkClientTestGlobals } from "./test/globals";

export const WEBPACK_CONFIG_TEST: typeof WebpackConfig = getWebpackConfig({
  entry: "./src/index.ts",
  test: true,
  vars: { ...sdkClientTestGlobals },
});
