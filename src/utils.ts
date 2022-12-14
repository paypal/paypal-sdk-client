import { COUNTRY_LANGS, LANG, COUNTRY } from "@paypal/sdk-constants/dist/esm";
import type { LocaleType } from "@paypal/sdk-constants/dist/esm";

export function getComputedLocales(locale: string): typeof LocaleType {
  let [lang, country] = locale.split("_");
  lang = LANG[lang.toUpperCase()];
  country = COUNTRY[parseInt(country)];
  const countryLangs = COUNTRY_LANGS[parseInt(country)];

  if (
    countryLangs &&
    countryLangs.indexOf(LANG.ZH_HANT) !== -1 &&
    lang === LANG.ZH
  ) {
    lang = LANG.ZH_HANT;
  }

  return {
    lang,
    country,
  };
}
