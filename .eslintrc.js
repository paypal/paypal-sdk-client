/* @flow */

module.exports = {
    'extends': './node_modules/grumbler-scripts/config/.eslintrc.js',

    globals: {
        __PAYPAL_BRAINTREE_SERVER_CONFIG__: true,
        __PAYPAL_BRAINTREE_QUERY_OPTIONS__: true
    }
};