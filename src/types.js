/* @flow */

export const _TYPES = true;

export * from "@paypal/sdk-constants/src/types";

// TODO first-render-experiment-cleanup
export type Experimentation = {
  experience?: string,
  treatment?: string,
  // Workaround for exact type. Works as expected
  // when dealing with objects that can be empty.
  // eslint-disable-next-line flowtype/no-weak-types
  [any]: empty,
};

// TODO first-render-experiment-cleanup
export type GetExperimentation = {
  __EXPERIENCE__?: string,
  __TREATMENT__?: string,
  // Workaround for exact type. Works as expected
  // when dealing with objects that can be empty.
  // eslint-disable-next-line flowtype/no-weak-types
  [any]: empty,
};

export type FirstRenderExperiments = {
  [key: string]: boolean,
};
