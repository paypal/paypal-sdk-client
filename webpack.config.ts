import { getWebpackConfig } from "@krakenjs/webpack-config-grumbler";
import { sdkClientTestGlobals } from "./test/globals";

export const WEBPACK_CONFIG_TEST = getWebpackConfig({
  entry: "./test/index.ts",
  test: true,
  vars: { ...sdkClientTestGlobals },
});

export default [WEBPACK_CONFIG_TEST];
