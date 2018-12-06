/* @flow */
/* @jsx node */

// eslint-disable-next-line import/no-nodejs-modules
import urlLib from 'url';

import { SDK_PATH, SDK_QUERY_KEYS, SDK_SETTINGS } from 'paypal-sdk-constants';
import { node, html } from 'jsx-pragmatic';

import { HOST, PROTOCOL, LEGACY_SDK_PATH, DEFAULT_SDK_META, DEFAULT_LEGACY_SDK_BASE_URL } from './constants';
import { constHas, entries } from './util';

type SDKMeta = {|
    getSDKLoader : (options? : { baseURL? : string, nonce? : string }) => string
|};

function validatePaymentsSDKUrl({ protocol, hostname, pathname, query, hash }) {
    
    if (hostname === HOST.LOCALHOST) {
        if (protocol !== PROTOCOL.HTTP && protocol !== PROTOCOL.HTTPS) {
            throw new Error(`Expected protocol for sdk url to be ${ PROTOCOL.HTTP } or ${ PROTOCOL.HTTPS } for host: ${ hostname } - got ${ protocol || 'undefined' }`);
        }
    } else {
        if (protocol !== PROTOCOL.HTTPS) {
            throw new Error(`Expected protocol for sdk url to be ${ PROTOCOL.HTTPS } for host: ${ hostname } - got ${ protocol || 'undefined' }`);
        }
    }

    if (pathname !== SDK_PATH) {
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

function validateLegacySDKUrl({ pathname }) {

    if (!pathname.match(LEGACY_SDK_PATH)) {
        throw new Error(`Invalid path for legacy sdk url: ${ pathname || 'undefined' }`);
    }
}

function validateSDKUrl(sdkUrl : string) {
    const { protocol, hostname, pathname, query, hash } = urlLib.parse(sdkUrl, true);

    if (!hostname) {
        throw new Error(`Expected host to be passed for sdk url`);
    }

    if (!pathname) {
        throw new Error(`Expected pathname for sdk url`);
    }

    if (hostname.endsWith(HOST.PAYPAL)) {
        validatePaymentsSDKUrl({ protocol, hostname, pathname, query, hash });
    } else if (hostname === HOST.PAYPALOBJECTS) {
        validateLegacySDKUrl({ pathname });
    } else {
        throw new Error(`Expected host to be a subdomain of ${ HOST.PAYPAL } or ${ HOST.PAYPALOBJECTS }`);
    }
}

function validateHost(url) {
    const { hostname } = urlLib.parse(`https://${ url }`, true);

    if (url !== hostname) {
        throw new Error(`Expected only host to be passed, got ${ url }`);
    }

    if (!url.endsWith(HOST.PAYPAL)) {
        throw new Error(`Expected a paypal host`);
    }
}

export function unpackSDKMeta(sdkMeta? : string) : SDKMeta {

    const { url, stageHost, apiStageHost } = sdkMeta
        ? JSON.parse(Buffer.from(sdkMeta, 'base64').toString('utf8'))
        : DEFAULT_SDK_META;

    if (url) {
        validateSDKUrl(url);
    }

    if (stageHost) {
        validateHost(stageHost);
    }

    if (apiStageHost) {
        validateHost(apiStageHost);
    }

    const getSDKLoader = ({ baseURL = DEFAULT_LEGACY_SDK_BASE_URL, nonce = '' } = {}) => {
        if (url) {
            const attrs = {};

            if (stageHost) {
                attrs[SDK_SETTINGS.STAGE_HOST] = stageHost;
            }

            if (apiStageHost) {
                attrs[SDK_SETTINGS.API_STAGE_HOST] = apiStageHost;
            }

            return (
                <script nonce={ nonce } src={ url } { ...attrs } />
            ).render(html());
        }

        return (
            <script
                nonce={ nonce }
                innerHTML={ `
                    (function() {
                        if (!window.name || window.name.indexOf('xcomponent') !== 0) {
                            return;
                        }

                        var version = window.name.split('__')[2].replace(/_/g, '.');

                        if (!version.match(/^[0-9a-zA-Z.]+$/)) {
                            return;
                        }

                        if (version === '4' || version === 'latest') {
                            version = '';
                        }

                        var url = '${ baseURL }checkout' + (version ? ('.' + version) : '') + '.js';

                        var scriptTag = '<scr' + 'ipt src="' + url + '" data-paypal-checkout data-no-bridge data-state="ppxo_checkout"></scr' + 'ipt>';
                        document.write(scriptTag);
                    })();
                ` }
            />
        ).render(html());
    };
    
    return {
        getSDKLoader
    };
}
