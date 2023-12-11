/* @flow */

import { $mockEndpoint } from "@krakenjs/sync-browser-mocks/dist/sync-browser-mocks";
import { describe, it, beforeAll, afterAll, expect } from "vitest";
import { graphql, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { callGraphQL, getGraphQLFundingEligibility } from "../../src/graphql";
import { insertMockSDKScript } from "../../src";

describe("graphql cases", () => {
  let mockWorker;
  const graphqlNotFoundFailure = "failWith404";
  const makeMockGraphQlHandler = () => {
    return graphql.query("GetFundingEligibility", ({ query }) => {
      console.log(`query`, query);
      return HttpResponse.json({ someData: true });
    });
  };
  const mockGraphQlRestHandler = () => {
    return http.post("/graphql", async ({ request }) => {
      console.log(`request`, request.body);
      try {
        const body = await request.body.json();
        console.log(`body`, body);
      } catch (error) {
        console.log(`error`, error);
      }
      return HttpResponse.json({ testing: true }, { status: 404 });
    });
  };
  const mockGraphQl = function (data, status = 200) {
    $mockEndpoint
      .register({
        method: "POST",
        uri: `${window.location.protocol}//${window.location.host}/graphql`,
        status,
        data,
      })
      .listen();
  };

  beforeAll(() => {
    mockWorker = setupServer(mockGraphQlRestHandler());
    mockWorker.listen();
  });

  afterAll(() => {
    mockWorker.close();
  });
  it.only("callGraphQL should fail when graphql returns a non-200 status", async () => {
    await expect(() =>
      callGraphQL({ query: `${graphqlNotFoundFailure} {}` })
    ).rejects.toThrow("/graphql returned status 404");
  });

  it.only("callGraphQL should throw an exception when the response body contains errors", async () => {
    const sourceData = { errors: ["unexpected error"] };

    mockGraphQl(sourceData);
    try {
      await callGraphQL({
        query: "query {}",
      });
    } catch (err) {
      if (JSON.stringify(sourceData.errors[0]) !== err.message) {
        throw new Error(
          `should throw an error message "${sourceData.errors[0]}", but got: ${err.message}`
        );
      }
    }
  });

  it("callGraphQL should return a valid body response", async () => {
    const sourceData = { data: { received: true } };

    mockGraphQl(sourceData);
    // $FlowIgnore[prop-missing]
    const { received } = await callGraphQL({
      query: "query {}",
    });

    if (sourceData.data.received !== received) {
      throw new Error(
        `should return a valid data response, but got: ${String(received)}`
      );
    }
  });

  it("getGraphQLFundingEligibility should throw an error when fundingEligibility is not in the response", async () => {
    const expectedErrorMessage =
      "GraphQL fundingEligibility returned no fundingEligibility object";

    try {
      await getGraphQLFundingEligibility("fields");
    } catch (err) {
      if (err.message !== expectedErrorMessage) {
        throw new Error(
          `should throw an error message "${expectedErrorMessage}", but got: ${err.message}`
        );
      }
    }
  });

  it("getGraphQLFundingEligibility should return the fundingEligibility", async () => {
    insertMockSDKScript({
      query: {
        "enable-funding": "paypal",
        "disable-funding": "venmo",
        "disable-card": "braintree",
      },
    });
    mockGraphQl({ data: { fundingEligibility: {} } });
    const result = await getGraphQLFundingEligibility("field: field");

    if (!result) {
      throw new Error(
        `should return finding eligibility as "true", but got: ${result}`
      );
    }
  });
});
