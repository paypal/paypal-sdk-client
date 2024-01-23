/* @flow */
import { describe, it, vi, beforeEach, expect } from "vitest";
import { getCurrentScript, memoize } from "@krakenjs/belter/src";

import { makeMockScriptElement } from "../test/helpers";

import { getSDKMeta } from "./meta";

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

describe(`meta cases`, () => {
  beforeEach(() => {
    memoize.clear();
    vi.clearAllMocks();
  });

  it("should successfully create a meta payload with script src url", () => {
    const meta = getSDKMeta();

    expect(meta).toEqual(expect.any(String));
    const { url } = JSON.parse(window.atob(meta));
    expect(url).toEqual(mockScriptSrc);
  });

  it("should successfully create a meta payload with merchant id", () => {
    const expectedMerchantIds = "abcd1234,abcd5678";
    const merchantIdKey = "data-merchant-id";
    const sdkUrl = `${mockScriptSrc}&${merchantIdKey}=*`;
    const mockElement = makeMockScriptElement(sdkUrl);
    mockElement.setAttribute(merchantIdKey, expectedMerchantIds);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    const meta = getSDKMeta();
    const resultMeta = JSON.parse(window.atob(meta));
    expect(resultMeta.attrs).toEqual(
      expect.objectContaining({
        [merchantIdKey]: expectedMerchantIds,
      })
    );
  });

  it("should construct a valid script url with data-popups-disabled attribute", () => {
    const disablePops = true;
    const popupsDisabledKey = "data-popups-disabled";
    const sdkUrl = `${mockScriptSrc}&${popupsDisabledKey}=${disablePops.toString()}`;
    const mockElement = makeMockScriptElement(sdkUrl);
    mockElement.setAttribute(popupsDisabledKey, disablePops.toString());
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    const meta = getSDKMeta();

    const resultMeta = JSON.parse(window.atob(meta));
    expect(resultMeta.attrs[popupsDisabledKey]).toEqual(disablePops.toString());
  });

  it("should successfully create a meta payload with data-csp-nonce", () => {
    const dataCSPNonce = "12345";
    const cspNonceKey = "data-csp-nonce";
    const sdkUrl = `${mockScriptSrc}&${cspNonceKey}=${dataCSPNonce}`;
    const mockElement = makeMockScriptElement(sdkUrl);
    mockElement.setAttribute(cspNonceKey, dataCSPNonce);
    // $FlowIgnore
    getCurrentScript.mockReturnValue(mockElement);

    const meta = getSDKMeta();
    const resultMeta = JSON.parse(window.atob(meta));
    expect(resultMeta.attrs[cspNonceKey]).toEqual(dataCSPNonce);
  });
});
