/* @flow */

import { setupLogger } from './logger';
import { getSDKScript } from './script';
import { checkForCommonErrors } from './errors';

export function setupClient() {
    checkForCommonErrors();
    getSDKScript();
    setupLogger();
}
