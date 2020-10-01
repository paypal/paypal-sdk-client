/* @flow */

import { setupLogger } from './tracking';
import { getSDKScript, checkSDKScript } from './script';
import { checkForCommonErrors } from './errors';

export { FUNDING } from '@paypal/sdk-constants/src';
export { getCorrelationID } from './globals';

export function setup() {
    checkForCommonErrors();
    getSDKScript();
    setupLogger();
    checkSDKScript();
}
