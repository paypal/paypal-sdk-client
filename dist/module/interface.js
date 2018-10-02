import { SDK_SETTINGS } from 'paypal-sdk-constants/src';

import { setupLogger } from './logger';
import { getSDKScript } from './script';
import { getEnv } from './globals';

export function client() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$auth = _ref.auth,
        auth = _ref$auth === undefined ? {} : _ref$auth;

    var msg = 'paypal.client() is deprecated; please pass client token as data-client-token="xyz" in ' + getSDKScript().outerHTML;

    if (__SANDBOX__ || __PRODUCTION__) {
        throw new Error(msg);
    }

    // eslint-disable-next-line no-console
    console.warn(msg);

    var clientToken = auth[getEnv()];
    if (!clientToken) {
        throw new Error('Expected paypal.client() to be called with client token for ' + getEnv() + ': paypal.client({ auth: { ' + getEnv() + ': \'xyz\' } })');
    }

    getSDKScript().setAttribute(SDK_SETTINGS.CLIENT_TOKEN, clientToken);
    return window.paypal;
}

export function setupClient() {
    getSDKScript();
    setupLogger();
}