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

    it('should successfully create a meta payload with a custom stage host', () => {
        const expectedStageHost = 'foo.qa.paypal.com';

        createSDKScript({
            query: {
                'client-id': 'foobar'
            },
            attributes: {
                'data-stage-host': expectedStageHost
            }
        });

        const meta = getSDKMeta();

        if (!meta) {
            throw new Error(`Expected meta string to be returned`);
        }

        const { stageHost } = JSON.parse(window.atob(meta));

        if (stageHost !== expectedStageHost) {
            throw new Error(`Expected sdk stage host to be ${ expectedStageHost }, got ${ stageHost }`);
        }
    });

    it('should successfully create a meta payload with a custom api stage host', () => {
        const expectedApiStageHost = 'api.bar.qa.paypal.com';

        createSDKScript({
            query: {
                'client-id': 'foobar'
            },
            attributes: {
                'data-api-stage-host': expectedApiStageHost
            }
        });

        const meta = getSDKMeta();

        if (!meta) {
            throw new Error(`Expected meta string to be returned`);
        }

        const { apiStageHost } = JSON.parse(window.atob(meta));

        if (apiStageHost !== expectedApiStageHost) {
            throw new Error(`Expected sdk api stage host to be ${ expectedApiStageHost }, got ${ apiStageHost }`);
        }
    });
});
