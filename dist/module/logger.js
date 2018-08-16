import { Logger } from 'beaver-logger/src';
import { getStorage } from 'belter/src';

import { URLS } from './config';
import { FPTI_KEY, FPTI_FEED, FPTI_DATA_SOURCE } from './constants';

export var logger = Logger({
    url: URLS.LOGGER
});

var storage = getStorage({ name: 'paypal_payments_sdk' });

export function getSessionID() {
    return storage.getSessionID();
}

logger.addPayloadBuilder(function () {
    return {
        referer: window.location.host,
        uid: getSessionID(),
        env: __ENV__
    };
});

logger.addTrackingBuilder(function () {
    var _ref;

    var sessionID = getSessionID();

    return _ref = {}, _ref[FPTI_KEY.FEED] = FPTI_FEED.PAYMENTS_SDK, _ref[FPTI_KEY.DATA_SOURCE] = FPTI_DATA_SOURCE.PAYMENTS_SDK, _ref[FPTI_KEY.CLIENT_ID] = __CLIENT_ID__, _ref[FPTI_KEY.SELLER_ID] = __MERCHANT_ID__, _ref[FPTI_KEY.SESSION_UID] = sessionID, _ref[FPTI_KEY.REFERER] = window.location.host, _ref;
});