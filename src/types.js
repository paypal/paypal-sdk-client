/* @flow */

declare var __TEST__ : boolean;

export type ClientOptionsType = {
    env : string,
    auth : {
        [string] : string
    }
};

export type ClientConfigType = Object;

export type ServerConfigType = Object;

export type QueryOptionsType = {
    modules : Array<string>,
    merchantID : string,
    locale : string
};

export type ExportsType = {
    [ string ] : mixed
};

declare var __PAYPAL_BRAINTREE_SERVER_CONFIG__: ServerConfigType;
declare var __PAYPAL_BRAINTREE_QUERY_OPTIONS__: QueryOptionsType;
