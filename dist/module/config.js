export var URLS = {
    local: {
        LOGGER: 'http://localhost.paypal.com:8000/webapps/hermes/logger'
    },
    stage: {
        get LOGGER() {
            return 'http://www.' + __STAGE__ + '/webapps/hermes/logger';
        }
    },
    sandbox: {
        LOGGER: 'https://www.sandbox.paypal.com/webapps/hermes/logger'
    },
    production: {
        LOGGER: 'https://www.paypal.com/webapps/hermes/logger'
    },
    test: {
        LOGGER: 'mock://www.paypal.com/webapps/hermes/logger'
    }
}[__ENV__];