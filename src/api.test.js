/* @flow */
import { describe, beforeEach, it, expect, vi } from "vitest";
import { getCurrentScript, request, memoize } from "@krakenjs/belter/src";

import { createAccessToken, createOrder } from "./api";

vi.mock("@krakenjs/belter/src", async () => {
  const actual = await vi.importActual("@krakenjs/belter/src");
  return {
    ...actual,
    getCurrentScript: vi.fn(),
    request: vi.fn().mockResolvedValue(),
  };
});

describe("api cases", () => {
  let order;
  const invalidClientId = "invalid-client-id";
  const emptyResponseClientId = "empty-response-client-id";
  const createOrderValidId = "create-order-valid-order-id";
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

  beforeEach(() => {
    memoize.clear();
    window.__PAYPAL_DOMAIN__ = "testurl";
    // $FlowIgnore
    getCurrentScript.mockReturnValue({
      src: `https://sdkplz.com/sdk/js?intent=capture`,
      attributes: [],
    });
    vi.clearAllMocks();

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

  describe("createAccessToken()", () => {
    it("createAccessToken should return a valid token", async () => {
      // $FlowIgnore
      request.mockResolvedValueOnce({ body: defaultAuthResponse });

      const result = await createAccessToken("testClient");

      expect(result).toEqual(expectedToken);
    });

    it("createAccessToken should throw invalid client argument error", async () => {
      // $FlowIgnore
      request.mockResolvedValueOnce({ body: { error: "invalid_client" } });

      await expect(() =>
        createAccessToken(invalidClientId)
      ).rejects.toThrowError(/Auth Api invalid client id:/);
    });

    it("createAccessToken should return an error message when response is an empty object", async () => {
      // $FlowIgnore
      request.mockResolvedValueOnce({ body: {} });

      await expect(() =>
        createAccessToken(emptyResponseClientId)
      ).rejects.toThrow(/Auth Api response error:/);
    });
  });

  describe("createOrder()", () => {
    it("createOrder should throw an error when clientId is null", () => {
      // $FlowIgnore
      expect(() => createOrder(null)).toThrowError(/Client ID not passed/);
    });

    it("createOrder should throw an error when order is null", () => {
      // $FlowIgnore
      expect(() => createOrder("testClient", null)).toThrow(
        /Expected order details to be passed/
      );
    });

    it("createOrder should throw an error when order intent does not match with query parameters intent", () => {
      const expectedErrorMessage =
        "Unexpected intent: AUTHORIZE passed to order.create. Please ensure you are passing /sdk/js?intent=authorize in the paypal script tag.";

      order.intent = "AUTHORIZE";

      expect(() => createOrder("testClient", order)).toThrowError(
        expectedErrorMessage
      );
    });

    it("createOrder should throw an error when order currency does not match with query parameters currency", () => {
      const expectedErrorMessage =
        "Unexpected currency: AUD passed to order.create. Please ensure you are passing /sdk/js?currency=AUD in the paypal script tag.";
      order.purchase_units[0].amount.currency_code = "AUD";

      expect(() => createOrder("testClient", order)).toThrow(
        expectedErrorMessage
      );
    });

    it("createOrder should throw an error when order identifier is not in the server response", async () => {
      const expectedErrorMessage = "Order Api response error:";
      const failuredPayload = {};

      request
        // $FlowIgnore
        .mockResolvedValueOnce({ body: defaultAuthResponse })
        .mockResolvedValueOnce({ body: failuredPayload });

      await expect(() => createOrder("testClient", order)).rejects.toThrow(
        expectedErrorMessage
      );
    });

    it("createOrder should return a valid orderId", async () => {
      const expectedOrderId = "9BL31648CM342010L";
      const mockOrderResponse = {
        id: expectedOrderId,
        status: "CREATED",
        links: [],
      };

      request
        // $FlowIgnore
        .mockResolvedValueOnce({ body: defaultAuthResponse })
        .mockResolvedValueOnce({ body: mockOrderResponse });

      const result = await createOrder(createOrderValidId, order);
      expect(result).toEqual(expectedOrderId);
    });
  });
});
