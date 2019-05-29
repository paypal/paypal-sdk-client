/* @flow */

import { setupLogger } from './logger';
import { getSDKScript } from './script';
import { checkForCommonErrors } from './errors';

export { FUNDING } from '@paypal/sdk-constants';

export function setup() {
    checkForCommonErrors();
    getSDKScript();
    setupLogger();
}
