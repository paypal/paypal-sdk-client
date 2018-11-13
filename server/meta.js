/* @flow */

// eslint-disable-next-line import/no-nodejs-modules
import urlLib from 'url';

import { SDK_PATH, SDK_QUERY_KEYS } from 'paypal-sdk-constants';

import { HOST, PROTOCOL } from './constants';
import { constHas, entries } from './util';

type SDKMeta = {|
    url : string,
    getScriptTag : () => string
|};

function validateSDKUrl(sdkUrl : string) {
    const { protocol, hostname, pathname, query, hash } = urlLib.parse(sdkUrl, true);

    if (!hostname || !hostname.endsWith(HOST.PAYPAL)) {
        throw new Error(`Expected host to be a subdomain of ${ HOST.PAYPAL }`);
    }

    if (hostname === HOST.LOCALHOST) {
        if (protocol !== PROTOCOL.HTTP && protocol !== PROTOCOL.HTTPS)  {
            throw new Error(`Expected protocol for sdk url to be ${ PROTOCOL.HTTP } or ${ PROTOCOL.HTTPS } for host: ${ hostname } - got ${ protocol || 'undefined' }`);
        }
    } else {
        if (protocol !== PROTOCOL.HTTPS) {
            throw new Error(`Expected protocol for sdk url to be ${ PROTOCOL.HTTPS } for host: ${ hostname } - got ${ protocol || 'undefined' }`);
        }
    }

    if (!pathname || pathname !== SDK_PATH) {
        throw new Error(`Invalid path for sdk url: ${ pathname || 'undefined' }`);
    }

    // $FlowFixMe
    for (const [ key, val ] of entries(query)) {
        
        // $FlowFixMe
        if (!constHas(SDK_QUERY_KEYS, key)) {
            throw new Error(`Unexpected query key for sdk url: ${ key }`);
        }

        if (!val) {
            throw new Error(`Unexpected empty query value for sdk url: ${ key }`);
        }

        if (typeof val !== 'string') {
            throw new TypeError(`Unexpected non-string key for sdk url: ${ key }`);
        }

        if (!val.match(/^[a-zA-Z0-9_,-]+$/)) {
            throw new Error(`Unexpected characters in query key for sdk url: ${ key }=${ val }`);
        }
    }

    if (hash) {
        throw new Error(`Expected no hash to be passed in sdk url, got ${ hash }`);
    }
}

export function unpackSDKMeta(sdkMeta : string) : SDKMeta {
    const { url } = JSON.parse(Buffer.from(sdkMeta, 'base64').toString('utf8'));

    validateSDKUrl(url);

    const getScriptTag = () => {
        return `<script src="${ url }"></script>`;
    };
    
    return {
        url,
        getScriptTag
    };
}
