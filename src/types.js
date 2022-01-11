/* @flow */

export const _TYPES = true;

type Tracking = {|
    context : string,
    treatment : string,
    metric : string
|};

type Treatment = {|
    name : string,
    html : string,
    css : string,
    js : string
|};

export type Personalization = {|
    name : string,
    tracking : Tracking,
    treatment : Treatment
|};

export * from '@paypal/sdk-constants/src/types';
