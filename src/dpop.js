/* @flow */
/* eslint-disable promise/no-native, no-restricted-globals */

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

export const sha256 = async (string: string): Promise<string> => {
  const bytes = stringToBytes(string);
  const digest = await window.crypto.subtle.digest("sha-256", bytes);
  const binaryString = bytesToString(new Uint8Array(digest));
  return base64encodeUrlSafe(binaryString);
};

/* eslint-enable promise/no-native, no-restricted-globals */
