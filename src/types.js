/* @flow */

export const _TYPES = true;

export * from "@paypal/sdk-constants/src/types";

export type Experimentation = {|
  experience: string,
  treatment: string,
|};

export type GetExperimentation = {|
  __EXPERIENCE__?: string,
  __TREATMENT__?: string,
|};
