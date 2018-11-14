/* @flow */

import { getScript, noop } from 'belter/src';

import { getSDKScript, getSDKAttributes } from '../../src';

const TEST_SDK_URL = 'https://test.paypal.com/sdk/js';

type ScriptSettings = {
    query? : {
        [string] : string
    },
    attributes? : {
        [string] : string
    }
};

export function createSDKScript({ query = { 'client-id': 'meep' }, attributes = {} } : ScriptSettings = {}) : string {
    let script = document.querySelector('script[type="test/javascript"]');

    if (script && script.parentNode) {
        script.parentNode.removeChild(script);
    }

    script = document.createElement('script');
    script.setAttribute('type', 'test/javascript');

    const queryString = Object.keys(query).map(key => {
        return `${ key }=${ query[key] }`;
    }).join('&');

    let url = TEST_SDK_URL;
    if (queryString) {
        url = `${ url }?${ queryString }`;
    }

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

function clearMemoizeCaches() {
    // $FlowFixMe
    delete getScript.__inline_memoize_cache__;
    // $FlowFixMe
    delete getSDKScript.__inline_memoize_cache__;
    // $FlowFixMe
    delete getSDKAttributes.__inline_memoize_cache__;
}

beforeEach(() => {
    window.onerror = noop;
    clearMemoizeCaches();
    createSDKScript();
});

window.console.karma = function consoleKarma() {
    let karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    karma.log('debug', arguments);
    console.log.apply(console, arguments); // eslint-disable-line no-console
};
