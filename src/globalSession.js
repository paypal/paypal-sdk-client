/* @flow */

import { getStorage, type Storage } from "@krakenjs/belter/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { getVersion } from "./global";

const GLOBAL_SESSION_ID_KEY = "globalSessionID";

export function getGlobalSessionName(): string {
  const sdkVersion = String(getVersion()).replace(/[\W]+/g, "_");
  return `paypal_global_${sdkVersion}`;
}

function getGlobalSessionStorage(): Storage {
  return getStorage({ name: getGlobalSessionName() });
}

function getGlobalStorageState<T>(handler: (storage: Object) => T): T {
  return getGlobalSessionStorage().getState(handler);
}

export function getGlobalSessionID(): string | undefined {
  const globalSessionID = getGlobalStorageState((state) =>
    ZalgoPromise.resolve(state[GLOBAL_SESSION_ID_KEY])
  );
  return globalSessionID.value;
}

export function setGlobalSessionID(sessionID: string): void {
  getGlobalSessionStorage().getState((state) => {
    state[GLOBAL_SESSION_ID_KEY] = sessionID;
    return ZalgoPromise.resolve();
  });
}
