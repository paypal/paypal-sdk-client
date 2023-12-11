/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { request, stringifyError } from "@krakenjs/belter/src";

import { getLogger } from "./logger";
import {
  getIntent,
  getCurrency,
  getClientID,
  getMerchantID,
  getCommit,
  getVault,
  getEnableFunding,
  getDisableFunding,
  getDisableCard,
  getBuyerCountry,
} from "./script";
import { buildPayPalUrl } from "./domains";

const GRAPHQL_URI = "/graphql";

function buildFundingEligibilityVariables(): { [string]: mixed } {
  const clientID = getClientID();
  const merchantID = getMerchantID();
  const buyerCountry = getBuyerCountry();
  const currency = getCurrency();
  const commit = getCommit();
  const vault = getVault();
  const intent = getIntent();
  const enableFunding = getEnableFunding();
  const disableFunding = getDisableFunding();
  const disableCard = getDisableCard();

  return {
    clientID,
    merchantID,
    buyerCountry,
    currency,
    commit,
    vault,
    intent: intent ? intent.toUpperCase() : intent,
    enableFunding: enableFunding
      ? enableFunding.map((f) => f && f.toUpperCase())
      : enableFunding,
    disableFunding: disableFunding
      ? disableFunding.map((f) => f && f.toUpperCase())
      : disableFunding,
    disableCard: disableCard
      ? disableCard.map((f) => f && f.toUpperCase())
      : disableCard,
  };
}

export function callGraphQL<T>({
  query,
  variables = {},
  headers = {},
}: {|
  query: string,
  variables?: { [string]: mixed },
  headers?: { [string]: string },
|}): ZalgoPromise<T> {
  console.log(`query`, query);
  return request({
    url: buildPayPalUrl(GRAPHQL_URI),
    method: "POST",
    json: {
      query,
      variables,
    },
    headers: {
      "x-app-name": "hosted_fields",
      ...headers,
    },
  }).then(({ status, body }) => {
    const errors = body.errors || [];

    if (errors.length) {
      const message = errors[0].message || JSON.stringify(errors[0]);
      throw new Error(message);
    }
    console.log(`status`, status);
    if (status !== 200) {
      throw new Error(`${GRAPHQL_URI} returned status ${status}`);
    }

    return body.data;
  });
}

// call gql with multiple merchant ids to get fundingEligibility for card
export function getGraphQLFundingEligibility<T>(
  fields: string
): ZalgoPromise<T> {
  const variables = buildFundingEligibilityVariables();

  return callGraphQL({
    query: `
            query GetFundingEligibility(
                $clientID:String,
                $merchantID:[ String ],
                $buyerCountry:CountryCodes,
                $currency:SupportedCountryCurrencies,
                $intent:FundingEligibilityIntent,
                $commit:Boolean,
                $vault:Boolean,
                $enableFunding:[ SupportedPaymentMethodsType ],
                $disableFunding:[ SupportedPaymentMethodsType ],
                $disableCard:[ SupportedCardsType ]
            ) {
            fundingEligibility(
                clientId:$clientID,
                buyerCountry:$buyerCountry,
                currency:$currency,
                intent:$intent,
                commit:$commit,
                vault:$vault,
                enableFunding:$enableFunding,
                disableFunding:$disableFunding,
                disableCard:$disableCard,
                merchantId:$merchantID
            ) {
                ${fields}
            }
          }
        `,
    variables,
  })
    .then((gqlResult) => {
      if (!gqlResult || !gqlResult.fundingEligibility) {
        throw new Error(
          `GraphQL fundingEligibility returned no fundingEligibility object`
        );
      }
      return gqlResult && gqlResult.fundingEligibility;
    })
    .catch((err) => {
      getLogger().error(`graphql_fundingeligibility_error`, {
        err: stringifyError(err),
      });
      return ZalgoPromise.reject(err);
    });
}
