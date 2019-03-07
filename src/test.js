/* @flow */

import { extendUrl } from 'belter/src';
import { SDK_QUERY_KEYS } from '@paypal/sdk-constants/src';

import { getHost, getPath } from './globals';

type MockScriptOptions = {|
    query? : {
        [string] : string
    }
|};

export function insertMockSDKScript({ query = {} } : MockScriptOptions = {}) {

    const src = extendUrl(`https://${ getHost() }${ getPath() }`, {
        query: {
            [ SDK_QUERY_KEYS.CLIENT_ID ]: 'abcxyz123',
            ...query
        }
    });

    const script = document.createElement('script');
    script.setAttribute('id', 'test-sdk-script');
    script.setAttribute('type', 'mock/javascript');
    script.setAttribute('src', src);

    const head = document.head;

    if (head) {
        head.appendChild(script);
    } else {
        throw new Error(`Could not find head`);
    }
}
