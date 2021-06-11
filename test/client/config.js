/* @flow */

import { insertMockSDKScript, getPayPalDomain, getPayPalAPIDomain, getPayPalLoggerDomain, buildPayPalUrl, buildPayPalAPIUrl, getPayPalLoggerUrl } from '../../src';

beforeEach(() => {
    window.__ENV__ = 'test';
});

describe(`config cases`, () => {

    it('should successfully get the testing paypal domain', () => {
        const expectedPayPalDomain = 'mock://www.paypal.com';

        if (getPayPalDomain() !== expectedPayPalDomain) {
            throw new Error(`Expected paypal domain to be ${ expectedPayPalDomain }, got ${ getPayPalDomain() }`);
        }
    });

    it('should successfully get the production paypal domain', () => {
        window.__ENV__ = 'production';
        const expectedPayPalDomain = 'https://www.paypal.com';

        if (getPayPalDomain() !== expectedPayPalDomain) {
            throw new Error(`Expected paypal domain to be ${ expectedPayPalDomain }, got ${ getPayPalDomain() }`);
        }
    });

    it('should successfully get the sandbox paypal domain', () => {
        const expectedPayPalDomain = 'https://www.sandbox.paypal.com';
        window.__ENV__ = 'sandbox';

        insertMockSDKScript({
            query: {
                'client-id': 'sb'
            }
        });

        if (getPayPalDomain() !== expectedPayPalDomain) {
            throw new Error(`Expected paypal domain to be ${ expectedPayPalDomain }, got ${ getPayPalDomain() }`);
        }
    });

    it('should thrown error if can\'t find the requested domain', () => {
        window.__ENV__ = 'foo';

        try {
            getPayPalDomain();
        } catch (error) {
            if (!error) {
                throw new Error(`Expected paypal domain to thrown error for domain ${ __ENV__ }`);
            }
        }
    });

    it('should successfully get the testing paypal api domain', () => {
        const expectedPayPalAPIDomain = 'mock://api.paypal.com';

        if (getPayPalAPIDomain() !== expectedPayPalAPIDomain) {
            throw new Error(`Expected paypal api domain to be ${ expectedPayPalAPIDomain }, got ${ getPayPalAPIDomain() }`);
        }
    });

    it('should successfully get the sandbox paypal API domain', () => {
        const expectedPayPalAPIDomain = 'https://cors.api.sandbox.paypal.com';
        window.__ENV__ = 'sandbox';

        insertMockSDKScript({
            query: {
                'client-id': 'sb'
            }
        });

        if (getPayPalAPIDomain() !== expectedPayPalAPIDomain) {
            throw new Error(`Expected paypal domain to be ${ expectedPayPalAPIDomain }, got ${ getPayPalAPIDomain() }`);
        }
    });

    it('should successfully get the production paypal API domain', () => {
        window.__ENV__ = 'production';
        const expectedPayPalAPIDomain = 'https://cors.api.paypal.com';

        if (getPayPalAPIDomain() !== expectedPayPalAPIDomain) {
            throw new Error(`Expected paypal domain to be ${ expectedPayPalAPIDomain }, got ${ getPayPalAPIDomain() }`);
        }
    });

    it('should thrown error if can\'t find the requested API domain', () => {
        window.__ENV__ = 'foo';

        try {
            getPayPalAPIDomain();
        } catch (error) {
            if (!error) {
                throw new Error(`Expected paypal domain to thrown error for domain ${ __ENV__ }`);
            }
        }
    });

    it('should successfully get the paypal logger domain', () => {
        const expectedPayPalDomain = 'mock://www.paypal.com';

        if (getPayPalLoggerDomain() !== expectedPayPalDomain) {
            throw new Error(`Expected paypal logger domain to be ${ expectedPayPalDomain }, got ${ getPayPalLoggerDomain() }`);
        }
    });

    it('should successfully build a paypal url', () => {
        const expectedPayPalUrl = `${ window.location.protocol }//${ window.location.host }/foo/bar`;
        const result = buildPayPalUrl('/foo/bar');

        if (result !== expectedPayPalUrl) {
            throw new Error(`Expected paypal url to be ${ expectedPayPalUrl }, got ${ result }`);
        }
    });

    it('should successfully build a paypal api url', () => {
        const expectedPayPalUrl = `${ window.location.protocol }//${ window.location.host }/bar/baz`;
        const result = buildPayPalAPIUrl('/bar/baz');

        if (result !== expectedPayPalUrl) {
            throw new Error(`Expected paypal api url to be ${ expectedPayPalUrl }, got ${ result }`);
        }
    });

    it('should successfully build a paypal logger url', () => {
        const expectedPayPalUrl = `${ window.location.protocol }//${ window.location.host }/xoplatform/logger/api/logger`;
        const result = getPayPalLoggerUrl();

        if (result !== expectedPayPalUrl) {
            throw new Error(`Expected paypal logger url to be ${ expectedPayPalUrl }, got ${ result }`);
        }
    });
});
