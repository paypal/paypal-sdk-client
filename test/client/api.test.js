/* @flow */
import { describe, beforeAll, beforeEach, it, expect, vi } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

import { getCurrentScript, base64encode } from "@krakenjs/belter/src";
import { createAccessToken, createOrder } from "../../src/api";

const BASE_URL = `${window.location.protocol}//${window.location.host}`;

vi.mock("@krakenjs/belter/src", async () => {
  const actual = await vi.importActual("@krakenjs/belter/src");
  return {
    ...actual,
    getCurrentScript: vi.fn(),
  };
});

const clientIdMatch = (req, desiredClientId) =>
  req.headers.get("Authorization").split(" ")[1] ===
  base64encode(`${desiredClientId}:`);

describe("api cases", () => {
  let order;
  let mockWorker;
  const invalidClientId = "invalid-client-id";
  const emptyResponseClientId = "empty-response-client-id";
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

  const makeMockAuthHandler = (
    data = defaultAuthResponse,
    statusCode = 200
  ) => {
    return http.post(`${BASE_URL}/v1/oauth2/token`, async ({ request }) => {
      if (clientIdMatch(request, invalidClientId)) {
        return HttpResponse.json(
          { error: "invalid_client" },
          { status: statusCode }
        );
      } else if (clientIdMatch(request, emptyResponseClientId)) {
        return HttpResponse.json({}, { status: statusCode });
      }

      return HttpResponse.json(data, { status: statusCode });
    });
  };

  const makeMockOrdersHandler = (data = {}, statusCode = 200) => {
    return http.post(`${BASE_URL}/v2/checkout/orders`, async () => {
      return HttpResponse.json(data, { status: statusCode });
    });
  };

  beforeAll(() => {
    mockWorker = setupServer(makeMockOrdersHandler(), makeMockAuthHandler());
    mockWorker.listen();
  });

  beforeEach(() => {
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

  it("createAccessToken should return a valid token", async () => {
    const result = await createAccessToken("testClient");

    expect(result).toEqual(expectedToken);
  });

  it("createAccessToken should throw invalid client argument error", async () => {
    await expect(() => createAccessToken(invalidClientId)).rejects.toThrowError(
      /Auth Api invalid client id:/
    );
  });

  it("createAccessToken should return an error message when response is an empty object", async () => {
    await expect(() =>
      createAccessToken(emptyResponseClientId)
    ).rejects.toThrow(/Auth Api response error:/);
  });

  it("createOrder should throw an error when clientId is null", async () => {
    expect(() => createOrder(null)).toThrowError(/Client ID not passed/);
  });

  it("createOrder should throw an error when order is null", async () => {
    expect(() => createOrder("testClient")).toThrow(
      /Expected order details to be passed/
    );
  });

  it("createOrder should throw an error when order intent does not match with query parameters intent", async () => {
    const expectedErrorMessage =
      "Unexpected intent: authorize passed to order.create. Please ensure you are passing /sdk/js?intent=authorize in the paypal script tag.";

    order.intent = "authorize";

    expect(() => createOrder("testClient", order)).toThrowError(
      expectedErrorMessage
    );
  });

  it("createOrder should throw an error when order currency does not match with query parameters currency", async () => {
    const expectedErrorMessage =
      "Unexpected currency: AUD passed to order.create. Please ensure you are passing /sdk/js?currency=AUD in the paypal script tag.";
    order.purchase_units[0].amount.currency_code = "AUD";

    expect(() => createOrder("testClient", order)).toThrow(
      expectedErrorMessage
    );
  });

  it("createOrder should throw an error when order identifier is not in the server response", async () => {
    const expectedErrorMessage = "Order Api response error:";

    await expect(() => createOrder("testClient", order)).rejects.toThrow(
      expectedErrorMessage
    );
  });

  it("createOrder should return a valid orderId", async () => {
    // TODO: need to adapt this function to split within the msw worker like for the auth endpoint
    // unless this is the default?
    const expectedOrderId = "9BL31648CM342010L";
    const mockOrderResponse = {
      id: expectedOrderId,
      status: "CREATED",
      links: [],
    };
    mockWorker.use(makeMockOrdersHandler(mockOrderResponse));

    const result = await createOrder("testClient", order);
    expect(result).toEqual(expectedOrderId);
  });
});
