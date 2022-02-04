/* @flow */

import { noop, stringifyError, stringifyErrorMessage, isIEIntranet, getResourceLoadTime, waitForWindowReady, ATTRIBUTES } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY, FPTI_FEED, FPTI_DATA_SOURCE, FPTI_SDK_NAME, FPTI_USER_ACTION } from '@paypal/sdk-constants/src';

import { getEnv, getVersion, getCorrelationID, getMerchantIdFromClientId } from './global';
import { getPartnerAttributionID, getClientID, getMerchantID, getCommit, getLocale, getSDKScript, getSDKIntegrationSource, getPageType } from './script';
import { getSessionID } from './session';
import { getLogger } from './logger';
import { isPayPalDomain } from './domains';

let sdkInitTime;

export function getSDKInitTime() : number {
    if (typeof sdkInitTime === 'undefined') {
        throw new TypeError(`SDK not initialized`);
    }

    return sdkInitTime;
}

export function setupLogger() {
    const logger = getLogger();

    sdkInitTime = Date.now();
    
    logger.addPayloadBuilder(() => {
        return {
            referer: window.location.host,
            uid:     getSessionID(),
            env:     getEnv()
        };
    });

    logger.addTrackingBuilder(() => {
        const { lang, country } = getLocale();
        const mID = getMerchantID() || getMerchantIdFromClientId();

        return {
            [FPTI_KEY.FEED]:                   FPTI_FEED.PAYMENTS_SDK,
            [FPTI_KEY.DATA_SOURCE]:            FPTI_DATA_SOURCE.PAYMENTS_SDK,
            [FPTI_KEY.CLIENT_ID]:              getClientID(),
            [FPTI_KEY.SELLER_ID]:              mID && mID.toString(),
            [FPTI_KEY.SESSION_UID]:            getSessionID(),
            [FPTI_KEY.REFERER]:                window.location.host,
            [FPTI_KEY.LOCALE]:                 `${ lang }_${ country }`,
            [FPTI_KEY.INTEGRATION_IDENTIFIER]: getClientID(),
            [FPTI_KEY.PARTNER_ATTRIBUTION_ID]: getPartnerAttributionID(),
            [FPTI_KEY.PAGE_TYPE]:              getPageType(),
            [FPTI_KEY.SDK_NAME]:               FPTI_SDK_NAME.PAYMENTS_SDK,
            [FPTI_KEY.SDK_VERSION]:            getVersion(),
            [FPTI_KEY.USER_AGENT]:             window.navigator && window.navigator.userAgent,
            [FPTI_KEY.USER_ACTION]:            getCommit() ? FPTI_USER_ACTION.COMMIT : FPTI_USER_ACTION.CONTINUE,
            [FPTI_KEY.CONTEXT_CORRID]:         getCorrelationID(),
            [FPTI_KEY.SDK_INTEGRATION_SOURCE]: getSDKIntegrationSource()
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

    waitForWindowReady().then(() => {
        const sdkScript = getSDKScript();
        const loadTime = getResourceLoadTime(sdkScript.src);
        let cache;
    
        if (loadTime === 0) {
            cache = 'sdk_client_cache_hit';
        } else if (typeof loadTime === 'number') {
            cache = 'sdk_client_cache_miss';
        } else {
            cache = 'sdk_client_cache_unknown';
        }

        // Exclude apps that use the JS SDK and are hosted directly on www.paypal.com. Ex:
        // https://www.paypal.com/buttons/smart
        // https://www.paypal.com/us/gifts/
        const isLoadedInFrame = isPayPalDomain() && window.xprops;

        logger
            .info(`setup_${ getEnv() }`)
            .info(`setup_${ getEnv() }_${ getVersion().replace(/\./g, '_') }`)
            .info(`sdk_${ isLoadedInFrame ? 'paypal' : 'non_paypal' }_domain_script_uid_${ sdkScript.hasAttribute(ATTRIBUTES.UID) ? 'present' : 'missing' }`)
            .info(cache)
            .track({
                [FPTI_KEY.TRANSITION]:    'process_js_sdk_init_client',
                [FPTI_KEY.SDK_LOAD_TIME]: (typeof loadTime === 'number') ? loadTime.toString() : undefined,
                [FPTI_KEY.SDK_CACHE]:     cache
            }).flush();

        if (isIEIntranet()) {
            logger.warn('ie_intranet_mode');
        }
    });
}
