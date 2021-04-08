import {
  getPayPalDomain,
  getPayPalAPIDomain,
  insertMockSDKScript
} from "../../src";

beforeEach(() => {
  __ENV__ = "test";
});

describe(`getPayPalDomain function test cases`, () => {
  it("should successfully get the production paypal domain", async () => {
    __ENV__ = "production";
    const expectedPayPalDomain = "https://www.paypal.com";
    expect(getPayPalDomain()).toBe(expectedPayPalDomain);
  });

  it("should successfully get the stage paypal domain", async () => {
    __ENV__ = "stage";
    const expectedPayPalDomain = "https://msmaster.qa.paypal.com";
    expect(getPayPalDomain()).toBe(expectedPayPalDomain);
  });

  it("should successfully get the sandbox paypal domain", async () => {
    const expectedPayPalDomain = "https://www.sandbox.paypal.com";
    __ENV__ = "sandbox";

    insertMockSDKScript({
      query: {
        "client-id": "sb"
      }
    });

    expect(getPayPalDomain()).toBe(expectedPayPalDomain);
  });

  it("should successfully get the sandbox v2 paypal domain", async () => {
    const expectedPayPalDomain = "https://www-v2.sandbox.paypal.com";
    __ENV__ = "sandbox";

    insertMockSDKScript({
      query: {
        "client-id": "sb",
        env: "sandbox_v2"
      }
    });

    expect(getPayPalDomain()).toBe(expectedPayPalDomain);
  });

  it("should thrown error if can't find the requested domain", async () => {
    __ENV__ = "foo";
    expect(() => getPayPalDomain()).toThrowError(
      /Can not get paypal domain for env/
    );
  });
});

describe(`getPayPalAPIDomain function test cases`, () => {
  it("should successfully get the production paypal API domain", async () => {
    __ENV__ = "production";
    const expectedPayPalDomain = "https://cors.api.paypal.com";
    expect(getPayPalAPIDomain()).toBe(expectedPayPalDomain);
  });

  it("should successfully get the sandbox paypal API domain", async () => {
    const expectedPayPalDomain = "https://cors.api.sandbox.paypal.com";
    __ENV__ = "sandbox";

    insertMockSDKScript({
      query: {
        "client-id": "sb"
      }
    });

    expect(getPayPalAPIDomain()).toBe(expectedPayPalDomain);
  });

  it("should successfully get the sandbox v2 paypal API domain", async () => {
    const expectedPayPalDomain = "https://cors.api-v2.sandbox.paypal.com";
    __ENV__ = "sandbox";

    insertMockSDKScript({
      query: {
        "client-id": "sb",
        env: "sandbox_v2"
      }
    });

    expect(getPayPalAPIDomain()).toBe(expectedPayPalDomain);
  });

  it("should thrown error if can't find the requested API domain", async () => {
    __ENV__ = "foo";
    expect(() => getPayPalAPIDomain()).toThrowError(
      /Can not get paypal api domain for env/
    );
  });
});
