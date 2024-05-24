/* @flow */

import { SDK_SETTINGS } from "@paypal/sdk-constants/src";
import { getStorage, type Storage } from "@krakenjs/belter/src";

import { getNamespace, getSDKAttribute } from "./script";

export function getClientMetadataID(): ?string {
  return getSDKAttribute(SDK_SETTINGS.CLIENT_METADATA_ID);
}

export function getSDKStorage(): Storage {
  return getStorage({
    name: getNamespace(),
    stickySessionId: getClientMetadataID() || "",
  });
}

export function getSessionID(): string {
  return getSDKStorage().getSessionID();
}

export function getStorageState<T>(handler: (storage: Object) => T): T {
  return getSDKStorage().getState(handler);
}

export function getStorageID(): string {
  return getSDKStorage().getID();
}

export function getSessionState<T>(handler: (state: Object) => T): T {
  return getSDKStorage().getSessionState(handler);
}

export function wasShopperInsightsUsed(): boolean {
  let shopperInsightsUsed = false;

  getSessionState((state) => {
    const shopperInsightsState = state["shopperInsights"];

    // Set shopperInsightsUsed to true if it finds either one of these values in the state
    shopperInsightsUsed = Boolean(
      shopperInsightsState?.shopperInsightsIsMemberUsed ||
        shopperInsightsState?.getRecommendedPaymentMethodsUsed
    );
  });

  return shopperInsightsUsed;
}
