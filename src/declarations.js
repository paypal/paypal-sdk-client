/* @flow */

import { COUNTRY, LANG, ENV } from './constants';

declare var __HOST__ : string;
declare var __HOSTNAME__: string;
declare var __PORT__: number;
declare var __PATH__: string;

declare var __TEST__ : boolean;
declare var __ENV__ : $Values<typeof ENV>;
declare var __CLIENT_ID__ : string;
declare var __MERCHANT_ID__ : string;
declare var __LOCALE__: { __COUNTRY__ : $Values<typeof COUNTRY>, __LANG__ : $Values<typeof LANG> };
declare var __DEBUG__ : boolean;
declare var __STAGE__ : string;
declare var __INTENT__ : string;
declare var __COMMIT__ : boolean;
declare var __VAULT__ : boolean;
