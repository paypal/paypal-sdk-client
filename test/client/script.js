/* @flow */

import { base64encode } from 'belter/src';

import { getClientID, getIntent, getCurrency, getVault, getCommit, getClientToken, getPartnerAttributionID,
    getMerchantID, getStageHost, getAPIStageHost, getClientAccessToken, getSDKIntegrationSource, insertMockSDKScript, getPageType } from '../../src';

describe(`script cases`, () => {
    it('should successfully get a client id', () => {
        const clientID = 'foobar123';

        const url = insertMockSDKScript({
            query: {
                'client-id': clientID
            }
        });

        if (clientID !== getClientID()) {
            throw new Error(`Expected client id to be ${ clientID }, got ${ getClientID() } from ${ url }`);
        }
    });

    it('should error out when client id not passed', () => {

        let error;
        
        insertMockSDKScript({
            query: {
                'client-id': ''
            }
        });

        try {
            getClientID();
        } catch (err) {
            error = err;
        }

        if (!error) {
            throw new Error(`Expected error to be thrown`);
        }
    });

    it('should successfully get a client id alias', () => {
        const clientID = 'sb';

        const url = insertMockSDKScript({
            query: {
                'client-id': clientID
            }
        });

        if (clientID === getClientID()) {
            throw new Error(`Expected client id to not be ${ clientID }, got ${ url }`);
        }
    });

    it('should successfully get a merchant id', () => {
        const merchantID = 'abc987';
        const url = insertMockSDKScript({
            query: {
                'merchant-id': merchantID
            }
        });

        const mID = getMerchantID();

        if (merchantID !== (mID && mID[0])) {
            throw new Error(`Expected merchant id to be ${ merchantID }, got ${ (mID && mID[0]) || 'undefined' } from ${ url }`);
        }
    });

    it('should error out when merchant-id is * but data-merchant-id not passed', () => {
        const merchantID = '*';
        let error;
        
        insertMockSDKScript({
            query: {
                'merchant-id': merchantID
            }
        });

        try {
            getMerchantID();
        } catch (err) {
            error = err;
        }

        if (!error) {
            throw new Error(`Expected error to be thrown`);
        }
    });

    it('should error out when merchant-id is * but only one merchant id in data-merchant-id', () => {
        const merchantID = '*';
        const dataMerchantIDs = 'abc123';
        let error;
        
        insertMockSDKScript({
            query: {
                'merchant-id': merchantID
            },
            attributes: {
                'data-merchant-id': dataMerchantIDs
            }
        });

        try {
            getMerchantID();
        } catch (err) {
            error = err;
        }

        if (!error) {
            throw new Error(`Expected error to be thrown`);
        }
    });

    it('should error out when merchant-id is * but duplicated merchant id in data-merchant-id', () => {
        const merchantID = '*';
        const dataMerchantIDs = 'abc123,abc456,abc123';
        let error;
        
        insertMockSDKScript({
            query: {
                'merchant-id': merchantID
            },
            attributes: {
                'data-merchant-id': dataMerchantIDs
            }
        });

        try {
            getMerchantID();
        } catch (err) {
            error = err;
        }

        if (!error) {
            throw new Error(`Expected error to be thrown`);
        }
    });

    it('should successfully get merchant ids', () => {
        const merchantID = '*';
        const dataMerchantIDs = 'abc123,abc345';
        
        const url = insertMockSDKScript({
            query: {
                'merchant-id': merchantID
            },
            attributes: {
                'data-merchant-id': dataMerchantIDs
            }
        });

        const mID = getMerchantID();

        if (dataMerchantIDs !== mID.join()) {
            throw new Error(`Expected merchant id to be ${ merchantID }, got ${ mID.join() || 'undefined' } from ${ url }`);
        }
    });

    it('should successfully get an intent', () => {
        const intent = 'authorize';

        const url = insertMockSDKScript({
            query: {
                intent
            }
        });

        if (intent !== getIntent()) {
            throw new Error(`Expected intent to be ${ intent }, got ${ getIntent() } from ${ url }`);
        }
    });

    it('should successfully get a currency', () => {
        const currency = 'EUR';

        const url = insertMockSDKScript({
            query: {
                currency
            }
        });

        if (currency !== getCurrency()) {
            throw new Error(`Expected currency to be ${ currency }, got ${ getCurrency() } from ${ url }`);
        }
    });

    it('should successfully get vault', () => {
        const vault = true;

        const url = insertMockSDKScript({
            query: {
                'vault': vault.toString()
            }
        });

        if (vault !== getVault()) {
            throw new Error(`Expected vault to be ${ vault.toString() }, got ${ getVault().toString() } from ${ url }`);
        }
    });

    it('should successfully get commit', () => {
        const commit = false;

        const url = insertMockSDKScript({
            query: {
                'commit': commit.toString()
            }
        });

        if (commit !== getCommit()) {
            throw new Error(`Expected vault to be ${ commit.toString() }, got ${ getCommit().toString() } from ${ url }`);
        }
    });

    it('should successfully get client token', () => {
        const clientToken = 'abc-xyz-123';

        const url = insertMockSDKScript({
            attributes: {
                'data-client-token': clientToken
            }
        });

        if (clientToken !== getClientToken()) {
            throw new Error(`Expected client token to be ${ clientToken }, got ${ getClientToken() || 'undefined' } from ${ url }`);
        }
    });

    it('should not error out when client token not passed', () => {

        let error;

        try {
            getClientToken();
        } catch (err) {
            error = err;
        }

        if (error) {
            throw new Error(`Expected error to not be thrown`);
        }
    });

    it('should successfully get client access token', () => {
        const clientAccessToken = 'abc12354321';
        const clientToken = base64encode(JSON.stringify({
            paypal: {
                accessToken: clientAccessToken
            }
        }));

        const url = insertMockSDKScript({
            attributes: {
                'data-client-token': clientToken
            }
        });

        if (clientAccessToken !== getClientAccessToken()) {
            throw new Error(`Expected client access token to be ${ clientAccessToken }, got ${ getClientAccessToken() || 'undefined' } from ${ url }`);
        }
    });

    it('should successfully get partner attribution id', () => {
        const partnerAttributionID = 'abc-xyz-123';

        const url = insertMockSDKScript({
            attributes: {
                'data-partner-attribution-id': partnerAttributionID
            }
        });

        if (partnerAttributionID !== getPartnerAttributionID()) {
            throw new Error(`Expected client token to be ${ partnerAttributionID }, got ${ getPartnerAttributionID() || 'undefined' } from ${ url }`);
        }
    });

    it('should successfully get stage host', () => {
        const stageHost = 'foo.qa.paypal.com';

        const url = insertMockSDKScript({
            attributes: {
                'data-stage-host': stageHost
            }
        });

        if (stageHost !== getStageHost()) {
            throw new Error(`Expected client token to be ${ stageHost }, got ${ getStageHost() || 'undefined' } from ${ url }`);
        }
    });

    it('should successfully get api stage host', () => {
        const apiStageHost = 'bar.qa.paypal.com';

        const url = insertMockSDKScript({
            attributes: {
                'data-api-stage-host': apiStageHost
            }
        });

        if (apiStageHost !== getAPIStageHost()) {
            throw new Error(`Expected client token to be ${ apiStageHost }, got ${ getAPIStageHost() || 'undefined' } from ${ url }`);
        }
    });

    it('should successfully get sdk integration source', () => {
        const SDKIntegrationSource = 'spbf';

        const url = insertMockSDKScript({
            attributes: {
                'data-sdk-integration-source': SDKIntegrationSource
            }
        });

        if (SDKIntegrationSource !== getSDKIntegrationSource()) {
            throw new Error(`Expected client token to be ${ SDKIntegrationSource }, got ${ getAPIStageHost() || 'undefined' } from ${ url }`);
        }
    });

    it('should successfully get the page type', () => {
        const pageType = 'home';
        const url = insertMockSDKScript({
            attributes: {
                'data-page-type': pageType
            }
        });

        if (pageType !== getPageType()) {
            throw new Error(`Expected page type to be ${ pageType }, got ${ getPageType() || 'undefined' } from ${ url }`);
        }
    });

    it('should throw error if invalid page type', () => {
        try {
            const pageType = 'abc';
            insertMockSDKScript({
                attributes: {
                    'data-page-type': pageType
                }
            });
            throw new Error(`Invalid page type should have thrown an Error.`);
        } catch (error) {
            // pass
        }
    });

    it('should set empty page type if not set', () => {
        const url = insertMockSDKScript({});

        if (getPageType() !== '') {
            throw new Error(`Expected page type to be empty, got ${ getPageType() || 'undefined' } from ${ url }`);
        }
    });
});
