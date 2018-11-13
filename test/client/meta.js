/* @flow */

import { getSDKMeta } from '../../src';

import { TEST_SDK_URL } from './common';

describe(`meta cases`, () => {
    it('should successfully create a meta payload', () => {
        const meta = getSDKMeta();

        if (!meta) {
            throw new Error(`Expected meta string to be returned`);
        }

        let { url } = JSON.parse(window.atob(meta));

        if (url !== TEST_SDK_URL) {
            throw new Error(`Expected sdk url to be ${ TEST_SDK_URL }, got ${ url }`);
        }
    });
});
