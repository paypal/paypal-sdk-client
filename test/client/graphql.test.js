/* @flow */

import { describe, it, expect, vi, afterAll } from "vitest";
import { request } from "@krakenjs/belter/src";

import { callGraphQL, getGraphQLFundingEligibility } from "../../src/graphql";

vi.mock("@krakenjs/belter/src", async () => {
  const actual = await vi.importActual("@krakenjs/belter/src");
  return {
    ...actual,
    getCurrentScript: vi.fn(() => ({
      src: "https://mock-sdk.com/sdk/js?client-id='test'",
      attributes: [],
      hasAttribute: vi.fn(),
    })),
    request: vi.fn(),
  };
});

describe("graphql cases", () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  it("callGraphQL should fail when graphql returns a non-200 status", async () => {
    const expectedStatus = 404;
    request.mockResolvedValue({ body: {}, status: expectedStatus });
    await expect(() =>
      callGraphQL({ query: `non200Status {}` })
    ).rejects.toThrow(`/graphql returned status ${expectedStatus}`);
  });

  it("callGraphQL should throw an exception when the response body contains errors", async () => {
    const expectedError = "unexpected error";
    request.mockResolvedValue({ body: { errors: [expectedError] } });
    await expect(() =>
      callGraphQL({ query: `graphqlErrors {}` })
    ).rejects.toThrow(expectedError);
  });

  it("callGraphQL should return a valid body response", async () => {
    request.mockResolvedValue({
      body: { data: { received: true } },
      status: 200,
    });

    // $FlowIgnore[prop-missing]
    const { received } = await callGraphQL({
      query: `validResponseBody {}`,
    });
    expect(received).toBe(true);
  });

  it("getGraphQLFundingEligibility should throw an error when fundingEligibility is not in the response", async () => {
    const expectedErrorMessage =
      "GraphQL fundingEligibility returned no fundingEligibility object";
    request.mockResolvedValue({ body: { data: {} }, status: 200 });

    await expect(() =>
      getGraphQLFundingEligibility("noFundingEligiblity")
    ).rejects.toThrow(expectedErrorMessage);
  });

  it("getGraphQLFundingEligibility should return the fundingEligibility", async () => {
    request.mockResolvedValue({
      body: {
        data: {
          clientID: "Somethingsomething",
          fundingEligibility: {
            clientId: "a-funding-eligiblity-client-id",
          },
        },
      },
      status: 200,
    });

    const result = await getGraphQLFundingEligibility(
      "fundingEligibilitySuccess"
    );
    expect(result).toEqual({ clientId: "a-funding-eligiblity-client-id" });
  });
});
