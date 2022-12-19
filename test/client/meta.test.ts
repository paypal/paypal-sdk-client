import { describe, it } from "vitest";

import { getSDKMeta, insertMockSDKScript } from "../../src";

describe(`meta cases`, () => {
  it("should successfully create a meta payload", () => {
    const expectedUrl = insertMockSDKScript({
      query: {
        "client-id": "foobar",
      },
    });
    const meta = getSDKMeta();

    if (!meta) {
      throw new Error(`Expected meta string to be returned`);
    }

    const { url } = JSON.parse(window.atob(meta));

    if (url !== expectedUrl) {
      throw new Error(
        `Expected sdk url to be ${expectedUrl}, got ${url as string}`
      );
    }
  });
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

    if (!meta) {
      throw new Error(`Expected meta string to be returned`);
    }

    const {
      attrs: { "data-merchant-id": merchantIds },
    } = JSON.parse(window.atob(meta));

    if (merchantIds !== expectedMerchantIds) {
      throw new Error(
        `Expected sdk merchant ids to be ${expectedMerchantIds}, got ${
          merchantIds as string
        }`
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
        `Expected sdk dataPopupDisabled to be true , got ${
          dataPopupDisabled as string
        }`
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
        `Expected sdk data-csp-nonce to be ${dataCSPNonce}, got ${
          nonce as string
        }`
      );
    }
  });
});
