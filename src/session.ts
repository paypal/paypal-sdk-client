import { SDK_SETTINGS } from "@paypal/sdk-constants/dist/esm";
import type { Storage } from "@krakenjs/belter/dist/esm";
import { getStorage } from "@krakenjs/belter/dist/esm";

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

export function getClientMetadataID(): string | undefined {
  return getSDKAttribute(SDK_SETTINGS.CLIENT_METADATA_ID, undefined);
}
