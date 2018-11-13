/* @flow */

import { base64encode } from 'belter/src';

import { getScriptUrl } from './script';

export function getSDKMeta() : string {
    return base64encode(JSON.stringify({
        url: getScriptUrl()
    }));
}
