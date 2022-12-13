import { setupLogger } from "./tracking";
import { getSDKScript } from "./script";
import { checkForCommonErrors } from "./errors";

export { FUNDING } from "@paypal/sdk-constants/dist/esm";
export { getCorrelationID } from "./global";
export function setup() {
  checkForCommonErrors();
  getSDKScript();
  setupLogger();
}
