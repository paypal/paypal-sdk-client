/* @flow */

export const GLOBAL_KEY = '__paypal_braintree_global__';

export const KEY = {
    LOGGER_SESSION_ID:         'logger_session_id',
    DEDICATED_FUNDING_MODULES: 'dedicated_funding_modules'
};

export const FUNDING = {
    PAYPAL: 'paypal',
    VENMO:  'venmo',
    CREDIT: 'credit',
    CARD:   'card',
    IDEAL:  'ideal',
    ELV:    'elv'
};

export const ENV = {
    PRODUCTION: 'production',
    SANDBOX:    'sandbox',
    STAGE:      'stage',
    LOCAL:      'local'
};

export const HTTP_HEADERS = {
    CONTENT_TYPE: 'content-type',
    ACCEPT:       'accept'
};
