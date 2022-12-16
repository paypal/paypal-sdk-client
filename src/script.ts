import {
  getCurrentScriptUID,
  ATTRIBUTES,
  parseQuery,
  getBrowserLocales,
  base64decode,
  values,
  getCurrentScript,
  memoize,
  stringifyError,
  getScript,
} from "@krakenjs/belter/dist/esm";
import type {
  LocaleType,
  COMMIT,
  VAULT,
  CURRENCY,
  FUNDING,
  CARD,
} from "@paypal/sdk-constants/dist/esm";
import {
  COUNTRY,
  SDK_SETTINGS,
  SDK_QUERY_KEYS,
  INTENT,
  COUNTRY_LANGS,
  DEFAULT_INTENT,
  DEFAULT_CURRENCY,
  DEFAULT_VAULT,
  QUERY_BOOL,
  LANG,
  DEFAULT_SALE_COMMIT,
  DEFAULT_NONSALE_COMMIT,
  PAGE_TYPES,
} from "@paypal/sdk-constants/dist/esm";

import { __TEST__ } from "./declarations";
import { getPath, getDefaultNamespace, getSDKHost } from "./global";
import { CLIENT_ID_ALIAS } from "./config";
import { getComputedLocales } from "./utils";

type GetSDKScript = () => HTMLScriptElement;
export const getSDKScript: GetSDKScript = memoize(() => {
  if (__TEST__) {
    const script = getScript({
      host: getSDKHost(),
      path: getPath(),
      reverse: true,
    });

    if (!script) {
      throw new Error(`Can not find SDK test script`);
    }

    return script;
  }

  try {
    return getCurrentScript();
  } catch (err) {
    throw new Error(
      `PayPal Payments SDK script not found on page! Expected to find <script src="https://${getSDKHost()}${getPath()}">\n\n${
        stringifyError(err) as string
      }`
    );
  }
});
type GetSDKAttributes = () => Record<string, string>;
export const getSDKAttributes: GetSDKAttributes = memoize(() => {
  const sdkScript = getSDKScript();
  const result = {};

  for (const [name, value] of Object.entries(sdkScript.attributes)) {
    if (name.startsWith("data-")) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      result[parseInt(name)] = value;
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  result[ATTRIBUTES.UID] = getCurrentScriptUID();
  return result;
});
export function getSDKAttribute<T extends string | void>(
  name: typeof SDK_SETTINGS[keyof typeof SDK_SETTINGS],
  def?: T
): string | T | undefined {
  return getSDKAttributes()[parseInt(name)] || def;
}

export function getSDKQueryParams(): Record<string, string> {
  const script = getSDKScript();
  return parseQuery(script.src.split("?")[1] || "");
}

type GetSDKQueryParam = (<T extends string>(
  arg0: typeof SDK_QUERY_KEYS[keyof typeof SDK_QUERY_KEYS]
) => T | void) &
  (<T extends string>(
    arg0: typeof SDK_QUERY_KEYS[keyof typeof SDK_QUERY_KEYS],
    arg1: T
  ) => T);
// @ts-expect-error will fix later
export const getSDKQueryParam: GetSDKQueryParam = <T>(name: string, def: T) => {
  return getSDKQueryParams()[parseInt(name)] || def;
};

export function getScriptUrl(): string {
  const src = getSDKScript().getAttribute("src");

  if (!src) {
    throw new Error(`Can not find src for sdk script`);
  }

  return src;
}

export function getSDKQueryParamBool<T extends boolean>(
  name: typeof SDK_QUERY_KEYS[typeof SDK_QUERY_KEYS],
  def?: T
): boolean | T {
  return (
    getSDKQueryParam(name, def ? def.toString() : QUERY_BOOL.FALSE) ===
    QUERY_BOOL.TRUE
  );
}

export function getClientID(): string {
  const clientID = getSDKQueryParam(SDK_QUERY_KEYS.CLIENT_ID);

  if (!clientID) {
    throw new Error(
      `Expected ${SDK_QUERY_KEYS.CLIENT_ID as string} parameter in sdk url`
    );
  }

  if (CLIENT_ID_ALIAS[clientID as keyof typeof CLIENT_ID_ALIAS]) {
    return CLIENT_ID_ALIAS[clientID as keyof typeof CLIENT_ID_ALIAS];
  }

  return clientID;
}

export function getMerchantID(): readonly string[] {
  const merchantIDString = getSDKQueryParam(SDK_QUERY_KEYS.MERCHANT_ID);

  if (merchantIDString === "*") {
    // get multiple merchant ids or emails from data-merchant-id
    const merchantIDAttribute = getSDKAttribute(
      SDK_SETTINGS.MERCHANT_ID,
      undefined
    );

    if (!merchantIDAttribute) {
      throw new Error(
        `Must pass ${SDK_SETTINGS.MERCHANT_ID as string} when ${
          SDK_QUERY_KEYS.MERCHANT_ID as string
        }=* passed in url`
      );
    }

    const merchantID = merchantIDAttribute.split(",");

    if (merchantID.length <= 1) {
      throw new Error(
        `Must pass multiple merchant ids to ${
          SDK_SETTINGS.MERCHANT_ID as string
        }. If passing a single id, pass ${
          SDK_QUERY_KEYS.MERCHANT_ID as string
        }=XYZ in url`
      );
    }

    // check duplicates
    const hasDuplicate = merchantID.some(
      (val, i) => merchantID && merchantID.indexOf(val) !== i
    );

    if (hasDuplicate) {
      throw new Error(
        `Duplicates ${
          SDK_SETTINGS.MERCHANT_ID as string
        }. Must pass unique merchant ids to ${
          SDK_SETTINGS.MERCHANT_ID as string
        }.`
      );
    }

    return merchantID;
  }

  if (merchantIDString) {
    return merchantIDString.split(",");
  }

  return [];
}

export function getIntent(): typeof INTENT[typeof INTENT] {
  return getSDKQueryParam(SDK_QUERY_KEYS.INTENT, DEFAULT_INTENT);
}

export function getCommit(): typeof COMMIT[keyof typeof COMMIT] {
  return getSDKQueryParamBool(
    SDK_QUERY_KEYS.COMMIT,
    getIntent() === INTENT.CAPTURE
      ? DEFAULT_SALE_COMMIT
      : DEFAULT_NONSALE_COMMIT
  );
}

export function getVault(): typeof VAULT[keyof typeof VAULT] {
  return getSDKQueryParamBool(SDK_QUERY_KEYS.VAULT, DEFAULT_VAULT);
}

export function getCurrency(): typeof CURRENCY[keyof typeof CURRENCY] {
  return getSDKQueryParam(SDK_QUERY_KEYS.CURRENCY, DEFAULT_CURRENCY);
}

export function getEnableFunding(): ReadonlyArray<
  typeof FUNDING[keyof typeof FUNDING]
> {
  const funding = getSDKQueryParam(SDK_QUERY_KEYS.ENABLE_FUNDING);

  if (funding) {
    return funding.split(",");
  }

  return [];
}

export function getDisableFunding(): ReadonlyArray<
  typeof FUNDING[keyof typeof FUNDING]
> {
  const funding = getSDKQueryParam(SDK_QUERY_KEYS.DISABLE_FUNDING);

  if (funding) {
    return funding.split(",");
  }

  return [];
}

export function getDisableCard(): ReadonlyArray<
  typeof CARD[keyof typeof CARD]
> {
  const funding = getSDKQueryParam(SDK_QUERY_KEYS.DISABLE_CARD);

  if (funding) {
    return funding.split(",");
  }

  return [];
}

export function getBuyerCountry(): typeof COUNTRY[typeof COUNTRY] {
  return getSDKQueryParam(SDK_QUERY_KEYS.BUYER_COUNTRY);
}

export function getNamespace(): string {
  return getSDKAttribute(SDK_SETTINGS.NAMESPACE) ?? getDefaultNamespace();
}

export function getClientToken(): string | void {
  return getSDKAttribute(SDK_SETTINGS.CLIENT_TOKEN);
}

export function getAmount(): string | undefined | void {
  const amount = getSDKAttribute(SDK_SETTINGS.AMOUNT);

  if (amount && !/^\d+\.\d\d$/.exec(amount)) {
    throw new Error(`Invalid amount: ${amount}`);
  }

  return amount;
}

export function getUserIDToken(): string | void {
  return getSDKAttribute(SDK_SETTINGS.USER_ID_TOKEN);
}

export function getClientAccessToken(): string | undefined {
  const clientToken = getClientToken();

  if (clientToken) {
    return JSON.parse(base64decode(clientToken)).paypal.accessToken;
  }
}

export function getPartnerAttributionID(): string | undefined {
  return getSDKAttribute(SDK_SETTINGS.PARTNER_ATTRIBUTION_ID, undefined);
}

export function getMerchantRequestedPopupsDisabled(): boolean {
  return getSDKAttribute(SDK_SETTINGS.POPUPS_DISABLED, undefined) === "true";
}

export function getPageType(): string | undefined {
  const pageType = getSDKAttribute(SDK_SETTINGS.PAGE_TYPE, "");
  const validPageType = values(PAGE_TYPES).includes(pageType?.toLowerCase());

  if (!validPageType && pageType?.length) {
    throw new Error(`Invalid page type, '${pageType}'`);
  }

  return pageType?.toLowerCase();
}

export function getLocale(): typeof LocaleType {
  const locale = getSDKQueryParam(SDK_QUERY_KEYS.LOCALE);

  if (locale) {
    return getComputedLocales(locale);
  }

  for (let { country, lang } of getBrowserLocales()) {
    country = country && COUNTRY[parseInt(country)];
    lang = lang && LANG[lang.toUpperCase()];

    if (
      country &&
      lang &&
      COUNTRY_LANGS?.[parseInt(country)]?.indexOf(lang) !== -1
    ) {
      return {
        country,
        lang,
      };
    } else if (lang) {
      // We infer country from language if there is only one possible country match
      const possibleCountries = Object.keys(COUNTRY_LANGS).filter((c) =>
        COUNTRY_LANGS[parseInt(c)].some((l: any) => l === lang)
      );

      if (possibleCountries.length === 1) {
        const possibleCountry = possibleCountries[0];
        return {
          country: possibleCountry,
          lang,
        };
      }
    }
  }

  for (const { country } of getBrowserLocales()) {
    if (COUNTRY_LANGS.hasOwnProperty(country)) {
      // $FlowFixMe
      return {
        country,
        lang: COUNTRY_LANGS[parseInt(country)][0],
      };
    }
  }

  return {
    lang: LANG.EN,
    country: COUNTRY.US,
  };
}

export function getCSPNonce(): string {
  return getSDKAttribute(SDK_SETTINGS.CSP_NONCE, undefined) ?? "";
}

export function getEnableThreeDomainSecure(): boolean {
  return getSDKAttributes().hasOwnProperty(SDK_SETTINGS.ENABLE_3DS);
}

export function getSDKIntegrationSource(): string | undefined {
  return getSDKAttribute(SDK_SETTINGS.SDK_INTEGRATION_SOURCE, undefined);
}

export function getUserExperienceFlow(): string | undefined {
  return getSDKAttribute(SDK_SETTINGS.USER_EXPERIENCE_FLOW, undefined);
}

// whether in zoid window
export function isChildWindow(): boolean {
  return Boolean((window as any).xprops);
}

// istanbul ignore next
export function getUserAccessToken(): string | void {
  // pass
}

// istanbul ignore next
export function getUserAuthCode(): string | void {
  // pass
}

// Remove
// istanbul ignore next
export function getCountry(): typeof COUNTRY[keyof typeof COUNTRY] {
  return getLocale().country;
}

// Remove
// istanbul ignore next
export function getLang(): typeof LANG[keyof typeof LANG] {
  return getLocale().lang;
}
