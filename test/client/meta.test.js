/* @flow */
import { describe, it, vi, expect } from "vitest";

import { getSDKMeta, insertMockSDKScript } from "../../src";

const mockScriptSrc = "https://test.paypal.com/sdk/js?client-id=foobar";
vi.mock("@krakenjs/belter/src", async () => {
  const actual = await vi.importActual("@krakenjs/belter/src");
  return {
    ...actual,
    getCurrentScript: vi.fn(() => ({
      src: mockScriptSrc,
      attributes: [],
      hasAttribute: vi.fn(),
      getAttribute: vi.fn(function (param) {
        return this[param];
      }),
    })),
  };
});

describe.skip(`meta cases`, () => {
  it("should successfully create a meta payload with script src url", () => {
    const meta = getSDKMeta();

    expect(meta).toEqual(expect.any(String));
    const { url } = JSON.parse(window.atob(meta));
    expect(url).toEqual(mockScriptSrc);
  });

  // TODO: do we need a special sdk script mock? Like `insertMockSDKScript` but less involved?
  // Can we do it at a global level and edit it?
  it("should successfully create a meta payload with merchant id", () => {
    const expectedMerchantIds = "abcd1234,abcd5678";

    insertMockSDKScript({
      query: {
        "client-id": "foobar",
        "merchant-id": "*",
      },
      attributes: {
        "data-merchant-id": expectedMerchantIds,
      },
    });

    const meta = getSDKMeta();

    const {
      attrs: { "data-merchant-id": merchantIds },
    } = JSON.parse(window.atob(meta));

    if (merchantIds !== expectedMerchantIds) {
      throw new Error(
        `Expected sdk merchant ids to be ${expectedMerchantIds}, got ${merchantIds}`
      );
    }
  });

  it("should construct a valid script url with data-popups-disabled attribute", () => {
    insertMockSDKScript({
      query: {
        "client-id": "foobar",
      },
      attributes: {
        "data-popups-disabled": "true",
      },
    });

    const meta = getSDKMeta();

    if (!meta) {
      throw new Error(`Expected meta string to be returned`);
    }

    const {
      attrs: { "data-popups-disabled": dataPopupDisabled },
    } = JSON.parse(window.atob(meta));

    if (dataPopupDisabled !== "true") {
      throw new Error(
        `Expected sdk dataPopupDisabled to be true , got ${dataPopupDisabled}`
      );
    }
  });

  it("should successfully create a meta payload with data-csp-nonce", () => {
    const dataCSPNonce = "12345";

    insertMockSDKScript({
      query: {
        "client-id": "foobar",
      },
      attributes: {
        "data-csp-nonce": dataCSPNonce,
      },
    });

    const meta = getSDKMeta();

    if (!meta) {
      throw new Error(`Expected meta string to be returned`);
    }

    const {
      attrs: { "data-csp-nonce": nonce },
    } = JSON.parse(window.atob(meta));

    if (nonce !== dataCSPNonce) {
      throw new Error(
        `Expected sdk data-csp-nonce to be ${dataCSPNonce}, got ${nonce}`
      );
    }
  });
});
