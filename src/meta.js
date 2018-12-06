/* @flow */

import { base64encode } from 'belter/src';

import { getScriptUrl, getStageHost, getAPIStageHost } from './script';

export function getSDKMeta() : string {
    return base64encode(JSON.stringify({
        url:          getScriptUrl(),
        stageHost:    getStageHost(),
        apiStageHost: getAPIStageHost()
    }));
}
