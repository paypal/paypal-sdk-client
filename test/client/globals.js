/* @flow */

import { getHost, getHostName, getPort, getPath, getEnv, getCountry, getLang, getLocale, getDefaultStageHost, getVersion, getCorrelationID } from '../../src';

describe(`globals cases`, () => {

    it('should successfully get the host', () => {
        const expectedResult = 'test.paypal.com';
        const result = getHost();

        if (expectedResult !== result) {
            throw new Error(`Expected host to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the hostname', () => {
        const expectedResult = 'test.paypal.com';
        const result = getHostName();

        if (expectedResult !== result) {
            throw new Error(`Expected hostname to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the port', () => {
        const expectedResult = 8000;
        const result = getPort();

        if (expectedResult !== result) {
            throw new Error(`Expected port to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the path', () => {
        const expectedResult = '/sdk/js';
        const result = getPath();

        if (expectedResult !== result) {
            throw new Error(`Expected path to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the env', () => {
        const expectedResult = 'test';
        const result = getEnv();

        if (expectedResult !== result) {
            throw new Error(`Expected env to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the country', () => {
        const expectedResult = 'FR';
        const result = getCountry();

        if (expectedResult !== result) {
            throw new Error(`Expected country to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the lang', () => {
        const expectedResult = 'fr';
        const result = getLang();

        if (expectedResult !== result) {
            throw new Error(`Expected lang to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the locale', () => {
        const expectedCountry = 'FR';
        const expectedLang = 'fr';

        const { country, lang } = getLocale();

        if (expectedCountry !== country) {
            throw new Error(`Expected country to be ${ expectedCountry }, got ${ country }`);
        }

        if (expectedLang !== lang) {
            throw new Error(`Expected lang to be ${ expectedLang }, got ${ lang }`);
        }
    });

    it('should successfully get the default stage host', () => {
        const expectedResult = 'msmaster.qa.paypal.com';
        const result = getDefaultStageHost();

        if (expectedResult !== result) {
            throw new Error(`Expected default stage host to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the version', () => {
        const expectedResult = '1.0.45';
        const result = getVersion();

        if (expectedResult !== result) {
            throw new Error(`Expected version to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the correlation id', () => {
        const expectedResult = 'abc123';
        const result = getCorrelationID();

        if (expectedResult !== result) {
            throw new Error(`Expected correlation id to be ${ expectedResult }, got ${ result }`);
        }
    });
});
