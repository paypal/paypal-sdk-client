/* @flow */

import { getStorage, type Storage } from "@krakenjs/belter/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { getVersion } from "./global";
import { getLogger } from "./logger";

const GLOBAL_SESSION_ID_KEY = "globalSessionID";

export function getGlobalSessionName(): string {
  let version = getVersion();
  if (!version) {
    getLogger().warn("global_session_no_sdk_version");
    version = "unknown";
  }
  const sdkVersion = String(version).replace(/[\W]+/g, "_");
  return `paypal_global_${sdkVersion}`;
}

function getGlobalSessionStorage(): Storage {
  return getStorage({ name: getGlobalSessionName() });
}

function getGlobalStorageState<T>(handler: (storage: Object) => T): T {
  return getGlobalSessionStorage().getState(handler);
}

export function getGlobalSessionID(): string | void {
  const globalSessionID = getGlobalStorageState((state) => {
    if (
      !state ||
      typeof state !== "object" ||
      !state.hasOwnProperty(GLOBAL_SESSION_ID_KEY)
    ) {
      getLogger().warn("global_session_not_found");
      return undefined;
    }
    return ZalgoPromise.resolve(state[GLOBAL_SESSION_ID_KEY]);
  });
  return globalSessionID?.value;
}

export function setGlobalSessionID(sessionID: string): void {
  getGlobalSessionStorage().getState((state) => {
    if (!state || typeof state !== "object") {
      getLogger().warn("global_session_no_storage_state_found");
      state = {};
    }
    state[GLOBAL_SESSION_ID_KEY] = sessionID;
    return ZalgoPromise.resolve();
  });
}
