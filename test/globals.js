/* @flow */

type TestGlobals = {|
    [string] : string | number | () => string | () => number
|};

export const sdkClientTestGlobals : TestGlobals = {
    __PORT__:       8000,
    __STAGE_HOST__: 'msmaster.qa.paypal.com',
    __HOST__:       'test.paypal.com',
    __HOSTNAME__:   'test.paypal.com',
    __SDK_HOST__:   'test.paypal.com',
    __PATH__:       '/sdk/js',

    __VERSION__:        '1.0.45',
    __CORRELATION_ID__: () => 'window.__CORRELATION_ID__ || "abc123"',
    __NAMESPACE__:      'paypaltest'
};
