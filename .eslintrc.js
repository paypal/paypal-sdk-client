/* @flow */

module.exports = {
    'extends': './node_modules/grumbler-scripts/config/.eslintrc-browser.js',

    globals: {
        __STAGE__: true,
        __CLIENT_ID__: true,
        __MERCHANT_ID__: true,
        __LOCALE__: true,
        __INTENT__: true,
        __COMMIT__: true,
        __VAULT__: true,

        __HOST__: true,
        __HOSTNAME__: true,
        __PORT__: true,
        __PATH__: true,
        __STAGE_HOST__: true
    }
};