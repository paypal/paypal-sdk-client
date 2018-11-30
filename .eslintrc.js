/* @flow */

module.exports = {
    'extends': './node_modules/grumbler-scripts/config/.eslintrc-browser.js',

    globals: {
        __STAGE__: true,
        __BUYER_COUNTRY__: true,
        __LOCALE_COUNTRY__: true,
        __VERSION__: true,

        __HOST__: true,
        __HOSTNAME__: true,
        __PORT__: true,
        __PATH__: true,
        __STAGE_HOST__: true,
        __CORRELATION_ID__: true,
        __NAMESPACE__: true
    }
};