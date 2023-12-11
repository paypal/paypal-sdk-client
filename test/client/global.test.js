/* @flow */
import { afterEach, describe, it, expect } from "vitest";
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
  getExperimentation,
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
    expect(result).toEqual(expectedResult);
  });

  it("should successfully get the hostname", () => {
    const expectedResult = "test.paypal.com";
    const result = getHostName();
    expect(result).toEqual(expectedResult);
  });

  it("should successfully get the port", () => {
    const expectedResult = 8000;
    const result = getPort();
    expect(result).toEqual(expectedResult);
  });

  it("should successfully get the path", () => {
    const expectedResult = "/sdk/js";
    const result = getPath();
    expect(result).toEqual(expectedResult);
  });

  it("should successfully get the env", () => {
    const expectedResult = "test";
    const result = getEnv();
    expect(result).toEqual(expectedResult);
  });

  it('should get the default stage host when "window.__STAGE_HOST__" is undefined', () => {
    window.__STAGE_HOST__ = undefined;
    const result = getDefaultStageHost();
    expect(result).toBeUndefined();
  });

  it("should successfully get the default stage host", () => {
    const expectedResult = "mock://sandbox.paypal.com";
    const result = getDefaultStageHost();
    expect(result).toEqual(expectedResult);
  });

  it("should successfully get the version", () => {
    const expectedResult = "1.0.45";
    const result = getVersion();
    expect(result).toEqual(expectedResult);
  });

  it("should successfully get the correlation id", () => {
    const expectedResult = "abc123";
    const result = getCorrelationID();
    expect(result).toEqual(expectedResult);
  });

  it("should successfully get the SDK host", () => {
    const result = getSDKHost();
    expect(result).toEqual(__SDK_HOST__);
  });

  it("should successfully get the default protocol", () => {
    const result = getProtocol();
    expect(result).toEqual(PROTOCOL.HTTPS);
  });

  it("should successfully get the global protocol", () => {
    window.__PROTOCOL__ = "http";
    const result = getProtocol();
    expect(result).toEqual(PROTOCOL.HTTP);
  });

  it("should get the default service stage host when undefined", () => {
    window.__SERVICE_STAGE_HOST__ = undefined;
    const result = getDefaultServiceStageHost();
    expect(result).toBeUndefined();
  });

  it("should successfully get the default service stage host", () => {
    window.__SERVICE_STAGE_HOST__ = "mock://sandbox.paypal.com";
    const result = getDefaultServiceStageHost();
    expect(result).toEqual(__SERVICE_STAGE_HOST__);
  });

  it("should successfully identify desktop platform", () => {
    const result = getPlatform();
    expect(result).toEqual(PLATFORM.DESKTOP);
  });

  it("should get the API stage from the default service stage host", () => {
    window.__SERVICE_STAGE_HOST__ = "mock://sandbox.paypal.com";
    const result = getDefaultAPIStageHost();
    expect(result).toEqual(window.__SERVICE_STAGE_HOST__);
  });

  it("should get the API stage from the default stage host", () => {
    window.__SERVICE_STAGE_HOST__ = undefined;
    const result = getDefaultAPIStageHost();
    expect(result).toEqual(__STAGE_HOST__);
  });

  it("should get the API stage when undefined", () => {
    window.__STAGE_HOST__ = window.__SERVICE_STAGE_HOST__ = undefined;
    const result = getDefaultAPIStageHost();
    expect(result).toBeUndefined();
  });

  it("should successfully get the stage host", () => {
    const result = getStageHost();
    expect(result).toEqual(__STAGE_HOST__);
  });

  it("should successfully get the API stage host", () => {
    const result = getAPIStageHost();
    expect(result).toEqual(__STAGE_HOST__);
  });

  it("should get the API stage host when undefined", () => {
    window.__STAGE_HOST__ = window.__SERVICE_STAGE_HOST__ = undefined;
    const result = getAPIStageHost();
    expect(result).toBeUndefined();
  });

  it("should successfully get the debug flag", () => {
    window.__DEBUG__ = true;
    const result = getDebug();
    expect(result).toEqual(window.__DEBUG__);
  });

  it("should successfully get the components list", () => {
    const expectedComponents = ["buttons", "venmo"];
    window.__COMPONENTS__ = expectedComponents;
    const result = getComponents();
    expect(result).toEqual(expectedComponents);
  });

  it("should successfully get the funding eligibility type", () => {
    window.__FUNDING_ELIGIBILITY__ = "credit";
    const result = getFundingEligibility();
    expect(result).toEqual(window.__FUNDING_ELIGIBILITY__);
  });

  it("should successfully get experimation value", () => {
    window.__EXPERIMENTATION__ = {
      __EXPERIENCE__: "1234, 4321",
      __TREATMENT__: "8765,7890",
    };
    const expectedResult = {
      experience: "1234, 4321",
      treatment: "8765,7890",
    };
    const result = getExperimentation();
    expect(result).toEqual(expectedResult);
  });

  it("should get experimation null value", () => {
    window.__EXPERIMENTATION__ = null;
    const expectedResult = null;
    const result = getExperimentation();
    expect(result).toEqual(expectedResult);
  });

  it("should get experimation empty value", () => {
    window.__EXPERIMENTATION__ = {};
    const expectedResult = {};
    const result = getExperimentation();
    expect(result).toEqual(expectedResult);
  });
});
