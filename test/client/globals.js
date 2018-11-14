/* @flow */

import { getHost, getHostName, getPort, getPath, getEnv, getCountry, getLang, getLocale, getDefaultStageHost, getVersion, getCorrelationID } from '../../src';

describe(`globals cases`, () => {

    it('should successfully get the host', () => {
        let expectedResult = 'test.paypal.com';
        let result = getHost();

        if (expectedResult !== result) {
            throw new Error(`Expected host to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the hostname', () => {
        let expectedResult = 'test.paypal.com';
        let result = getHostName();

        if (expectedResult !== result) {
            throw new Error(`Expected hostname to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the port', () => {
        let expectedResult = 8000;
        let result = getPort();

        if (expectedResult !== result) {
            throw new Error(`Expected port to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the path', () => {
        let expectedResult = '/sdk/js';
        let result = getPath();

        if (expectedResult !== result) {
            throw new Error(`Expected path to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the env', () => {
        let expectedResult = 'test';
        let result = getEnv();

        if (expectedResult !== result) {
            throw new Error(`Expected env to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the country', () => {
        let expectedResult = 'FR';
        let result = getCountry();

        if (expectedResult !== result) {
            throw new Error(`Expected country to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the lang', () => {
        let expectedResult = 'fr';
        let result = getLang();

        if (expectedResult !== result) {
            throw new Error(`Expected lang to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the locale', () => {
        let expectedCountry = 'FR';
        let expectedLang = 'fr';

        let { country, lang } = getLocale();

        if (expectedCountry !== country) {
            throw new Error(`Expected country to be ${ expectedCountry }, got ${ country }`);
        }

        if (expectedLang !== lang) {
            throw new Error(`Expected lang to be ${ expectedLang }, got ${ lang }`);
        }
    });

    it('should successfully get the default stage host', () => {
        let expectedResult = 'msmaster.qa.paypal.com';
        let result = getDefaultStageHost();

        if (expectedResult !== result) {
            throw new Error(`Expected default stage host to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the version', () => {
        let expectedResult = '1.0.45';
        let result = getVersion();

        if (expectedResult !== result) {
            throw new Error(`Expected version to be ${ expectedResult }, got ${ result }`);
        }
    });

    it('should successfully get the correlation id', () => {
        let expectedResult = 'abc123';
        let result = getCorrelationID();

        if (expectedResult !== result) {
            throw new Error(`Expected correlation id to be ${ expectedResult }, got ${ result }`);
        }
    });
});
