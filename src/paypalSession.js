/* @flow */

import { getStorage, type Storage } from "@krakenjs/belter/src";

const STORAGE_LIFETIME_1_HOUR = 60 * 60 * 1000;
export function getPayPalSessionStorage(): Storage {
  return getStorage({
    name: "paypal",
    lifetime: STORAGE_LIFETIME_1_HOUR,
  });
}

export function getPayPalStorageID(): string {
  return getPayPalSessionStorage().getID();
}

export function getPayPalSessionID(): string {
  return getPayPalSessionStorage().getSessionID();
}
