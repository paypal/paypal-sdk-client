import type { ENV, COMPONENTS, PROTOCOL } from "@paypal/sdk-constants/src";

// @ts-expect-error[toplevel-library-import]
import type { FundingEligibilityType } from "./types";

declare let __PROTOCOL__: typeof PROTOCOL[keyof typeof PROTOCOL];

declare let __HOST__: string;

declare let __HOSTNAME__: string;

declare let __PORT__: number;

declare let __PATH__: string;

declare let __SDK_HOST__: string;

declare let __PAYPAL_DOMAIN__: string;

declare let __PAYPAL_API_DOMAIN__: string;

declare let __STAGE_HOST__: string | null | undefined;

declare let __SERVICE_STAGE_HOST__: string | null | undefined;

declare let __TEST__: boolean;

declare let __ENV__: typeof ENV[keyof typeof ENV];

declare let __DEBUG__: boolean;

declare let __STAGE__: boolean;

declare let __VERSION__: string;

declare let __CORRELATION_ID__: string;

declare let __NAMESPACE__: string;

declare let __COMPONENTS__: ReadonlyArray<
  typeof COMPONENTS[keyof typeof COMPONENTS]
>;

declare let __FUNDING_ELIGIBILITY__: FundingEligibilityType;

declare let __WEB__: string;
