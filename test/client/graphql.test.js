/* @flow */

import { describe, it, beforeAll, afterAll, expect, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

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
  };
});

describe("graphql cases", () => {
  let mockWorker;
  const graphqlNotFoundFailure = "failWith404";
  const graphqlBodyContainsErrors = "bodyContainsErrorsQuery";
  const validResponseBody = "validResponseBody";
  const fundingEligiblityQuery = "GetFundingEligibility";
  const fundingEligibilitySuccess = "fundingEligiblitySuccess";
  // TODO: Move `callGraphQL` to it's own file/fn
  //  Then test that fn using msw, but we can mock `callGraphQL` from here accordingly on a per-test basis
  // making tests simpler instead of having the catch-all handlers in msw
  const mockGraphQlRestHandler = () => {
    return http.post("/graphql", async ({ request }) => {
      const body = await request.json();
      if (body.query.includes(graphqlNotFoundFailure)) {
        return HttpResponse.json({ testing: true }, { status: 404 });
      } else if (body.query.includes(graphqlBodyContainsErrors)) {
        return HttpResponse.json({ errors: ["unexpected error"] });
      } else if (body.query.includes(fundingEligiblityQuery)) {
        if (body.query.includes(fundingEligibilitySuccess)) {
          return HttpResponse.json({
            data: {
              clientID: "Somethingsomething",
              fundingEligibility: {
                clientId: "a-funding-eligiblity-client-id",
              },
            },
          });
        } else {
          return HttpResponse.json({ clientID: "Somethingsomething" });
        }
      }

      return HttpResponse.json({
        data: {
          received: true,
          fundingEligibility: { eligibleOrSomething: true },
        },
      });
    });
  };

  beforeAll(() => {
    mockWorker = setupServer(mockGraphQlRestHandler());
    mockWorker.listen();
  });

  afterAll(() => {
    mockWorker.close();
  });
  it("callGraphQL should fail when graphql returns a non-200 status", async () => {
    await expect(() =>
      callGraphQL({ query: `${graphqlNotFoundFailure} {}` })
    ).rejects.toThrow("/graphql returned status 404");
  });

  it("callGraphQL should throw an exception when the response body contains errors", async () => {
    await expect(() =>
      callGraphQL({ query: `${graphqlBodyContainsErrors} {}` })
    ).rejects.toThrow("unexpected error");
  });

  it("callGraphQL should return a valid body response", async () => {
    // $FlowIgnore[prop-missing]
    const { received } = await callGraphQL({
      query: `${validResponseBody} {}`,
    });
    expect(received).toBe(true);
  });

  it("getGraphQLFundingEligibility should throw an error when fundingEligibility is not in the response", async () => {
    const expectedErrorMessage =
      "GraphQL fundingEligibility returned no fundingEligibility object";

    await expect(() =>
      getGraphQLFundingEligibility("noFundingEligiblity")
    ).rejects.toThrow(expectedErrorMessage);
  });

  it("getGraphQLFundingEligibility should return the fundingEligibility", async () => {
    const result = await getGraphQLFundingEligibility(
      fundingEligibilitySuccess
    );
    expect(result).toEqual({ clientId: "a-funding-eligiblity-client-id" });
  });
});
