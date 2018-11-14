/* @flow */

import { Logger, type LoggerType } from 'beaver-logger/src';
import { getStorage, type Storage, noop, stringifyError, stringifyErrorMessage, inlineMemoize } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY, FPTI_FEED, FPTI_DATA_SOURCE, FPTI_SDK_NAME, FPTI_USER_ACTION } from 'paypal-sdk-constants/src';

import { getPayPalLoggerUrl } from './config';
import { getEnv, getLang, getCountry, getVersion, getCorrelationID } from './globals';
import { getPartnerAttributionID, getClientID, getMerchantID, getCommit } from './script';

export function getLogger() : LoggerType {
    return inlineMemoize(getLogger, () =>
        Logger({
            url: getPayPalLoggerUrl()
        })
    );
}

export function getPaymentsSDKStorage() : Storage {
    return getStorage({ name: 'paypal_payments_sdk' });
}

export function getSessionID() : string {
    return getPaymentsSDKStorage().getSessionID();
}

export function setupLogger() {
    let logger = getLogger();
    
    logger.addPayloadBuilder(() => {
        return {
            referer: window.location.host,
            uid:     getSessionID(),
            env:     getEnv()
        };
    });

    logger.addTrackingBuilder(() => {
        return {
            [FPTI_KEY.FEED]:                   FPTI_FEED.PAYMENTS_SDK,
            [FPTI_KEY.DATA_SOURCE]:            FPTI_DATA_SOURCE.PAYMENTS_SDK,
            [FPTI_KEY.CLIENT_ID]:              getClientID(),
            [FPTI_KEY.SELLER_ID]:              getMerchantID(),
            [FPTI_KEY.SESSION_UID]:            getSessionID(),
            [FPTI_KEY.REFERER]:                window.location.host,
            [FPTI_KEY.LOCALE]:                 `${ getLang() }_${ getCountry() }`,
            [FPTI_KEY.BUYER_COUNTRY]:          getCountry(),
            [FPTI_KEY.INTEGRATION_IDENTIFIER]: getClientID(),
            [FPTI_KEY.PARTNER_ATTRIBUTION_ID]: getPartnerAttributionID(),
            [FPTI_KEY.SDK_NAME]:               FPTI_SDK_NAME.PAYMENTS_SDK,
            [FPTI_KEY.SDK_VERSION]:            getVersion(),
            [FPTI_KEY.USER_AGENT]:             window.navigator && window.navigator.userAgent,
            [FPTI_KEY.USER_ACTION]:            getCommit() ? FPTI_USER_ACTION.COMMIT : FPTI_USER_ACTION.CONTINUE,
            [FPTI_KEY.CONTEXT_CORRID]:         getCorrelationID()
        };
    });

    ZalgoPromise.onPossiblyUnhandledException(err => {

        logger.track({
            [FPTI_KEY.ERROR_CODE]: 'payments_sdk_error',
            [FPTI_KEY.ERROR_DESC]: stringifyErrorMessage(err)
        });

        logger.error('unhandled_error', {
            err: stringifyError(err)
        });

        // eslint-disable-next-line promise/no-promise-in-callback
        logger.flush().catch(noop);
    });
}
