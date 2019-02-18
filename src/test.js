/* @flow */

import { getHost, getPath } from './globals';

export function insertMockSDKScript() {
    const script = document.createElement('script');
    script.setAttribute('id', 'test-sdk-script');
    script.setAttribute('type', 'mock/javascript');
    script.setAttribute('src', `https://${ getHost() }${ getPath() }?client-id=abcxyz123`);

    const body = document.body;

    if (body) {
        body.appendChild(script);
    }
}
