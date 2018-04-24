/* @flow */

export type ClientOptionsType = {
    env : string,
    auth? : {
        [string] : string
    }
};

export type QueryOptionsType = {
    components : Array<string>,
    merchantID : string,
    locale : {
        country : string,
        lang : string
    },
    env : string
};

export type ExportsType = {
    [ string ] : mixed
};

export type SDKGlobalType = {
    queryOptions : QueryOptionsType
};
