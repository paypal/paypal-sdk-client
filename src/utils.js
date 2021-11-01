/* @flow */
import type { LocaleType } from '@paypal/sdk-constants/src/';
import { COUNTRY_LANGS } from '@paypal/sdk-constants/src';


export function getComputedLocales(locale : string) : LocaleType {
    let [ lang, country ] = locale.split('_');
    // $FlowFixMe
    const countryLangs = COUNTRY_LANGS[country];

    if (countryLangs.includes('zh_Hant')) {
        lang = 'zh_Hant';
    }


    // $FlowFixMe
    return { lang, country };
}
