/* @flow */

import { Logger } from 'beaver-logger/src';
import { getStorage } from 'belter/src';

import { URLS } from './config';
import { FPTI_KEY, FPTI_FEED, FPTI_DATA_SOURCE } from './constants';

export let logger = Logger({
    url: URLS.LOGGER
});

let storage = getStorage({ name: 'paypal_payments_sdk' });

export function getSessionID() : string {
    return storage.getSessionID();
}

logger.addPayloadBuilder(() => {
    return {
        referer: window.location.host,
        uid:     getSessionID(),
        env:     __ENV__
    };
});

logger.addTrackingBuilder(() => {

    let sessionID = getSessionID();

    return {
        [ FPTI_KEY.FEED ]:        FPTI_FEED.PAYMENTS_SDK,
        [ FPTI_KEY.DATA_SOURCE ]: FPTI_DATA_SOURCE.PAYMENTS_SDK,
        [ FPTI_KEY.CLIENT_ID ]:   __CLIENT_ID__,
        [ FPTI_KEY.SELLER_ID ]:   __MERCHANT_ID__,
        [ FPTI_KEY.SESSION_UID ]: sessionID,
        [ FPTI_KEY.REFERER ]:     window.location.host
    };
});
