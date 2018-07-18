/* @flow */

import type { SDKGlobalType } from './types';

declare var __TEST__ : boolean;
declare var __sdk__ : SDKGlobalType | void

declare var __ENV__ : string;
declare var __CLIENT_ID__ : string;
declare var __MERCHANT_ID__ : string;
declare var __LOCALE__ : { COUNTRY : string, LANG : string };
declare var __DEBUG__ : boolean;
declare var __STAGE__ : string;
