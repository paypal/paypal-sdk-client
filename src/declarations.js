/* @flow */

// $FlowFixMe[toplevel-library-import]
import { ENV, COMPONENTS, PROTOCOL } from "@paypal/sdk-constants/src";

// $FlowFixMe[toplevel-library-import]
import type { FundingEligibilityType } from "./types";

declare var __PROTOCOL__: $Values<typeof PROTOCOL>;
declare var __HOST__: string;
declare var __HOSTNAME__: string;
declare var __PORT__: number;
declare var __PATH__: string;
declare var __SDK_HOST__: string;
declare var __PAYPAL_DOMAIN__: string;
declare var __PAYPAL_API_DOMAIN__: string;
declare var __STAGE_HOST__: ?string;
declare var __SERVICE_STAGE_HOST__: ?string;

declare var __TEST__: boolean;
declare var __ENV__: $Values<typeof ENV>;
declare var __DEBUG__: boolean;
declare var __STAGE__: boolean;
declare var __WEB__: boolean;

declare var __VERSION__: string;
declare var __CORRELATION_ID__: string;
declare var __NAMESPACE__: string;
declare var __COMPONENTS__: $ReadOnlyArray<$Values<typeof COMPONENTS>>;

// $FlowFixMe[value-as-type]
declare var __FUNDING_ELIGIBILITY__: FundingEligibilityType;

// Experiment Variable
declare var __DISABLE_SET_COOKIE__: boolean;
declare var __EXPERIMENTATION__: {|
  __EXPERIENCE__?: string,
  __TREATMENT__?: string,
|};
