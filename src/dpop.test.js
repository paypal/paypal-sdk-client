/* @flow */

import { describe, expect, it } from "vitest";

import {
  base64decodeUrlSafe,
  base64encodeUrlSafe,
  bytesToString,
  generateKeyPair,
  jsonWebKeyThumbprint,
  sha256,
  stringToBytes,
} from "./dpop";

describe("DPoP", () => {
  describe("base64 encoding and decoding", () => {
    const decoded = "i·?i·>i·";
    const encoded = "abc_abc-abc";
    it("encoding replaces '/', '+', and '='", () => {
      expect(btoa(decoded)).toEqual("abc/abc+abc=");
      expect(base64encodeUrlSafe(decoded)).toEqual(encoded);
    });
    it("decoding adds back the url unsafe characters", () => {
      expect(base64decodeUrlSafe(encoded)).toEqual(decoded);
    });
  });
  describe("byte array <-> string conversion", () => {
    it("converts strings to bytes and back again", () => {
      const string = "abcdefg123456890";
      expect(bytesToString(stringToBytes(string))).toEqual(string);
    });
    it("converts bytes to binary strings and back again", () => {
      // >= 128 should not be encoded as utf-8
      const bytes = new Uint8Array([128]);
      expect(...stringToBytes(bytesToString(bytes))).toEqual(...bytes);
    });
  });
  describe("sha256", () => {
    it("base64 encodes the hash", async () => {
      // testing a known string and its base64 encoded hash value from:
      // https://datatracker.ietf.org/doc/html/rfc9449#name-dpop-protected-resource-req
      const digest = await sha256(
        "Kz~8mXK1EalYznwH-LC-1fBAo.4Ljp~zsPE_NeO.gxU"
      );
      expect(digest).toEqual("fUHyO2r2Z3DZ53EsNrWBb0xWXoaNy59IiKCAqksmQEo");
      expect.assertions(1);
    });
  });
  describe("key pair generation", () => {
    it("memoizes the key pair", async () => {
      const { publicKey: publicKey1 } = await generateKeyPair();
      const jwk1 = await window.crypto.subtle.exportKey("jwk", publicKey1);
      const { publicKey: publicKey2 } = await generateKeyPair();
      const jwk2 = await window.crypto.subtle.exportKey("jwk", publicKey2);
      expect(jwk1.x).toBeTruthy();
      expect(jwk1).toStrictEqual(jwk2);
    });
  });
  describe("JSON Web Key Thumbprint", () => {
    it("generates a correct thumbprint", async () => {
      // testing a known JSON Web Key and its thumbprint from:
      // https://datatracker.ietf.org/doc/html/rfc7638#section-3.1
      const key = {
        kty: "RSA",
        n: "0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbbfAAtVT86zwu1RK7aPFFxuhDR1L6tSoc_BJECPebWKRXjBZCiFV4n3oknjhMstn64tZ_2W-5JsGY4Hc5n9yBXArwl93lqt7_RN5w6Cf0h4QyQ5v-65YGjQR0_FDW2QvzqY368QQMicAtaSqzs8KJZgnYb9c7d0zgdAZHzu6qMQvRL5hajrn1n91CbOpbISD08qNLyrdkt-bFTWhAI4vMQFh6WeZu0fM4lFd2NcRwr3XPksINHaQ-G_xBniIqbw0Ls1jF44-csFCur-kEgU8awapJzKnqDKgw",
        e: "AQAB",
        alg: "RS256",
        kid: "2011-04-29",
      };
      expect(await jsonWebKeyThumbprint(key)).toBe(
        "NzbLsXh8uDCcd-6MNwXF4W_7noWXFZAfHkxZsRGC9Xs"
      );
    });
  });
});
