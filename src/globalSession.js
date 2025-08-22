/* @flow */

import { getStorage, type Storage } from "@krakenjs/belter/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { getVersion } from "./global";

const GLOBAL_SESSION_ID_KEY = "globalSessionID";

export function getGlobalSessionName(): string {
  let version = getVersion();
  if (!version) {
    version = "unknown";
  }
  const sdkVersion = String(version).replace(/[\W]+/g, "_");
  return `paypal_global_${sdkVersion}`;
}

function getGlobalSessionStorage(): Storage {
  return getStorage({ name: getGlobalSessionName() });
}

export function getGlobalSessionID(): string | void {
  const storage = getGlobalSessionStorage();

  if (
    !storage ||
    (storage.checkIfStorageExists && !storage.checkIfStorageExists())
  ) {
    return undefined;
  }

  const globalSessionID = storage.getState((state) => {
    if (
      !state ||
      typeof state !== "object" ||
      !state.hasOwnProperty(GLOBAL_SESSION_ID_KEY)
    ) {
      return undefined;
    }
    return ZalgoPromise.resolve(state[GLOBAL_SESSION_ID_KEY]);
  });
  return globalSessionID?.value;
}

export function setGlobalSessionID(sessionID: string): void {
  getGlobalSessionStorage().getState((state) => {
    if (!state || typeof state !== "object") {
      state = {};
    }
    state[GLOBAL_SESSION_ID_KEY] = sessionID;
    return ZalgoPromise.resolve();
  });
}
