/* @flow */
/* eslint import/no-nodejs-modules: off */

import type { WebpackConfig } from 'grumbler-scripts/config/types';
import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { testGlobals } from './test/client/test-globals';

export const WEBPACK_CONFIG_TEST : WebpackConfig = getWebpackConfig({
    test:       true,
    vars:       {
        ...testGlobals
    }
});
