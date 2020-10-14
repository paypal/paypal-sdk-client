/* @flow */
/* eslint import/no-nodejs-modules: off */

import type { WebpackConfig } from 'grumbler-scripts/config/types';
import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { sdkClientTestGlobals } from './test/globals';

export const WEBPACK_CONFIG_TEST : WebpackConfig = getWebpackConfig({
    test:       true,
    vars:       {
        ...sdkClientTestGlobals
    }
});
