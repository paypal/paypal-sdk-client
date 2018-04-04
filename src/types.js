/* @flow */

export type ClientOptionsType = {
    env? : string,
    auth? : {
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
