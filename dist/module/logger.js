import { Logger } from 'beaver-logger/src';
import { getStorage, noop, stringifyError, stringifyErrorMessage, inlineMemoize } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { URLS } from './config';
import { FPTI_KEY, FPTI_FEED, FPTI_DATA_SOURCE, FPTI_SDK_NAME } from './constants';
import { getEnv, getClientID, getMerchantID, getLang, getCountry, getVersion } from './globals';
import { getSDKSettings } from './script';

export function getLogger() {
    return inlineMemoize(getLogger, function () {
        return Logger({
            url: URLS.LOGGER
        });
    });
}

export function getPaymentsSDKStorage() {
    return getStorage({ name: 'paypal_payments_sdk' });
}

export function getSessionID() {
    return getPaymentsSDKStorage().getSessionID();
}

export function setupLogger() {
    var logger = getLogger();

    logger.addPayloadBuilder(function () {
        return {
            referer: window.location.host,
            uid: getSessionID(),
            env: getEnv()
        };
    });

    logger.addTrackingBuilder(function () {
        var _ref;

        return _ref = {}, _ref[FPTI_KEY.FEED] = FPTI_FEED.PAYMENTS_SDK, _ref[FPTI_KEY.DATA_SOURCE] = FPTI_DATA_SOURCE.PAYMENTS_SDK, _ref[FPTI_KEY.CLIENT_ID] = getClientID(), _ref[FPTI_KEY.SELLER_ID] = getMerchantID(), _ref[FPTI_KEY.SESSION_UID] = getSessionID(), _ref[FPTI_KEY.REFERER] = window.location.host, _ref[FPTI_KEY.LOCALE] = getLang() + '_' + getCountry(), _ref[FPTI_KEY.BUYER_COUNTRY] = getCountry(), _ref[FPTI_KEY.INTEGRATION_IDENTIFIER] = window.location.host, _ref[FPTI_KEY.PARTNER_ATTRIBUTION_ID] = getSDKSettings().partnerAttributionID, _ref[FPTI_KEY.SDK_NAME] = FPTI_SDK_NAME.PAYMENTS_SDK, _ref[FPTI_KEY.SDK_VERSION] = getVersion(), _ref[FPTI_KEY.USER_AGENT] = window.navigator && window.navigator.userAgent, _ref;
    });

    ZalgoPromise.onPossiblyUnhandledException(function (err) {
        var _logger$track;

        logger.track((_logger$track = {}, _logger$track[FPTI_KEY.ERROR_CODE] = 'checkoutjs_error', _logger$track[FPTI_KEY.ERROR_DESC] = stringifyErrorMessage(err), _logger$track));

        logger.error('unhandled_error', {
            stack: stringifyError(err),
            errtype: {}.toString.call(err)
        });

        // eslint-disable-next-line promise/no-promise-in-callback
        logger.flush()['catch'](noop);
    });
}