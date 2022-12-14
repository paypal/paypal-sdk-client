import type { ZalgoPromise } from "@krakenjs/zalgo-promise";
import { memoize, request, base64encode } from "@krakenjs/belter/dist/esm";
import {
  FPTI_KEY,
  SDK_QUERY_KEYS,
  UNKNOWN,
} from "@paypal/sdk-constants/dist/esm";

import { getOrderAPIUrl, getAuthAPIUrl } from "./domains";
import { getLogger } from "./logger";
import {
  getIntent,
  getCurrency,
  getPartnerAttributionID,
  getMerchantID,
} from "./script";
import { FPTI_CONTEXT_TYPE, FPTI_TRANSITION } from "./constants";

type ApplicationContext = Record<string, unknown>;
export type OrderCreateRequest = {
  intent?: "CAPTURE" | "AUTHORIZE";
  application_context?: ApplicationContext;
  purchase_units: ReadonlyArray<{
    amount: {
      currency_code: string;
      value: string;
    };
    payee?: {
      merchant_id?: string;
      email_address?: string;
    };
  }>;
};
export type OrderCaptureResponse = Record<string, unknown>;
export type OrderGetResponse = Record<string, unknown>;
export type OrderAuthorizeResponse = Record<string, unknown>;
type CreateAccessToken = (arg0: string) => ZalgoPromise<string>;
export const createAccessToken: CreateAccessToken = memoize(
  (clientID: string) => {
    getLogger().info(`rest_api_create_access_token`);
    const basicAuth = base64encode(`${clientID}:`);
    return request({
      method: `post`,
      url: getAuthAPIUrl(),
      headers: {
        Authorization: `Basic ${basicAuth as string}`,
      },
      data: {
        grant_type: `client_credentials`,
      },
    }).then(({ body }: { body: Record<string, any> }) => {
      if (body && body.error === "invalid_client") {
        throw new Error(
          `Auth Api invalid client id: ${clientID}:\n\n${JSON.stringify(
            body,
            null,
            4
          )}`
        );
      }

      if (!body?.access_token) {
        throw new Error(
          `Auth Api response error:\n\n${JSON.stringify(body, null, 4)}`
        );
      }

      return body.access_token;
    });
  }
);
type OrderCreateOptions = {
  fptiState?: string;
};

const getDefaultApplicationContext = (): ApplicationContext => {
  // $FlowFixMe
  return {};
};

export function createOrder(
  clientID: string,
  order: OrderCreateRequest,
  { fptiState = "" }: OrderCreateOptions = {}
): ZalgoPromise<string> {
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
    throw new Error(
      `Unexpected intent: ${
        order.intent
      } passed to order.create. Please ensure you are passing /sdk/js?${
        SDK_QUERY_KEYS.INTENT as string
      }=${order.intent.toLowerCase()} in the paypal script tag.`
    );
  }

  // $FlowFixMe
  order = { ...order, intent: intent.toUpperCase() };
  order.purchase_units = order.purchase_units.map((unit) => {
    if (unit.amount.currency_code && unit.amount.currency_code !== currency) {
      throw new Error(
        `Unexpected currency: ${
          unit.amount.currency_code
        } passed to order.create. Please ensure you are passing /sdk/js?${
          SDK_QUERY_KEYS.CURRENCY as string
        }=${unit.amount.currency_code} in the paypal script tag.`
      );
    }

    const payee = unit.payee;

    if (payee) {
      if (!merchantID) {
        throw new Error(
          `Pass ${
            SDK_QUERY_KEYS.MERCHANT_ID as string
          }=XYZ in the paypal script tag. Pass ${
            SDK_QUERY_KEYS.MERCHANT_ID as string
          }=${UNKNOWN as string} if you do not have access to the merchant id`
        );
      }
    }

    return {
      ...unit,
      payee,
      amount: { ...unit.amount, currency_code: currency },
    };
  });
  order.application_context =
    order.application_context ?? getDefaultApplicationContext();
  return createAccessToken(clientID)
    .then((accessToken): ZalgoPromise<Record<string, any>> => {
      const headers: Record<string, any> = {
        Authorization: `Bearer ${accessToken}`,
        "PayPal-Partner-Attribution-Id": getPartnerAttributionID(),
      };
      return request({
        method: `post`,
        url: getOrderAPIUrl(),
        headers,
        json: order,
      });
    })
    .then(({ body }): string => {
      if (!body?.id) {
        throw new Error(
          `Order Api response error:\n\n${JSON.stringify(body, null, 4)}`
        );
      }

      getLogger().track({
        [FPTI_KEY.STATE]: fptiState,
        [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.CREATE_ORDER,
        [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.ORDER_ID,
        [FPTI_KEY.TOKEN]: body.id,
        [FPTI_KEY.CONTEXT_ID]: body.id,
      });
      return body.id;
    });
}
