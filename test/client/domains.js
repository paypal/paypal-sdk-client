/* @flow */

import { getPayPalDomainRegex } from '../../src';

beforeEach(() => {
    window.__ENV__ = 'test';
});
describe(`domains test`, () => {
    it('should successfully match valid domain', () => {

        const validDomains = [
            'master.qa.paypal.com',
            'test-env.qa.paypal.com:3000',
            'geo.qa.paypal.com',
            'www.paypal.com:3080',
            'www.paypal.cn',
            'www.paypal.cn:3000',
            'www.mschina.qa.paypal.cn',
            'www.paypal.com'
        ];

        for (const domain of validDomains) {
            if (!domain.match(getPayPalDomainRegex())) {
                throw new Error(`${ domain } must match the regex`);
            }
        }
    });

    it('should not match invalid domains', () => {
        const invalidDomains = [
            'www.paypal.com.example.com',
            'www.paypal.cn.example.com'
        ];

        for (const domain of invalidDomains) {
            if (domain.match(getPayPalDomainRegex())) {
                throw new Error(`${ domain } must not match the regex`);
            }
        }
    });
});
