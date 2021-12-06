/* @flow */

import { COUNTRY_LANGS, LANG, COUNTRY, type LocaleType } from '@paypal/sdk-constants/src';

export function getComputedLocales(locale : string) : LocaleType {
    let [ lang, country ] = locale.split('_');

    lang = LANG[lang.toUpperCase()];
    country = COUNTRY[country];
    const countryLangs = COUNTRY_LANGS[country];

    if (countryLangs && countryLangs.indexOf(LANG.ZH_HANT) !== -1 && lang === LANG.ZH) {
        lang = LANG.ZH_HANT;
    }

    return { lang, country };
}
