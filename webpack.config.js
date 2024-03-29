/* @flow */
/* eslint import/no-nodejs-modules: off */
// $FlowIgnore
import type { WebpackConfig } from "@krakenjs/grumbler-scripts/config/types";
import { getWebpackConfig } from "@krakenjs/grumbler-scripts/config/webpack.config";

import { sdkClientTestGlobals } from "./test/globals";

export const WEBPACK_CONFIG_TEST: WebpackConfig = getWebpackConfig({
  test: true,
  vars: {
    ...sdkClientTestGlobals,
  },
});

// eslint-disable-next-line import/no-default-export
export default [WEBPACK_CONFIG_TEST];
