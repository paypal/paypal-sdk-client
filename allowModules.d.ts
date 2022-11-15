declare module "@infra/paypalize";
declare module "@infra/remoteconfig";
declare module "@krakenjs/beaver-logger/src";
declare module "@krakenjs/belter";
declare module "@krakenjs/belter/src";
declare module "@krakenjs/cross-domain-utils/src";
declare module "@krakenjs/grabthar";
declare module "@krakenjs/grumbler-scripts";
declare module "@krakenjs/grumbler-scripts/config/webpack.config";
declare module "@krakenjs/jsx-pragmatic";
declare module "@krakenjs/subprocess-robot";
declare module "@krakenjs/sync-browser-mocks/dist/sync-browser-mocks";
declare module "@krakenjs/webpack-mem-compile";
declare module "@paypal/sdk-client";
declare module "@paypal/sdk-client/src";
declare module "@paypal/sdk-constants";
declare module "@paypal/sdk-constants/src";
declare module "@paypal/sdk-constants/src/types";
declare module "@paypalcorp/instance-location";
declare module "@paypalcorp/mayfly";
declare module "@paypalcorp/opentelemetry";
declare module "@paypalcorp/sdk-server-utils";
declare module "beaver-logger-paypal";
declare module "cal";
declare module "environment-paypal";
declare module "js-combinatorics";
declare module "keymakerclientapi";
declare module "servicecore";
declare module "topos";
declare module "webpack-dev-middleware";

declare module "shush" {
  type JSONValue =
    | string
    | number
    | boolean
    | Record<string, JSONValue>
    | Array<JSONValue>;

  export default function shush(path: string): Record<string, JSONValue>;
}
declare module "strict-merge" {
  export const TYPE = {
    BOOLEAN: "boolean",
    STRING: "string",
    NUMBER: "number",
    OBJECT: "object",
    ARRAY: "array",
    NULL: "null",
    UNDEFINED: "undefined",
  } as const;

  type TUnionToIntersection<U> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export function strictMerge<First, Second extends First>(
    first: Record<string, First>,
    second: Record<string, Second>,
    merger?: (
      a: Record<string, T>,
      b: Record<string, T>,
      type: TYPE,
      value: T
    ) => boolean
  ): TUnionToIntersection<T[number]>;
}
