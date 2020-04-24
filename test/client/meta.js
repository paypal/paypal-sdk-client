/* @flow */

import { getSDKMeta, insertMockSDKScript } from '../../src';

describe(`meta cases`, () => {
    it('should successfully create a meta payload', () => {
        const expectedUrl = insertMockSDKScript({
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

        insertMockSDKScript({
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

        const { 'data-stage-host': stageHost } = JSON.parse(window.atob(meta));

        if (stageHost !== expectedStageHost) {
            throw new Error(`Expected sdk stage host to be ${ expectedStageHost }, got ${ stageHost }`);
        }
    });

    it('should successfully create a meta payload with a custom api stage host', () => {
        const expectedApiStageHost = 'api.bar.qa.paypal.com';

        insertMockSDKScript({
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

        const { 'data-api-stage-host': apiStageHost } = JSON.parse(window.atob(meta));

        if (apiStageHost !== expectedApiStageHost) {
            throw new Error(`Expected sdk api stage host to be ${ expectedApiStageHost }, got ${ apiStageHost }`);
        }
    });

    it('should successfully create a meta payload with merchant id', () => {
        const expectedMerchantIds = 'abcd1234, abcd5678';

        insertMockSDKScript({
            query: {
                'client-id':    'foobar',
                'merchant-id':  '*'
            },
            attributes: {
                'data-merchant-id': expectedMerchantIds
            }
        });

        const meta = getSDKMeta();

        if (!meta) {
            throw new Error(`Expected meta string to be returned`);
        }

        const { 'data-merchant-id': merchantIds } = JSON.parse(window.atob(meta));

        if (merchantIds !== expectedMerchantIds) {
            throw new Error(`Expected sdk merchant ids to be ${ expectedMerchantIds }, got ${ merchantIds }`);
        }
    });
});
