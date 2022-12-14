import { describe, it } from "vitest";

import {
  getScriptUrl,
  getEnableFunding,
  getDisableFunding,
  getDisableCard,
  getBuyerCountry,
  getAmount,
  getUserIDToken,
  getCSPNonce,
  getEnableThreeDomainSecure,
  getUserExperienceFlow,
  isChildWindow,
} from "../../src/script";
import { insertMockSDKScript } from "../../src";

describe(`script utils cases`, () => {
  it("getScriptUrl should return the src of the script element", () => {
    const result = getScriptUrl();

    if (result !== "https://test.paypal.com/sdk/js?client-id=abcxyz123") {
      throw new Error(
        `should found the script src "https://test.paypal.com/sdk/js?client-id=abcxyz123", but got: ${result}`
      );
    }
  });
  it("getEnableFunding should return an empty array  when enable-funding is not configure", () => {
    const result = getEnableFunding();

    if (result.length > 0) {
      throw new Error(
        `should return and empty array, but got: ${result.toString()}`
      );
    }
  });
  it("getEnableFunding should return a valid array when enable-funding is configure", () => {
    insertMockSDKScript({
      query: {
        "enable-funding": "paypal",
      },
    });
    const result = getEnableFunding();

    if (result[0] !== "paypal") {
      throw new Error(
        `should return a valid array ["paypal"], but got: ${result.toString()}`
      );
    }
  });
  it("getDisableFunding should return an empty array  when disable-funding is not configure", () => {
    const result = getDisableFunding();

    if (result.length > 0) {
      throw new Error(
        `should return and empty array, but got: ${result.toString()}`
      );
    }
  });
  it("getDisableFunding should return a valid array when disable-funding is configure", () => {
    insertMockSDKScript({
      query: {
        "disable-funding": "paypal",
      },
    });
    const result = getDisableFunding();

    if (result[0] !== "paypal") {
      throw new Error(
        `should return a valid array ["paypal"], but got: ${result.toString()}`
      );
    }
  });
  it("getDisableCard should return an empty array  when disable-card is not configure", () => {
    const result = getDisableCard();

    if (result.length > 0) {
      throw new Error(
        `should return and empty array, but got: ${result.toString()}`
      );
    }
  });
  it("getDisableCard should return a valid array when disable-card is configure", () => {
    insertMockSDKScript({
      query: {
        "disable-card": "paypal",
      },
    });
    const result = getDisableCard();

    if (result[0] !== "paypal") {
      throw new Error(
        `should return a valid array ["paypal"], but got: ${result.toString()}`
      );
    }
  });
  it("getBuyerCountry should return the buyer country", () => {
    insertMockSDKScript({
      query: {
        "buyer-country": "US",
      },
    });
    const result = getBuyerCountry();

    if (result !== "US") {
      throw new Error(
        `should return US as the buyer country, but got: ${String(result)}`
      );
    }
  });
  it("getAmount should return and error when the amount format is not correct", () => {
    insertMockSDKScript({
      attributes: {
        "data-amount": "10",
      },
    });

    try {
      getAmount();
    } catch (err) {
      if ((err as Error).message !== "Invalid amount: 10") {
        throw new Error(
          `should throw an Error with incorrect amount format message`
        );
      }
    }
  });
  it("getAmount should return the amount", () => {
    insertMockSDKScript({
      attributes: {
        "data-amount": "10.00",
      },
    });
    const result = getAmount();

    if (result !== "10.00") {
      throw new Error(
        `should return an amount equals to "10.00", but got: ${String(result)}`
      );
    }
  });
  it("getUserIDToken return a token string", () => {
    insertMockSDKScript({
      attributes: {
        "data-user-id-token": "token",
      },
    });
    const result = getUserIDToken();

    if (result !== "token") {
      throw new Error(
        `should return the "token" word, but got: ${String(result)}`
      );
    }
  });
  it("getCSPNonce should return a data-csp-nonce string", () => {
    insertMockSDKScript({
      attributes: {
        "data-csp-nonce": "csp-none",
      },
    });
    const result = getCSPNonce();

    if (result !== "csp-none") {
      throw new Error(
        `should return the "csp-none" word, but got: ${String(result)}`
      );
    }
  });
  it('getEnableThreeDomainSecure should return "true"', () => {
    insertMockSDKScript({
      attributes: {
        "data-enable-3ds": "true",
      },
    });
    const result = getEnableThreeDomainSecure();

    if (!result) {
      throw new Error(
        `should has enable the three domain secure, but got: ${String(result)}`
      );
    }
  });
  it("getUserExperienceFlow should return a valid string", () => {
    insertMockSDKScript({
      attributes: {
        "data-user-experience-flow": "flow",
      },
    });
    const result = getUserExperienceFlow();

    if (result !== "flow") {
      throw new Error(`should the "flow" word, but got: ${String(result)}`);
    }
  });
  it('isChildWindow should return "false" when is not a child zoid window', () => {
    const result = isChildWindow();

    if (result) {
      throw new Error(
        `shouldn't be a child zoid window, but got: ${String(result)}`
      );
    }
  });
});
