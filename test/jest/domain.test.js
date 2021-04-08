/* @flow */
import {
    getPayPalDomain,
    getPayPalAPIDomain,
    insertMockSDKScript
} from '../../src';


beforeEach(() => {
    __ENV__ = 'test';
});

describe(`getPayPalDomain function test cases`, () => {
    it('should successfully get the production paypal domain', () => {
        __ENV__ = 'production';
        const expectedPayPalDomain = 'https://www.paypal.com';

        if (getPayPalDomain() !== expectedPayPalDomain) {
            throw new Error(`Expected paypal domain to be ${ expectedPayPalDomain }, got ${ getPayPalDomain() }`);
        }
    });

    it('should successfully get the stage paypal domain', () => {
        __ENV__ = 'stage';
        const expectedPayPalDomain = 'https://msmaster.qa.paypal.com';

        if (getPayPalDomain() !== expectedPayPalDomain) {
            throw new Error(`Expected paypal domain to be ${ expectedPayPalDomain }, got ${ getPayPalDomain() }`);
        }
    });

    it('should successfully get the sandbox paypal domain', () => {
        const expectedPayPalDomain = 'https://www.sandbox.paypal.com';
        __ENV__ = 'sandbox';

        insertMockSDKScript({
            query: {
                'client-id': 'sb'
            }
        });

        if (getPayPalDomain() !== expectedPayPalDomain) {
            throw new Error(`Expected paypal domain to be ${ expectedPayPalDomain }, got ${ getPayPalDomain() }`);
        }
    });

    it('should successfully get the sandbox v2 paypal domain', () => {
        const expectedPayPalDomain = 'https://www-v2.sandbox.paypal.com';
        __ENV__ = 'sandbox';

        insertMockSDKScript({
            query: {
                'client-id': 'sb',
                'env':         'sandbox_v2'
            }
        });

        if (getPayPalDomain() !== expectedPayPalDomain) {
            throw new Error(`Expected paypal domain to be ${ expectedPayPalDomain }, got ${ getPayPalDomain() }`);
        }
    });

    it('should thrown error if can\'t find the requested domain', () => {
        __ENV__ = 'foo';

        try {
            getPayPalDomain();
        } catch (error) {
            if (!error) {
                throw new Error(`Expected paypal domain to thrown error for domain ${ __ENV__ }`);
            }
        }
    });
});

describe(`getPayPalAPIDomain function test cases`, () => {
    it('should successfully get the production paypal API domain', () => {
        __ENV__ = 'production';
        const expectedPayPalAPIDomain = 'https://cors.api.paypal.com';

        if (getPayPalAPIDomain() !== expectedPayPalAPIDomain) {
            throw new Error(`Expected paypal domain to be ${ expectedPayPalAPIDomain }, got ${ getPayPalAPIDomain() }`);
        }
    });

    it('should successfully get the sandbox paypal API domain', () => {
        const expectedPayPalAPIDomain = 'https://cors.api.sandbox.paypal.com';
        __ENV__ = 'sandbox';

        insertMockSDKScript({
            query: {
                'client-id': 'sb'
            }
        });

        if (getPayPalAPIDomain() !== expectedPayPalAPIDomain) {
            throw new Error(`Expected paypal domain to be ${ expectedPayPalAPIDomain }, got ${ getPayPalAPIDomain() }`);
        }
    });

    it('should successfully get the sandbox v2 paypal API domain', () => {
        const expectedPayPalAPIDomain = 'https://cors.api-v2.sandbox.paypal.com';
        __ENV__ = 'sandbox';

        insertMockSDKScript({
            query: {
                'client-id': 'sb',
                'env':         'sandbox_v2'
            }
        });

        if (getPayPalAPIDomain() !== expectedPayPalAPIDomain) {
            throw new Error(`Expected paypal domain to be ${ expectedPayPalAPIDomain }, got ${ getPayPalAPIDomain() }`);
        }
    });

    it('should thrown error if can\'t find the requested API domain', () => {
        __ENV__ = 'foo';

        try {
            getPayPalAPIDomain();
        } catch (error) {
            if (!error) {
                throw new Error(`Expected paypal domain to thrown error for domain ${ __ENV__ }`);
            }
        }
    });
});
