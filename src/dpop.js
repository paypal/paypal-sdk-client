/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

export const stringToBytes = (string: string): Uint8Array => {
  // eslint-disable-next-line compat/compat
  return new TextEncoder().encode(string);
};

export const bytesToString = (bytes: Uint8Array): string => {
  return String.fromCharCode(...bytes);
};

export const base64encodeUrlSafe = (string: string): string => {
  // https://datatracker.ietf.org/doc/html/rfc7515#appendix-C
  return btoa(string)
    .replace(/[=]+/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const base64decodeUrlSafe = (string: string): string => {
  return atob(string.replace(/-/g, "+").replace(/_/g, "/"));
};

export const sha256 = (string: string): ZalgoPromise<string> => {
  const bytes = stringToBytes(string);
  return window.crypto.subtle.digest("sha-256", bytes).then((digest) => {
    const binaryString = bytesToString(new Uint8Array(digest));
    const encodedBinaryString = base64encodeUrlSafe(binaryString);
    return ZalgoPromise.resolve(encodedBinaryString);
  });
};
