/* @flow */

module.exports = {
    'extends': './node_modules/grumbler-scripts/config/.eslintrc-browser.js',

    globals: {
        __sdk__: true,
        __STAGE__: true,
        __CLIENT_ID__: true,
        __MERCHANT_ID__: true,
        __HOST__: true,
        __PATH__: true
    }
};