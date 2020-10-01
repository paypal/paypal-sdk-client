/* @flow */

import { Logger, type LoggerType } from 'beaver-logger/src';
import { memoize } from 'belter/src';

import { getPayPalLoggerUrl } from './domains';

export const getLogger = memoize(() : LoggerType => {
    return Logger({
        url: getPayPalLoggerUrl()
    });
});
