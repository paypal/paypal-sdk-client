/* @flow */

import { extendUrl, getScript } from 'belter/src';
import { SDK_QUERY_KEYS } from '@paypal/sdk-constants/src';

import { getHost, getPath } from './globals';
import { getSDKScript, getSDKAttributes } from './script';

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
    let script = document.querySelector('script[type="test/javascript"]');

    if (script && script.parentNode) {
        script.parentNode.removeChild(script);
    }

    // $FlowFixMe
    delete getScript.__inline_memoize_cache__;
    // $FlowFixMe
    delete getSDKScript.__inline_memoize_cache__;
    // $FlowFixMe
    delete getSDKAttributes.__inline_memoize_cache__;

    script = document.createElement('script');
    script.setAttribute('type', 'test/javascript');

    const url = extendUrl(`https://${ getHost() }${ getPath() }`, {
        query: {
            [ SDK_QUERY_KEYS.CLIENT_ID ]: 'abcxyz123',
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

    document.body.appendChild(script);

    return url;
}
