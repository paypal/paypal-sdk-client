/* @flow */

import { getSDKMeta } from '../../src';

import { createSDKScript } from './common';

describe(`meta cases`, () => {
    it('should successfully create a meta payload', () => {
        const expectedUrl = createSDKScript({
            query: {
                'client-id': 'foobar'
            }
        });

        const meta = getSDKMeta();

        if (!meta) {
            throw new Error(`Expected meta string to be returned`);
        }

        const { url } = JSON.parse(window.atob(meta));

        if (url !== expectedUrl) {
            throw new Error(`Expected sdk url to be ${ expectedUrl }, got ${ url }`);
        }
    });
});
