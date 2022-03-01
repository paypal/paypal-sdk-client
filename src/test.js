/* @flow */

import { extendUrl, getScript, memoize } from '@krakenjs/belter/src';
import { SDK_QUERY_KEYS } from '@paypal/sdk-constants/src';

import { getHost, getPath } from './global';
import { getSDKScript, getSDKAttributes } from './script';
import { setupLogger } from './tracking';

type ScriptSettings = {|
    query? : {
        [string] : string
    },
    attributes? : {
        [string] : string
    }
|};

const DEFAULT_QUERY = {
    [ SDK_QUERY_KEYS.CLIENT_ID ]: 'abcxyz123'
};

const DEFAULT_ATTRIBUTES = {};

export function insertMockSDKScript({ query = DEFAULT_QUERY, attributes = DEFAULT_ATTRIBUTES } : ScriptSettings = {}) : string {
    const scripts = document.querySelectorAll('script[type="test/javascript"]');

    for (const script of scripts) {
        if (script && script.parentNode) {
            script.parentNode.removeChild(script);
        }
    }

    // $FlowFixMe
    delete getScript.__inline_memoize_cache__;
    // $FlowFixMe
    delete getSDKScript.__inline_memoize_cache__;
    // $FlowFixMe
    delete getSDKAttributes.__inline_memoize_cache__;

    const script = document.createElement('script');
    script.setAttribute('type', 'test/javascript');
    script.setAttribute('id', 'test-sdk-script');

    const url = extendUrl(`https://${ getHost() }${ getPath() }`, {
        query: {
            ...DEFAULT_QUERY,
            ...query
        }
    });

    script.setAttribute('src', url);

    for (const key of Object.keys(attributes)) {
        script.setAttribute(key, attributes[key]);
    }

    if (!document.body) {
        throw new Error(`No document body found`);
    }

    document.body.appendChild(script); // eslint-disable-line compat/compat
    memoize.clear();
    setupLogger();

    return url;
}
