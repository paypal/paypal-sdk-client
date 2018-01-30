/* @flow */

declare var __TEST__ : boolean;

export type ConfigType = {
    env : string,
    auth : {
        [string] : string
    }
};

export type ExportsType = {
    [ string ] : mixed
};
