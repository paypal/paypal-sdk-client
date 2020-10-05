/* @flow */

import { Logger, type LoggerType } from 'beaver-logger/src';
import { memoize } from 'belter/src';

import { getPayPalLoggerUrl } from './domains';

type GetLogger = () => LoggerType;

export const getLogger : GetLogger = memoize(() => {
    return Logger({
        url: getPayPalLoggerUrl()
    });
});
