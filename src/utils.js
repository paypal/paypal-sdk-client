/* @flow */
import type { LocaleType } from '@paypal/sdk-constants/src/';
import { COUNTRY_LANGS, LANG } from '@paypal/sdk-constants/src';


export function getComputedLocales(locale : string) : LocaleType {
    let [ lang, country ] = locale.split('_');
    // $FlowFixMe
    const countryLangs = COUNTRY_LANGS[country];

    if (countryLangs.includes(LANG.ZH_HANT)) {
        lang = LANG.ZH_HANT;
    }


    // $FlowFixMe
    return { lang, country };
}
