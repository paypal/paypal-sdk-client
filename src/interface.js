/* @flow */

import { setupLogger } from './logger';
import { getSDKScript } from './script';
import { checkForCommonErrors } from './errors';

export { FUNDING } from '@paypal/sdk-constants/src';
export { getCorrelationID } from './globals';

export function setup() {
    checkForCommonErrors();
    getSDKScript();
    setupLogger();
}
