/* @flow */
/* eslint-disable promise/no-native, no-restricted-globals */

type KeyPair = {|
  privateKey: mixed,
  publicKey: mixed,
|};

type DPoPParameters = {|
  accessToken?: string,
  method: string,
  nonce?: string,
  uri: string,
|};

type JWTParameters = {|
  ...KeyPair,
  ...DPoPParameters,
|};

type DPoPHeaders = {|
  Authorization?: string,
  DPoP: string,
|};

type GenerateKeyPair = () => Promise<KeyPair>;

type CreateJWT = (JWTParameters) => Promise<string>;

type BuildDPoPHeaders = (DPoPParameters) => Promise<DPoPHeaders>;

// https://datatracker.ietf.org/doc/html/rfc7518#section-3.1
const KEY_OPTIONS = {
  alg: "ES256",
  create: {
    name: "ECDSA",
    namedCurve: "P-256",
  },
  extractable: false,
  sign: {
    name: "ECDSA",
    hash: { name: "SHA-256" },
  },
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
  // webpack transforms [..."string"] to [].concat("string")
  // eslint-disable-next-line unicorn/prefer-spread
  return new Uint8Array(string.split("").map((c) => c.charCodeAt(0)));
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

export const createJWT: CreateJWT = async ({
  accessToken,
  method,
  nonce,
  publicKey,
  privateKey,
  uri,
}) => {
  const jwk = await window.crypto.subtle.exportKey("jwk", publicKey);

  const header = {
    alg: KEY_OPTIONS.alg,
    typ: "dpop+jwt",
    jwk,
  };

  const encodedHeader = base64encodeUrlSafe(JSON.stringify(header));

  const payload = {
    ath: accessToken ? await sha256(accessToken) : undefined,
    cnf: {
      jkt: await jsonWebKeyThumbprint(jwk),
    },
    htm: method,
    htu: uri,
    iat: Math.floor(new Date() / 1000),
    jti: window.crypto.randomUUID(),
    nonce,
  };

  const encodedPayload = base64encodeUrlSafe(JSON.stringify(payload));

  const signature = await window.crypto.subtle.sign(
    KEY_OPTIONS.sign,
    privateKey,
    stringToBytes(`${encodedHeader}.${encodedPayload}`)
  );

  const encodedSignature = base64encodeUrlSafe(
    bytesToString(new Uint8Array(signature))
  );

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
};

export const buildDPoPHeaders: BuildDPoPHeaders = async ({
  accessToken,
  method,
  uri,
  nonce,
}) => {
  const { privateKey, publicKey } = await generateKeyPair();
  const jwt = await createJWT({
    accessToken,
    method,
    uri,
    nonce,
    publicKey,
    privateKey,
  });
  // https://datatracker.ietf.org/doc/html/rfc9449#name-dpop-protected-resource-req
  return {
    ...(accessToken && { Authorization: `DPoP ${accessToken}` }),
    DPoP: jwt,
  };
};

/* eslint-enable promise/no-native, no-restricted-globals */
