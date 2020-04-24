/* @flow */

import { base64encode } from 'belter/src';

import { getScriptUrl, getSDKAttributes } from './script';

export function getSDKMeta() : string {
    const attrs = getSDKAttributes();
    const url = getScriptUrl();
    
    return base64encode(JSON.stringify({ url, attrs })).replace(/\=+$/, ''); // eslint-disable-line no-useless-escape
}
