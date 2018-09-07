/* @flow */
/* eslint unicorn/filename-case: 0, import/unambiguous: 0, import/no-commonjs: 0 */

module.exports = {

    '__paypal-braintree-client__': {
        entry:        './src/interface',
        setupHandler: 'setupClient',
        automatic:    true
    }
};
