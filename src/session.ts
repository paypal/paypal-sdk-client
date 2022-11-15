import { SDK_SETTINGS } from "@paypal/sdk-constants/src";
import type { Storage } from "@krakenjs/belter/src";
import { getStorage } from "@krakenjs/belter/src";

import { getNamespace, getSDKAttribute } from "./script";

function getSDKStorage(): Storage {
  return getStorage({
    name: getNamespace(),
  });
}

export function getSessionID(): string {
  return getSDKStorage().getSessionID();
}
export function getStorageState<T>(
  handler: (storage: Record<string, any>) => T
): T {
  return getSDKStorage().getState(handler);
}
export function getStorageID(): string {
  return getSDKStorage().getID();
}
export function getSessionState<T>(
  handler: (state: Record<string, any>) => T
): T {
  return getSDKStorage().getSessionState(handler);
}
export function getClientMetadataID(): string | null | undefined {
  return getSDKAttribute(SDK_SETTINGS.CLIENT_METADATA_ID, undefined);
}
