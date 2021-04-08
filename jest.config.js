/* @flow */
import { sdkClientTestGlobals } from './test/globals';

/* eslint import/no-commonjs: off */
module.exports = {
    transformIgnorePatterns: [ 'node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)' ],
    globals:                 {
        ...sdkClientTestGlobals,
        __ENV__:   'test',
        __DEBUG__: false,
        __TEST__:  true,
        __WEB__:   false
    }
};
