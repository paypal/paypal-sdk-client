/* @flow */

import { describe, expect, it } from "vitest";

import {
  base64decodeUrlSafe,
  base64encodeUrlSafe,
  bytesToString,
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
});
