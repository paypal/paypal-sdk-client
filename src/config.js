/* @flow */

export const URLS = {
    local: {
        LOGGER: 'http://localhost.paypal.com:8000/webapps/hermes/api/logger'
    },
    stage: {
        get LOGGER() : string { return `http://www.${ __STAGE__ }/webapps/hermes/api/logger`; }
    },
    sandbox: {
        LOGGER: `https://www.sandbox.paypal.com/webapps/hermes/api/logger`
    },
    production: {
        LOGGER: `https://www.paypal.com/webapps/hermes/api/logger`
    },
    test: {
        LOGGER: `mock://www.paypal.com/webapps/hermes/api/logger`
    }
}[__ENV__];
