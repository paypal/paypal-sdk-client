import type { ENV, COMPONENTS, PROTOCOL } from "@paypal/sdk-constants/dist/esm";

import type { FundingEligibilityType } from "./types";

export declare let __PROTOCOL__: typeof PROTOCOL[keyof typeof PROTOCOL];

export declare let __HOST__: string;

export declare let __HOSTNAME__: string;

export declare let __PORT__: number;

export declare let __PATH__: string;

export declare let __SDK_HOST__: string;

export declare let __PAYPAL_DOMAIN__: string;

export declare let __PAYPAL_API_DOMAIN__: string;

export declare let __STAGE_HOST__: string | undefined;

export declare let __SERVICE_STAGE_HOST__: string | undefined;

export declare let __TEST__: boolean;

export declare let __ENV__: typeof ENV[keyof typeof ENV];

export declare let __DEBUG__: boolean;

export declare let __STAGE__: boolean;

export declare let __VERSION__: string;

export declare let __CORRELATION_ID__: string;

export declare let __NAMESPACE__: string;

export declare let __COMPONENTS__: ReadonlyArray<
  typeof COMPONENTS[keyof typeof COMPONENTS]
>;

export declare let __FUNDING_ELIGIBILITY__: FundingEligibilityType;

export declare let __WEB__: string;
