/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { inlineMemoize, request, base64encode } from 'belter/src';
import { FPTI_KEY, SDK_QUERY_KEYS, UNKNOWN } from '@paypal/sdk-constants/src';

import { getOrderAPIUrl, getAuthAPIUrl } from './config';
import { getLogger } from './logger';
import { getIntent, getCurrency, getPartnerAttributionID, getMerchantID } from './script';
import { FPTI_CONTEXT_TYPE, FPTI_TRANSITION } from './constants';

export type OrderCreateRequest = {|
    intent? : 'CAPTURE' | 'AUTHORIZE',
    purchase_units : $ReadOnlyArray<{
        amount : {
            currency_code : string,
            value : string
        },
        payee? : {
            merchant_id? : string
        }
    }>
|};

export type OrderCaptureResponse = {||};
export type OrderGetResponse = {||};
export type OrderAuthorizeResponse = {||};

export function createAccessToken (clientID : string) : ZalgoPromise<string> {
    return inlineMemoize(createAccessToken, () => {

        getLogger().info(`rest_api_create_access_token`);

        const basicAuth = base64encode(`${ clientID }:`);

        return request({

            method:  `post`,
            url:     getAuthAPIUrl(),
            headers: {
                Authorization: `Basic ${ basicAuth }`
            },
            data: {
                grant_type: `client_credentials`
            }

        }).then(({ body }) => {

            if (body && body.error === 'invalid_client') {
                throw new Error(`Auth Api invalid client id: ${ clientID }:\n\n${ JSON.stringify(body, null, 4) }`);
            }

            if (!body || !body.access_token) {
                throw new Error(`Auth Api response error:\n\n${ JSON.stringify(body, null, 4) }`);
            }

            return body.access_token;
        });
    }, [ clientID ]);
}

type OrderCreateOptions = {|
    fptiState? : string
|};

export function createOrder(clientID : string, order : OrderCreateRequest, { fptiState = '' } : OrderCreateOptions = {}) : ZalgoPromise<string> {
    getLogger().info(`rest_api_create_order_token`);

    if (!clientID) {
        throw new Error(`Client ID not passed`);
    }

    if (!order) {
        throw new Error(`Expected order details to be passed`);
    }

    const currency = getCurrency();
    const intent = getIntent();
    const merchantID = getMerchantID();

    order = { ...order };

    if (order.intent && order.intent.toLowerCase() !== intent) {
        throw new Error(`Unexpected intent: ${ order.intent } passed to order.create. Please ensure you are passing /sdk/js?${ SDK_QUERY_KEYS.INTENT }=${ order.intent.toLowerCase() } in the paypal script tag.`);
    }

    // $FlowFixMe
    order = { ...order, intent: intent.toUpperCase() };

    order.purchase_units = order.purchase_units.map(unit => {
        if (unit.amount.currency_code && unit.amount.currency_code !== currency) {
            throw new Error(`Unexpected currency: ${ unit.amount.currency_code } passed to order.create. Please ensure you are passing /sdk/js?${ SDK_QUERY_KEYS.CURRENCY }=${ unit.amount.currency_code } in the paypal script tag.`);
        }

        let payee = unit.payee;

        if (payee) {
            if (!merchantID) {
                throw new Error(`Pass ${ SDK_QUERY_KEYS.MERCHANT_ID }=XYZ in the paypal script tag. Pass ${ SDK_QUERY_KEYS.MERCHANT_ID }=${ UNKNOWN } if you do not have access to the merchant id`);
            }

            if (payee.merchant_id && merchantID[0] !== UNKNOWN && payee.merchant_id !== merchantID) {
                throw new Error(`Expected payee.merchant_id to be "${ merchantID[0] }"`);
            }
        }
        
        if (merchantID && merchantID[0] !== UNKNOWN) {
            payee = {
                ...payee,
                merchant_id: merchantID[0]
            };
        }

        return { ...unit, payee, amount: { ...unit.amount, currency_code: currency } };
    });

    order.application_context = order.application_context || {};

    return createAccessToken(clientID).then((accessToken) : ZalgoPromise<Object> => {

        const headers : Object = {
            'Authorization':                 `Bearer ${ accessToken }`,
            'PayPal-Partner-Attribution-Id': getPartnerAttributionID()
        };

        return request({
            method: `post`,
            url:    getOrderAPIUrl(),
            headers,
            json:   order
        });

    }).then(({ body }) : string => {

        if (!body || !body.id) {
            throw new Error(`Order Api response error:\n\n${ JSON.stringify(body, null, 4) }`);
        }

        getLogger().track({
            [FPTI_KEY.STATE]:        fptiState,
            [FPTI_KEY.TRANSITION]:   FPTI_TRANSITION.CREATE_ORDER,
            [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.ORDER_ID,
            [FPTI_KEY.TOKEN]:        body.id,
            [FPTI_KEY.CONTEXT_ID]:   body.id
        });

        return body.id;
    });
}
