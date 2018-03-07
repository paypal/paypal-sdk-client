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

export type ExportsType = {
    [ string ] : mixed
};

declare var __SERVER_PAYPAL_BRAINTREE_CONFIG__: ServerConfigType;
