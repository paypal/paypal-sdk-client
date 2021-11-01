/* @flow */
import type { LocaleType } from '@paypal/sdk-constants/src/';
import { COUNTRY_LANGS, LANG, COUNTRY } from '@paypal/sdk-constants/src';

export function getComputedLocales(locale : string) : LocaleType {
    const [ _lang, _country ] = locale.split('_');
    
    let lang = LANG[_lang.toUpperCase()];
    const country = COUNTRY[_country];
    const countryLangs = COUNTRY_LANGS[country];

    if (countryLangs.includes(LANG.ZH_HANT)) {
        lang = LANG.ZH_HANT;
    }

    return { lang, country };
}
