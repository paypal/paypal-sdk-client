/* @flow */
/* eslint import/no-nodejs-modules: off */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { testGlobals } from './test/client/test-globals';

export let WEBPACK_CONFIG_TEST = getWebpackConfig({
    test:       true,
    vars:       {
        ...testGlobals
    }
});
