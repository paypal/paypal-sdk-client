/* @flow */

import { getPayPalDomain, getPayPalAPIDomain, getPayPalLoggerDomain, buildPayPalUrl, buildPayPalAPIUrl, getPayPalLoggerUrl } from '../../src';

describe(`config cases`, () => {

    it('should successfully get the paypal domain', () => {
        const expectedPayPalDomain = 'mock://www.paypal.com';

        if (getPayPalDomain() !== expectedPayPalDomain) {
            throw new Error(`Expected paypal domain to be ${ expectedPayPalDomain }, got ${ getPayPalDomain() }`);
        }
    });

    it('should successfully get the paypal api domain', () => {
        const expectedPayPalAPIDomain = 'mock://api.paypal.com';

        if (getPayPalAPIDomain() !== expectedPayPalAPIDomain) {
            throw new Error(`Expected paypal api domain to be ${ expectedPayPalAPIDomain }, got ${ getPayPalAPIDomain() }`);
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
