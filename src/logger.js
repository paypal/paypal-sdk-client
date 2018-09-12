/* @flow */

import { Logger } from 'beaver-logger/src';
import { getStorage, noop, stringifyError, stringifyErrorMessage } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { URLS } from './config';
import { FPTI_KEY, FPTI_FEED, FPTI_DATA_SOURCE, FPTI_SDK_NAME } from './constants';
import { getEnv, getClientID, getMerchantID, getLang, getCountry, getVersion } from './globals';
import { getSDKSettings } from './script';

export let logger = Logger({
    url: URLS.LOGGER
});

let storage = getStorage({ name: 'paypal_payments_sdk' });

export function getSessionID() : string {
    return storage.getSessionID();
}

export function setupLogger() {
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
            [FPTI_KEY.INTEGRATION_IDENTIFIER]: window.location.host,
            [FPTI_KEY.PARTNER_ATTRIBUTION_ID]: getSDKSettings().partnerAttributionID,
            [FPTI_KEY.SDK_NAME]:               FPTI_SDK_NAME.PAYMENTS_SDK,
            [FPTI_KEY.SDK_VERSION]:            getVersion(),
            [FPTI_KEY.USER_AGENT]:             window.navigator && window.navigator.userAgent
        };
    });

    ZalgoPromise.onPossiblyUnhandledException(err => {

        logger.track({
            [FPTI_KEY.ERROR_CODE]: 'checkoutjs_error',
            [FPTI_KEY.ERROR_DESC]: stringifyErrorMessage(err)
        });

        logger.error('unhandled_error', {
            stack:   stringifyError(err),
            errtype: ({}).toString.call(err)
        });

        // eslint-disable-next-line promise/no-promise-in-callback
        logger.flush().catch(noop);
    });
}
