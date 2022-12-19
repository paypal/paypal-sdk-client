import { describe, it, beforeEach } from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";

import type { OrderCreateRequest } from "../../src/api";
import { createAccessToken, createOrder } from "../../src/api";

describe("api cases", () => {
  const expectedToken =
    "A21AAKNZBaqilFBC4dVVz-tr-ySIT78NREeBidy3lkGdr-EA8wbhGrByPayhgnJRPE5xg4QW46moDbCFjZ13i1GH-Ax4SjtjA";
  const defaultAuthResponse = {
    scope: "https://uri.paypal.com/services/invoicing",
    access_token: expectedToken,
    token_type: "Bearer",
    app_id: "APP-80W284485P519543T",
    expires_in: 31838,
    nonce: "2022-03-07T22:41:38ZqHkiC0_odfzFwo27_X0wVuF67STYq39KRplBeeyY2bk",
    error: null,
  };

  // const mockAuthEndpoint = function (data = defaultAuthResponse) {
  //   $mockEndpoint
  //     .register({
  //       method: "POST",
  //       uri: `${window.location.protocol}//${window.location.host}/v1/oauth2/token`,
  //       data,
  //     })
  //     .listen();
  // };

  const mockAuthEndpoint = function (data = defaultAuthResponse) {
    setupServer(
      rest.post(
        `https://api.msmaster.qa.paypal.com/v1/oauth2/token`,
        (req, res, ctx) => {
          return res(ctx.json(data));
        }
      )
    ).listen();
  };

  // const mockCreateOrder = function (data: Record<string, any>) {
  //   $mockEndpoint
  //     .register({
  //       method: "POST",
  //       uri: `${window.location.protocol}//${window.location.host}/v2/checkout/orders`,
  //       data,
  //     })
  //     .listen();
  // };

  const mockCreateOrder = function (data: {
    id?: string;
    status?: string;
    links?: never[];
  }) {
    setupServer(
      rest.post(
        `https://api.msmaster.qa.paypal.com/v2/checkout/orders`,
        (req, res, ctx) => {
          return res(ctx.json(data));
        }
      )
    ).listen();
  };

  let order: OrderCreateRequest;

  beforeEach(() => {
    order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: "10.00",
            currency_code: "USD",
          },
        },
      ],
    };
  });
  it("createAccessToken should return a valid token", async () => {
    mockAuthEndpoint();
    const result = await createAccessToken("testClient");

    if (result !== expectedToken) {
      throw new Error(
        `should receive token equals '${expectedToken}', but got: ${String(
          result
        )}`
      );
    }
  });
  it("createAccessToken should return invalid client argument", async () => {
    // @ts-expect-error, for error handling check
    mockAuthEndpoint({ error: "invalid_client" });

    try {
      await createAccessToken("testClient");
    } catch (err) {
      if (!(err as Error).message.startsWith("Auth Api invalid client id:")) {
        throw new Error(
          `should throw an error message starting with 'Auth Api invalid client id:', but got: '${
            (err as Error).message
          }'`
        );
      }
    }
  });
  it("createAccessToken should return an error message when response is an empty object", async () => {
    // @ts-expect-error, for error handling check
    mockAuthEndpoint({});

    try {
      await createAccessToken("testClient");
    } catch (err) {
      if (!(err as Error).message.startsWith("Auth Api response error:")) {
        throw new Error(
          `should throw an error message starting with 'Auth Api response error:', but got: '${
            (err as Error).message
          }'`
        );
      }
    }
  });
  it("createOrder should throw an error when clientId is null", async () => {
    const expectedErrorMessage = "Client ID not passed";

    try {
      // @ts-expect-error, for error handling check
      await createOrder(null, null);
    } catch (err) {
      if ((err as Error).message !== expectedErrorMessage) {
        throw new Error(
          `should throw an error with message '${expectedErrorMessage}', but got: '${
            (err as Error).message
          }'`
        );
      }
    }
  });
  it("createOrder should throw an error when order is null", async () => {
    const expectedErrorMessage = "Expected order details to be passed";

    try {
      // @ts-expect-error, for error handling check
      await createOrder("testClient", null);
    } catch (err) {
      if ((err as Error).message !== expectedErrorMessage) {
        throw new Error(
          `should throw an error with message '${expectedErrorMessage}', but got: '${
            (err as Error).message
          }'`
        );
      }
    }
  });
  it("createOrder should throw an error when order intent does not match with query parameters intent", async () => {
    const expectedErrorMessage =
      "Unexpected intent: authorize passed to order.create. Please ensure you are passing /sdk/js?intent=authorize in the paypal script tag.";
    // @ts-expect-error, for error handling check
    order.intent = "authorize";

    try {
      await createOrder("testClient", order);
    } catch (err) {
      if ((err as Error).message !== expectedErrorMessage) {
        throw new Error(
          `should throw an error with message '${expectedErrorMessage}', but got: '${
            (err as Error).message
          }'`
        );
      }
    }
  });
  it("createOrder should throw an error when order currency does not match with query parameters currency", async () => {
    const expectedErrorMessage =
      "Unexpected currency: AUD passed to order.create. Please ensure you are passing /sdk/js?currency=AUD in the paypal script tag.";
    order.purchase_units[0].amount.currency_code = "AUD";

    try {
      await createOrder("testClient", order);
    } catch (err) {
      if ((err as Error).message !== expectedErrorMessage) {
        throw new Error(
          `should throw an error with message '${expectedErrorMessage}', but got: '${
            (err as Error).message
          }'`
        );
      }
    }
  });
  it("createOrder should throw an error when order identifier is not in the server response", async () => {
    const expectedErrorMessage = "Order Api response error:";
    mockAuthEndpoint();
    mockCreateOrder({});

    try {
      await createOrder("testClient", order);
    } catch (err) {
      if (!(err as Error).message.startsWith(expectedErrorMessage)) {
        throw new Error(
          `should and error starting with the string "${expectedErrorMessage}", but got: ${
            (err as Error).message
          }`
        );
      }
    }
  });
  it("createOrder should return a valid orderId", async () => {
    const expectedOrderId = "9BL31648CM342010L";
    mockAuthEndpoint();
    mockCreateOrder({
      id: expectedOrderId,
      status: "CREATED",
      links: [],
    });
    const result = await createOrder("testClient", order);

    if (result !== expectedOrderId) {
      throw new Error(
        `should return orderId "${expectedOrderId}", but got: ${String(result)}`
      );
    }
  });
});
