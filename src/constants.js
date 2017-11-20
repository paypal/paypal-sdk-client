/* @flow */

export const CONFIG_KEY = '__braintree_paypal_config__';

export const STORE = {
    LOCALSTORAGE: 'localstorage',
    GLOBAL:       'global'
};

export const KEY = {
    LOGGER_SESSION_ID:       'logger_session_id',
    PAYPAL_FUNDING_DISALLOW: 'paypal_funding_disallow'
};

export const PAYPAL_FUNDING = {
    PAYPAL: 'paypal',
    VENMO:  'venmo',
    CREDIT: 'credit',
    CARD:   'card',
    IDEAL:  'ideal',
    ELV:    'elv'
};
