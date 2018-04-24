'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var GLOBAL_KEY = exports.GLOBAL_KEY = '__paypal_braintree_global__';

var ENV = exports.ENV = {
    PRODUCTION: 'production',
    SANDBOX: 'sandbox',
    STAGE: 'stage',
    LOCAL: 'local',
    TEST: 'test'
};

var GLOBAL_NAMESPACE = exports.GLOBAL_NAMESPACE = 'paypal';

var DEFAULT_ENV = exports.DEFAULT_ENV = ENV.PRODUCTION;