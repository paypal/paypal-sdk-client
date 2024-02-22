/* @flow */
/* eslint-disable promise/no-native, no-restricted-globals */

type KeyPair = {|
  privateKey: mixed,
  publicKey: mixed,
|};

type GenerateKeyPair = () => Promise<KeyPair>;

// https://datatracker.ietf.org/doc/html/rfc7518#section-3.1
const KEY_OPTIONS = {
  create: {
    name: "ECDSA",
    namedCurve: "P-256",
  },
  extractable: false,
  usages: ["sign", "verify"],
};

let keyPair;
export const generateKeyPair: GenerateKeyPair = async () => {
  if (!keyPair) {
    const { create, extractable, usages } = KEY_OPTIONS;
    const { publicKey, privateKey } = await window.crypto.subtle.generateKey(
      create,
      extractable,
      usages
    );

    keyPair = keyPair || { publicKey, privateKey };
  }

  return keyPair;
};

export const stringToBytes = (string: string): Uint8Array => {
  return new Uint8Array([...string].map((c) => c.charCodeAt(0)));
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

export const jsonWebKeyThumbprint = async (jwk: Object): Promise<string> => {
  // https://datatracker.ietf.org/doc/html/rfc7638#section-3.2
  const { crv, e, kty, n, x, y } = jwk;
  return await sha256(JSON.stringify({ crv, e, kty, n, x, y }));
};

/* eslint-enable promise/no-native, no-restricted-globals */
