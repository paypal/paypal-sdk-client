/* @flow */

import { setupLogger } from './logger';
import { SDK_SETTINGS } from './constants';
import { getSDKScript } from './script';
import { getEnv } from './globals';

export function client({ auth = {} } : { auth : { [string] : string } } = {}) : mixed {
    // eslint-disable-next-line no-console
    console.warn(`paypal.client() is deprecated; please pass client token as data-client-token="xyz" in ${ getSDKScript().outerHTML }`);
    
    let clientToken = auth[getEnv()];
    if (!clientToken) {
        throw new Error(`Expected paypal.client() to be called with client token for ${ getEnv() }: paypal.client({ auth: { ${ getEnv() }: 'xyz' } })`);
    }

    getSDKScript().setAttribute(SDK_SETTINGS.CLIENT_TOKEN, clientToken);
    return window.paypal;
}

export function setupClient() {
    getSDKScript();
    setupLogger();
}
