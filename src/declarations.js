/* @flow */

import type { SDKGlobalType } from './types';
import { COUNTRY, LANG } from './constants';

declare var __TEST__ : boolean;
declare var __sdk__ : SDKGlobalType | void

declare var __ENV__ : string;
declare var __CLIENT_ID__ : string;
declare var __MERCHANT_ID__ : string;
declare var __LOCALE__: { __COUNTRY__ : $Values<typeof COUNTRY>, __LANG__ : $Values<typeof LANG> };
declare var __DEBUG__ : boolean;
declare var __STAGE__ : string;
