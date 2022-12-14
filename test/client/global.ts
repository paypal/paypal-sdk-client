import { PLATFORM, PROTOCOL } from "@paypal/sdk-constants/dist/esm";
import { describe, afterEach, it } from "vitest";

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
import {
  __SERVICE_STAGE_HOST__,
  __SDK_HOST__,
  __STAGE_HOST__,
} from "../../src/declarations";

describe(`globals cases`, () => {
  afterEach(() => {
    (window as any).__STAGE_HOST__ = "mock://msmaster.qa.paypal.com";
    delete (window as any).__PROTOCOL__;
    delete (window as any).__SERVICE_STAGE_HOST__;
    delete (window as any).__COMPONENTS__;
    delete (window as any).__FUNDING_ELIGIBILITY__;
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
      throw new Error(
        `Expected env to be ${expectedResult}, got ${result as string}`
      );
    }
  });
  it('should get the default stage host when "(window as any).__STAGE_HOST__" is undefined', () => {
    (window as any).__STAGE_HOST__ = undefined;
    const result = getDefaultStageHost();

    if (result !== undefined) {
      throw new Error(
        `Expected default stage host to be undefined, got ${String(result)}`
      );
    }
  });
  it("should successfully get the default stage host", () => {
    const expectedResult = "mock://msmaster.qa.paypal.com";
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

    (window as any).__CORRELATION_ID__ = "def345";
    const newExpectedResult = "def345";
    const newResult = getCorrelationID();

    if (newExpectedResult !== newResult) {
      throw new Error(
        `Expected correlation id to be ${newExpectedResult}, got ${newResult}`
      );
    }

    delete (window as any).__CORRELATION_ID__;
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
        `Expected protocol to be ${String(PROTOCOL.HTTPS)}, got ${String(
          result
        )}`
      );
    }
  });
  it("should successfully get the global protocol", () => {
    (window as any).__PROTOCOL__ = "http";
    const result = getProtocol();

    if (PROTOCOL.HTTP !== result) {
      throw new Error(
        `Expected set protocol to be ${String(PROTOCOL.HTTP)}, got ${String(
          result
        )}`
      );
    }
  });
  it("should get the default service stage host when undefined", () => {
    (window as any).__SERVICE_STAGE_HOST__ = undefined;
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
    (window as any).__SERVICE_STAGE_HOST__ = "mock://msmaster.qa.paypal.com";
    const result = getDefaultServiceStageHost();

    if (__SERVICE_STAGE_HOST__ !== result) {
      throw new Error(`Expected to be the default service stage host`);
    }
  });
  it("should successfully identify desktop platform", () => {
    const result = getPlatform();

    if (PLATFORM.DESKTOP !== result) {
      throw new Error(`Expected to be desktop platform, got ${String(result)}`);
    }
  });
  it("should get the API stage from the default service stage host", () => {
    (window as any).__SERVICE_STAGE_HOST__ = "mock://msmaster.qa.paypal.com";
    const result = getDefaultAPIStageHost();

    if ((window as any).__SERVICE_STAGE_HOST__ !== result) {
      throw new Error(
        `Expected default API stage host to be ${
          (window as any).__SERVICE_STAGE_HOST__ as string
        }, got ${result ?? ""}`
      );
    }
  });
  it("should get the API stage from the default stage host", () => {
    (window as any).__SERVICE_STAGE_HOST__ = undefined;
    const result = getDefaultAPIStageHost();

    if (__STAGE_HOST__ !== result) {
      throw new Error(
        `Expected default API stage host to be ${
          (window as any).__STAGE_HOST__ as string
        }, got ${result ?? ""}`
      );
    }
  });
  it("should get the API stage when undefined", () => {
    (window as any).__STAGE_HOST__ = (window as any).__SERVICE_STAGE_HOST__ =
      undefined;
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
        `Expected stage host to be ${
          (window as any).__STAGE_HOST__ as string
        }, got ${result ?? ""}`
      );
    }
  });
  it("should successfully get the API stage host", () => {
    const result = getAPIStageHost();

    if (__STAGE_HOST__ !== result) {
      throw new Error(
        `Expected API stage host to be ${
          (window as any).__STAGE_HOST__ as string
        }, got ${result ?? ""}`
      );
    }
  });
  it("should get the API stage host when undefined", () => {
    (window as any).__STAGE_HOST__ = (window as any).__SERVICE_STAGE_HOST__ =
      undefined;
    const result = getAPIStageHost();

    if (result !== undefined) {
      throw new Error(
        `Expected API stage host to be undefined, got ${String(result)}`
      );
    }
  });
  it("should successfully get the debug flag", () => {
    (window as any).__DEBUG__ = true;
    const result = getDebug();

    if ((window as any).__DEBUG__ !== result) {
      throw new Error(
        `Expected debug flag to be ${
          (window as any).__DEBUG__ as string
        }, got ${result.toString()}`
      );
    }
  });
  it("should successfully get the components list", () => {
    (window as any).__COMPONENTS__ = ["buttons", "venmo"];
    const result = getComponents();

    if (result[0] !== "buttons" || result[1] !== "venmo") {
      throw new Error(
        `Expected components to be ${
          (window as any).__COMPONENTS__ as string
        }, got ${result.toString()}`
      );
    }
  });
  it("should successfully get the funding eligibility type", () => {
    (window as any).__FUNDING_ELIGIBILITY__ = "credit";
    const result = getFundingEligibility();

    if ((window as any).__FUNDING_ELIGIBILITY__ !== result) {
      throw new Error(
        `Expected funding eligibility type  to be ${
          (window as any).__FUNDING_ELIGIBILITY__ as string
        }, got ${result.toString() as string}`
      );
    }
  });
});
