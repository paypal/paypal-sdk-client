import { getStageHost } from './globals';

export var URLS = {
    local: {
        LOGGER: 'http://localhost.paypal.com:8000/webapps/hermes/api/logger'
    },
    stage: {
        get LOGGER() {
            return 'http://www.' + getStageHost() + '/webapps/hermes/api/logger';
        }
    },
    sandbox: {
        LOGGER: 'https://www.sandbox.paypal.com/webapps/hermes/api/logger'
    },
    production: {
        LOGGER: 'https://www.paypal.com/webapps/hermes/api/logger'
    },
    test: {
        LOGGER: 'mock://www.paypal.com/webapps/hermes/api/logger'
    }
}[__ENV__];