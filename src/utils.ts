import { COUNTRY_LANGS, LANG, COUNTRY } from "@paypal/sdk-constants/dist/esm";

export function getComputedLocales(locale: string) {
  let [lang, country] = locale.split("_");
  // TODO: should be lang = LANG[lang.toUpperCase()];
  lang = LANG[lang as keyof typeof LANG];
  country = COUNTRY[country as keyof typeof COUNTRY];
  const countryLangs = COUNTRY_LANGS[country as keyof typeof COUNTRY];

  if (countryLangs?.includes(LANG.ZH_HANT) && lang === LANG.ZH) {
    lang = LANG.ZH_HANT;
  }

  return {
    lang,
    country,
  };
}
