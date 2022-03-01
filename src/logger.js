/* @flow */

import { Logger, type LoggerType } from '@krakenjs/beaver-logger/src';
import { memoize } from '@krakenjs/belter/src';

import { getPayPalLoggerUrl } from './domains';

type GetLogger = () => LoggerType;

export const getLogger : GetLogger = memoize(() => {
    return Logger({
        url: getPayPalLoggerUrl()
    });
});
