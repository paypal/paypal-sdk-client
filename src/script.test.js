/* @flow */
/* eslint max-lines: off */
import { describe, it, afterEach, beforeEach, expect, vi } from "vitest";
import { base64encode, getCurrentScript, memoize } from "@krakenjs/belter/src";

import { makeMockScriptElement } from "../test/helpers";

import {
  getClientID,
  getIntent,
  getCurrency,
  getVault,
  getCommit,
  getClientToken,
  getPartnerAttributionID,
  getMerchantID,
  getClientAccessToken,
  getSDKIntegrationSource,
  getPageType,
  getLocale,
  getMerchantRequestedPopupsDisabled,
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
} from "./script";
import { CLIENT_ID_ALIAS } from "./config";

const clientId = "foobar123";
const mockScriptSrc = `https://test.paypal.com/sdk/js?client-id=${clientId}`;

vi.mock("@krakenjs/belter/src", async () => {
  const actual = await vi.importActual("@krakenjs/belter/src");
  return {
    ...actual,
    getCurrentScript: vi.fn(() => {
      return makeMockScriptElement(mockScriptSrc);
    }),
  };
});

describe(`script cases`, () => {
  beforeEach(() => {
    Object.defineProperty(window.navigator, "languages", {
      value: [],
      writable: true,
    });
    Object.defineProperty(window.navigator, "language", {
      value: "",
      writable: true,
    });
  });

  afterEach(() => {
    memoize.clear();
    vi.clearAllMocks();
  });

  it("should successfully get a client id", () => {
    expect(getClientID()).toEqual(clientId);
  });

  it("should error out when client id not passed", () => {
    // $FlowIgnore
    getCurrentScript.mockReturnValue(
      makeMockScriptElement("https://test.paypal.com/sdk/js?")
    );
    expect(getClientID).toThrow("Expected client-id parameter in sdk url");
  });

  it("should successfully get a client id alias", () => {
    const clientID = "sb";
    // $FlowIgnore
    getCurrentScript.mockReturnValue(
      makeMockScriptElement(
        `https://test.paypal.com/sdk/js?client-id=${clientID}`
      )
    );
    expect(getClientID()).toEqual(CLIENT_ID_ALIAS[clientID]);
  });

  it("should successfully get a merchant id", () => {
    const merchantID = "abc987";
    const sdkUrl = `${mockScriptSrc}&merchant-id=${merchantID}`;
    // $FlowIgnore
    getCurrentScript.mockReturnValue(makeMockScriptElement(sdkUrl));

    const mID = getMerchantID();
    expect(mID[0]).toEqual(merchantID);
  });

  it("should error out when merchant-id is * but data-merchant-id not passed", () => {
    const merchantID = "*";
    const sdkUrl = `${mockScriptSrc}&merchant-id=${merchantID}`;
    // $FlowIgnore
    getCurrentScript.mockReturnValue(makeMockScriptElement(sdkUrl));

    expect(getMerchantID).toThrow(
      `Must pass data-merchant-id when merchant-id=${merchantID} passed in url`
    );
  });

  it("should error out when merchant-id is * but only one merchant id in data-merchant-id", () => {
    const merchantID = "*";
    const dataMerchantIDs = "abc123";
    const sdkUrl = `${mockScriptSrc}&merchant-id=${merchantID}`;
    const mockElement = makeMockScriptElement(sdkUrl);
    mockElement.setAttribute("data-merchant-id", dataMerchantIDs);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getMerchantID).toThrow(
      "Must pass multiple merchant ids to data-merchant-id. If passing a single id, pass merchant-id=XYZ in url"
    );
  });

  it("should error out when merchant-id is * but duplicated merchant id in data-merchant-id", () => {
    const merchantID = "*";
    const dataMerchantIDs = "abc123,abc456,abc123";
    const sdkUrl = `${mockScriptSrc}&merchant-id=${merchantID}`;
    const mockElement = makeMockScriptElement(sdkUrl);
    mockElement.setAttribute("data-merchant-id", dataMerchantIDs);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getMerchantID).toThrow(
      "Duplicates data-merchant-id. Must pass unique merchant ids to data-merchant-id."
    );
  });

  it("should successfully get merchant ids", () => {
    const merchantID = "*";
    const dataMerchantIDs = "abc123,abc345";

    const sdkUrl = `${mockScriptSrc}&merchant-id=${merchantID}`;
    const mockElement = makeMockScriptElement(sdkUrl);
    mockElement.setAttribute("data-merchant-id", dataMerchantIDs);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getMerchantID().join()).toEqual(dataMerchantIDs);
  });

  it("should successfully get an intent", () => {
    const intent = "authorize";
    const sdkUrl = `${mockScriptSrc}&intent=${intent}`;
    const mockElement = makeMockScriptElement(sdkUrl);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getIntent()).toEqual(intent);
  });

  it("should successfully get a currency", () => {
    const currency = "EUR";
    const sdkUrl = `${mockScriptSrc}&currency=${currency}`;
    const mockElement = makeMockScriptElement(sdkUrl);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getCurrency()).toEqual(currency);
  });

  it("should successfully get vault", () => {
    const vault = true;
    const sdkUrl = `${mockScriptSrc}&vault=${vault.toString()}`;
    const mockElement = makeMockScriptElement(sdkUrl);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getVault()).toEqual(vault);
  });

  it("should successfully get commit", () => {
    const commit = false;

    const sdkUrl = `${mockScriptSrc}&commit=${commit.toString()}`;
    const mockElement = makeMockScriptElement(sdkUrl);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getCommit()).toEqual(commit);
  });

  it("should successfully get client token", () => {
    const clientToken = "abc-xyz-123";

    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute("data-client-token", clientToken);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getClientToken()).toEqual(clientToken);
  });

  it("should not error out when client token not passed", () => {
    const mockElement = makeMockScriptElement(mockScriptSrc);

    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getClientToken()).toBeUndefined();
  });

  it("should successfully get client access token", () => {
    const clientAccessToken = "abc12354321";
    const clientToken = base64encode(
      JSON.stringify({
        paypal: {
          accessToken: clientAccessToken,
        },
      })
    );

    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute("data-client-token", clientToken);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getClientAccessToken()).toEqual(clientAccessToken);
  });

  it("should successfully get partner attribution id", () => {
    const partnerAttributionID = "abc-xyz-123";
    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute(
      "data-partner-attribution-id",
      partnerAttributionID
    );
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getPartnerAttributionID()).toEqual(partnerAttributionID);
  });

  it("should successfully get sdk integration source", () => {
    const SDKIntegrationSource = "spbf";
    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute(
      "data-sdk-integration-source",
      SDKIntegrationSource
    );
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getSDKIntegrationSource()).toEqual(SDKIntegrationSource);
  });

  it("should successfully get popup disabled attribute as true when set to true", () => {
    const popupsDisabled = true;
    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute("data-popups-disabled", popupsDisabled.toString());
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getMerchantRequestedPopupsDisabled()).toEqual(popupsDisabled);
  });

  it("should successfully get popup disabled attribute as false when set to false", () => {
    const popupsDisabled = false;
    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute("data-popups-disabled", popupsDisabled.toString());
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getMerchantRequestedPopupsDisabled()).toEqual(popupsDisabled);
  });

  it("should successfully get popup disabled attribute as false when not set", () => {
    const expectedPopupsDisabled = false;
    const mockElement = makeMockScriptElement(mockScriptSrc);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getMerchantRequestedPopupsDisabled()).toEqual(
      expectedPopupsDisabled
    );
  });

  it("should successfully get the page type", () => {
    const pageType = "home";
    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute("data-page-type", pageType);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getPageType()).toEqual(pageType);
  });

  it("should successfully get the page type if not same case", () => {
    const pageType = "Home";
    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute("data-page-type", pageType);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getPageType()).toEqual(pageType.toLowerCase());
  });

  it("should throw error if invalid page type", () => {
    const pageType = "abc";
    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute("data-page-type", pageType);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getPageType).toThrow(`Invalid page type, '${pageType}'`);
  });

  it("should default to empty page-type if none provided", () => {
    const mockElement = makeMockScriptElement(mockScriptSrc);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    expect(getPageType()).toEqual("");
  });

  it("should successfully get locale from script", () => {
    const expectedLocale = "es_ES";

    const sdkUrl = `${mockScriptSrc}&locale=${expectedLocale}`;
    const mockElement = makeMockScriptElement(sdkUrl);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);
    const result = getLocale();
    const receivedLocal = `${result.lang}_${result.country}`;
    expect(receivedLocal).toEqual(expectedLocale);
  });

  it("should successfully get locale from browser settings", () => {
    const expectedLocale = "fr_FR";
    window.navigator.languages = [expectedLocale]; // eslint-disable-line compat/compat

    const mockElement = makeMockScriptElement(mockScriptSrc);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);
    const result = getLocale();
    const receivedLocal = `${result.lang}_${result.country}`;
    expect(receivedLocal).toEqual(expectedLocale);
  });

  it("should infer locale country from language", () => {
    const expectedLocale = "ja_JP";
    window.navigator.languages = ["ja"]; // eslint-disable-line compat/compat

    const mockElement = makeMockScriptElement(mockScriptSrc);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);
    const result = getLocale();
    const receivedLocal = `${result.lang}_${result.country}`;
    expect(receivedLocal).toEqual(expectedLocale);
  });

  it("should return default if unable to infer locale country", () => {
    const expectedLocale = "en_US";
    window.navigator.languages = ["es"]; // eslint-disable-line compat/compat

    const mockElement = makeMockScriptElement(mockScriptSrc);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);
    const result = getLocale();
    const receivedLocal = `${result.lang}_${result.country}`;
    expect(receivedLocal).toEqual(expectedLocale);
  });

  it("should return default locale if none detected", () => {
    const expectedLocale = "en_US";

    const mockElement = makeMockScriptElement(mockScriptSrc);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);
    const result = getLocale();
    const receivedLocal = `${result.lang}_${result.country}`;
    expect(receivedLocal).toEqual(expectedLocale);
  });

  it("should return default locale from country when only country was detected", () => {
    window.navigator.languages = ["zz_US"]; // eslint-disable-line compat/compat
    window.navigator.language = undefined;
    const expectedLocale = "en_US";

    const mockElement = makeMockScriptElement(mockScriptSrc);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);
    const result = getLocale();
    const receivedLocal = `${result.lang}_${result.country}`;
    expect(receivedLocal).toEqual(expectedLocale);
  });

  it("should return computed lang when locale is zh_HK", () => {
    const expectedLang = "zh_Hant";
    const inputLocale = "zh_HK";
    const sdkUrl = `${mockScriptSrc}&locale=${inputLocale}`;
    const mockElement = makeMockScriptElement(sdkUrl);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);
    const result = getLocale();
    expect(result.lang).toEqual(expectedLang);
  });

  it("should return the right computed lang when locale is en_Hk", () => {
    const expectedLang = "en";

    const inputLocale = `${expectedLang}_HK`;
    const sdkUrl = `${mockScriptSrc}&locale=${inputLocale}`;
    const mockElement = makeMockScriptElement(sdkUrl);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);
    const result = getLocale();
    expect(result.lang).toEqual(expectedLang);
  });

  it("getScriptUrl should return the src of the script element", () => {
    const mockElement = makeMockScriptElement(mockScriptSrc);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);
    const result = getScriptUrl();

    expect(result).toEqual(mockScriptSrc);
  });

  describe("getEnableFunding()", () => {
    it("getEnableFunding should return an empty array when enable-funding is not configure", () => {
      const result = getEnableFunding();
      expect(result).toEqual([]);
    });

    it("getEnableFunding should return a valid array when enable-funding is configure", () => {
      const expectedFunding = "paypal";
      const sdkUrl = `${mockScriptSrc}&enable-funding=${expectedFunding}`;
      const mockElement = makeMockScriptElement(sdkUrl);
      // $FlowIgnore
      getCurrentScript.mockReturnValue(mockElement);

      const result = getEnableFunding();
      expect(result).toEqual([expectedFunding]);
    });
  });
  describe("getDisableFunding()", () => {
    it("getDisableFunding should return an empty array when disable-funding is not configure", () => {
      const result = getDisableFunding();

      expect(result).toEqual([]);
    });

    it("getDisableFunding should return a valid array when disable-funding is configure", () => {
      const disableFunding = "paypal";
      const sdkUrl = `${mockScriptSrc}&disable-funding=${disableFunding}`;
      const mockElement = makeMockScriptElement(sdkUrl);
      // $FlowIgnore
      getCurrentScript.mockReturnValue(mockElement);

      const result = getDisableFunding();
      expect(result).toEqual([disableFunding]);
    });
  });

  describe("getDisableCard", () => {
    it("getDisableCard should return an empty array  when disable-card is not configure", () => {
      const result = getDisableCard();
      expect(result).toEqual([]);
    });

    it("getDisableCard should return a valid array when disable-card is configure", () => {
      const disableCard = "paypal";
      const sdkUrl = `${mockScriptSrc}&disable-card=${disableCard}`;
      const mockElement = makeMockScriptElement(sdkUrl);
      // $FlowIgnore
      getCurrentScript.mockReturnValue(mockElement);
      const result = getDisableCard();
      expect(result).toEqual([disableCard]);
    });
  });

  describe("getBuyerCountry()", () => {
    it("getBuyerCountry should return the buyer country", () => {
      const buyerCountry = "US";
      const sdkUrl = `${mockScriptSrc}&buyer-country=${buyerCountry}`;
      const mockElement = makeMockScriptElement(sdkUrl);
      // $FlowIgnore
      getCurrentScript.mockReturnValue(mockElement);

      const result = getBuyerCountry();
      expect(result).toEqual(buyerCountry);
    });
  });

  describe("getAmount()", () => {
    it("getAmount should return and error when the amount format is not correct", () => {
      const inputAmount = 10;
      const mockElement = makeMockScriptElement(mockScriptSrc);
      mockElement.setAttribute("data-amount", inputAmount.toString());
      // $FlowIgnore
      getCurrentScript.mockReturnValue(mockElement);

      expect(getAmount).toThrow(`Invalid amount: ${inputAmount}`);
    });

    it("getAmount should return the amount", () => {
      const inputAmount = "10.00";
      const mockElement = makeMockScriptElement(mockScriptSrc);
      mockElement.setAttribute("data-amount", inputAmount);
      // $FlowIgnore
      getCurrentScript.mockReturnValue(mockElement);

      const result = getAmount();
      expect(result).toEqual(inputAmount);
    });
  });

  it("getUserIDToken return a token string", () => {
    const inputToken = "some-token";
    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute("data-user-id-token", inputToken);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    const result = getUserIDToken();
    expect(result).toEqual(inputToken);
  });

  it("getCSPNonce should return a data-csp-nonce string", () => {
    const inputCspNonce = "some-csp-nonce";
    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute("data-csp-nonce", inputCspNonce);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    const result = getCSPNonce();
    expect(result).toEqual(inputCspNonce);
  });

  it('getEnableThreeDomainSecure should return "true"', () => {
    const inputEnable3DS = true;
    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute("data-enable-3ds", inputEnable3DS.toString());
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    const result = getEnableThreeDomainSecure();
    expect(result).toEqual(inputEnable3DS);
  });

  it("getUserExperienceFlow should return a valid string", () => {
    const inputUserFlow = "flow";
    const mockElement = makeMockScriptElement(mockScriptSrc);
    mockElement.setAttribute("data-user-experience-flow", inputUserFlow);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    const result = getUserExperienceFlow();
    expect(result).toEqual(inputUserFlow);
  });

  it('isChildWindow should return "false" when is not a child zoid window', () => {
    const result = isChildWindow();
    expect(result).toEqual(false);
  });
});
