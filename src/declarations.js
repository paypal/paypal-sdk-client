/* @flow */

import { COUNTRY, LANG, ENV, INTENT, COMMIT, VAULT, CURRENCY } from 'paypal-sdk-constants/src';

declare var __HOST__ : string;
declare var __HOSTNAME__ : string;
declare var __PORT__ : number;
declare var __PATH__ : string;
declare var __STAGE_HOST__ : string;

declare var __TEST__ : boolean;
declare var __ENV__ : $Values<typeof ENV>;
declare var __CLIENT_ID__ : string;
declare var __MERCHANT_ID__ : string;
declare var __PARTNER_ATTRIBUTION_ID__ : string;
declare var __LOCALE_COUNTRY__ : $Values<typeof COUNTRY>;
declare var __LOCALE_LANG__ : $Values<typeof LANG> | void;
declare var __DEFAULT_LANG__ : $Values<typeof LANG>;
declare var __DEBUG__ : boolean;
declare var __STAGE__ : boolean;
declare var __CURRENCY__ : $Values<typeof CURRENCY>;
declare var __INTENT__ : $Values<typeof INTENT>;
declare var __COMMIT__: $Values<typeof COMMIT>;
declare var __VAULT__ : $Values<typeof VAULT>;
declare var __VERSION__ : string;
declare var __CORRELATION_ID__ : string;
