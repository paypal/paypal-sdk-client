/* @flow */

import { PLATFORM, PROTOCOL } from "@paypal/sdk-constants/src";

import {
  getSDKHost,
  getHost,
  getProtocol,
  getHostName,
  getPort,
  getDefaultServiceStageHost,
  getDefaultAPIStageHost,
  getStageHost,
  getFundingEligibility,
  getAPIStageHost,
  getDebug,
  getComponents,
  getPath,
  getEnv,
  getDefaultStageHost,
  getVersion,
  getCorrelationID,
  getPlatform,
} from "../../src";

describe(`globals cases`, () => {
  afterEach(() => {
    window.__STAGE_HOST__ = "mock://sandbox.paypal.com";
    delete window.__PROTOCOL__;
    delete window.__SERVICE_STAGE_HOST__;
    delete window.__COMPONENTS__;
    delete window.__FUNDING_ELIGIBILITY__;
  });

  it("should successfully get the host", () => {
    const expectedResult = "test.paypal.com";
    const result = getHost();

    if (expectedResult !== result) {
      throw new Error(`Expected host to be ${expectedResult}, got ${result}`);
    }
  });

  it("should successfully get the hostname", () => {
    const expectedResult = "test.paypal.com";
    const result = getHostName();

    if (expectedResult !== result) {
      throw new Error(
        `Expected hostname to be ${expectedResult}, got ${result}`
      );
    }
  });

  it("should successfully get the port", () => {
    const expectedResult = 8000;
    const result = getPort();

    if (expectedResult !== result) {
      throw new Error(`Expected port to be ${expectedResult}, got ${result}`);
    }
  });

  it("should successfully get the path", () => {
    const expectedResult = "/sdk/js";
    const result = getPath();

    if (expectedResult !== result) {
      throw new Error(`Expected path to be ${expectedResult}, got ${result}`);
    }
  });

  it("should successfully get the env", () => {
    const expectedResult = "test";
    const result = getEnv();

    if (expectedResult !== result) {
      throw new Error(`Expected env to be ${expectedResult}, got ${result}`);
    }
  });

  it('should get the default stage host when "window.__STAGE_HOST__" is undefined', () => {
    window.__STAGE_HOST__ = undefined;
    const result = getDefaultStageHost();

    if (result !== undefined) {
      throw new Error(
        `Expected default stage host to be undefined, got ${String(result)}`
      );
    }
  });

  it("should successfully get the default stage host", () => {
    const expectedResult = "mock://sandbox.paypal.com";
    const result = getDefaultStageHost();

    if (expectedResult !== result) {
      throw new Error(
        `Expected default stage host to be ${expectedResult}, got ${String(
          result
        )}`
      );
    }
  });

  it("should successfully get the version", () => {
    const expectedResult = "1.0.45";
    const result = getVersion();

    if (expectedResult !== result) {
      throw new Error(
        `Expected version to be ${expectedResult}, got ${result}`
      );
    }
  });

  it("should successfully get the correlation id", () => {
    const expectedResult = "abc123";
    const result = getCorrelationID();

    if (expectedResult !== result) {
      throw new Error(
        `Expected correlation id to be ${expectedResult}, got ${result}`
      );
    }

    window.__CORRELATION_ID__ = "def345";

    const newExpectedResult = "def345";
    const newResult = getCorrelationID();

    if (newExpectedResult !== newResult) {
      throw new Error(
        `Expected correlation id to be ${newExpectedResult}, got ${newResult}`
      );
    }

    delete window.__CORRELATION_ID__;
  });

  it("should successfully get the SDK host", () => {
    const result = getSDKHost();

    if (__SDK_HOST__ !== result) {
      throw new Error(`Expected SDK host to be ${__SDK_HOST__}, got ${result}`);
    }
  });

  it("should successfully get the default protocol", () => {
    const result = getProtocol();

    if (PROTOCOL.HTTPS !== result) {
      throw new Error(
        `Expected protocol to be ${PROTOCOL.HTTPS}, got ${result}`
      );
    }
  });

  it("should successfully get the global protocol", () => {
    window.__PROTOCOL__ = "http";
    const result = getProtocol();

    if (PROTOCOL.HTTP !== result) {
      throw new Error(
        `Expected set protocol to be ${PROTOCOL.HTTP}, got ${result}`
      );
    }
  });

  it("should get the default service stage host when undefined", () => {
    window.__SERVICE_STAGE_HOST__ = undefined;
    const result = getDefaultServiceStageHost();

    if (result !== undefined) {
      throw new Error(
        `Expected to be undefine the default service stage host, got ${String(
          result
        )}`
      );
    }
  });

  it("should successfully get the default service stage host", () => {
    window.__SERVICE_STAGE_HOST__ = "mock://sandbox.paypal.com";
    const result = getDefaultServiceStageHost();

    if (__SERVICE_STAGE_HOST__ !== result) {
      throw new Error(`Expected to be the default service stage host`);
    }
  });

  it("should successfully identify desktop platform", () => {
    const result = getPlatform();

    if (PLATFORM.DESKTOP !== result) {
      throw new Error(`Expected to be desktop platform, got ${result}`);
    }
  });

  it("should get the API stage from the default service stage host", () => {
    window.__SERVICE_STAGE_HOST__ = "mock://sandbox.paypal.com";
    const result = getDefaultAPIStageHost();

    if (window.__SERVICE_STAGE_HOST__ !== result) {
      throw new Error(
        `Expected default API stage host to be ${
          window.__SERVICE_STAGE_HOST__
        }, got ${result || ""}`
      );
    }
  });

  it("should get the API stage from the default stage host", () => {
    window.__SERVICE_STAGE_HOST__ = undefined;
    const result = getDefaultAPIStageHost();

    if (__STAGE_HOST__ !== result) {
      throw new Error(
        `Expected default API stage host to be ${window.__STAGE_HOST__}, got ${
          result || ""
        }`
      );
    }
  });

  it("should get the API stage when undefined", () => {
    window.__STAGE_HOST__ = window.__SERVICE_STAGE_HOST__ = undefined;
    const result = getDefaultAPIStageHost();

    if (result !== undefined) {
      throw new Error(
        `Expected API stage to be undefined, but got ${String(result)}`
      );
    }
  });

  it("should successfully get the stage host", () => {
    const result = getStageHost();

    if (__STAGE_HOST__ !== result) {
      throw new Error(
        `Expected stage host to be ${window.__STAGE_HOST__}, got ${
          result || ""
        }`
      );
    }
  });

  it("should successfully get the API stage host", () => {
    const result = getAPIStageHost();

    if (__STAGE_HOST__ !== result) {
      throw new Error(
        `Expected API stage host to be ${window.__STAGE_HOST__}, got ${
          result || ""
        }`
      );
    }
  });

  it("should get the API stage host when undefined", () => {
    window.__STAGE_HOST__ = window.__SERVICE_STAGE_HOST__ = undefined;
    const result = getAPIStageHost();

    if (result !== undefined) {
      throw new Error(
        `Expected API stage host to be undefined, got ${String(result)}`
      );
    }
  });

  it("should successfully get the debug flag", () => {
    window.__DEBUG__ = true;
    const result = getDebug();

    if (window.__DEBUG__ !== result) {
      throw new Error(
        `Expected debug flag to be ${
          window.__DEBUG__
        }, got ${result.toString()}`
      );
    }
  });

  it("should successfully get the components list", () => {
    window.__COMPONENTS__ = ["buttons", "venmo"];
    const result = getComponents();

    if (result[0] !== "buttons" || result[1] !== "venmo") {
      throw new Error(
        `Expected components to be ${
          window.__COMPONENTS__
        }, got ${result.toString()}`
      );
    }
  });

  it("should successfully get the funding eligibility type", () => {
    window.__FUNDING_ELIGIBILITY__ = "credit";
    const result = getFundingEligibility();

    if (window.__FUNDING_ELIGIBILITY__ !== result) {
      throw new Error(
        `Expected funding eligibility type  to be ${
          window.__FUNDING_ELIGIBILITY__
        }, got ${result.toString()}`
      );
    }
  });
});
