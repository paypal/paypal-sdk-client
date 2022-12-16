import { $mockEndpoint } from "@krakenjs/sync-browser-mocks/dist/sync-browser-mocks";
import { describe, it } from "vitest";

import { callGraphQL, getGraphQLFundingEligibility } from "../../src/graphql";
import { insertMockSDKScript } from "../../src";

describe("graphql cases", () => {
  const mockGraphQl = function (
    data: {
      errors?: string[];
      data?:
        | { received: boolean }
        | { fundingEligibility: Record<string, unknown> };
    },
    status = 200
  ) {
    $mockEndpoint
      .register({
        method: "POST",
        uri: `${window.location.protocol}//${window.location.host}/graphql`,
        status,
        data,
      })
      .listen();
  };

  it("callGraphQL should fail with status code 404 when the URL was not found", async () => {
    mockGraphQl({}, 404);

    try {
      await callGraphQL({
        query: "query {}",
      });
    } catch (err) {
      if ((err as Error).message !== "/graphql returned status 404") {
        throw new Error(
          `should throw an error message "/graphql returned status 404", but got: ${
            (err as Error).message
          }`
        );
      }
    }
  });
  it("callGraphQL should throw an exception when the response body contains errors", async () => {
    const sourceData = {
      errors: ["unexpected error"],
    };
    mockGraphQl(sourceData);

    try {
      await callGraphQL({
        query: "query {}",
      });
    } catch (err) {
      if (JSON.stringify(sourceData.errors[0]) !== (err as Error).message) {
        throw new Error(
          `should throw an error message "${sourceData.errors[0]}", but got: ${
            (err as Error).message
          }`
        );
      }
    }
  });
  it("callGraphQL should return a valid body response", async () => {
    const sourceData = {
      data: {
        received: true,
      },
    };
    mockGraphQl(sourceData);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
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
      if ((err as Error).message !== expectedErrorMessage) {
        throw new Error(
          `should throw an error message "${expectedErrorMessage}", but got: ${
            (err as Error).message
          }`
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
    mockGraphQl({
      data: {
        fundingEligibility: {},
      },
    });
    const result = await getGraphQLFundingEligibility("field: field");

    if (!result) {
      throw new Error(
        `should return finding eligibility as "true", but got: ${
          result as string
        }`
      );
    }
  });
});
