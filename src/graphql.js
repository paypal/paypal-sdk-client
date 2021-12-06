/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { request, stringifyError } from 'belter/src';
import { CURRENCY, type FundingEligibilityType } from '@paypal/sdk-constants/src';

import { getLogger } from './logger';
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
    getBuyerCountry
} from './script';
import { buildPayPalUrl } from './domains';
import type { MLContext, Personalization, Extra } from './personalization';

export const LocationType = {
    'BEFORE': ('before' : 'before'),
    'AFTER':  ('after' : 'after'),
    'INNER':  ('inner' : 'inner')
};

type FundingEligibilityParams = {|
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    buyerCountry : ?string,
    currency : $Values<typeof CURRENCY>,
    commit : boolean,
    vault : boolean,
    intent : string,
    enableFunding : $ReadOnlyArray<?string>,
    disableFunding : $ReadOnlyArray<?string>,
    disableCard : $ReadOnlyArray<?string>
|};

const GRAPHQL_URI = '/graphql';

function buildFundingEligibilityVariables() : FundingEligibilityParams {
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
        intent:         intent ? intent.toUpperCase() : intent,
        enableFunding:  enableFunding ? enableFunding.map(f => f && f.toUpperCase()) : enableFunding,
        disableFunding: disableFunding ? disableFunding.map(f => f && f.toUpperCase()) : disableFunding,
        disableCard:    disableCard ? disableCard.map(f => f && f.toUpperCase()) : disableCard
    };
}

function getDefaultVariables<V>() : V {
    // $FlowFixMe[incompatible-return]
    return {};
}

export function callGraphQL<T, V>({ query, variables = getDefaultVariables(), headers = {} } : {| query : string, variables : V, headers? : { [string] : string } |}) : ZalgoPromise<T> {
    return request({
        url:     buildPayPalUrl(GRAPHQL_URI),
        method:  'POST',
        json:    {
            query,
            variables
        },
        headers: {
            'x-app-name': 'hosted_fields',
            ...headers
        }
    }).then(({ status, body }) => {
        const errors = body.errors || [];

        if (errors.length) {
            const message = errors[0].message || JSON.stringify(errors[0]);
            throw new Error(message);
        }

        if (status !== 200) {
            throw new Error(`${ GRAPHQL_URI } returned status ${ status }`);
        }

        return body.data;
    });
}

// call gql with multiple merchant ids to get fundingEligibility for card
export function getGraphQLFundingEligibility<T>(fields : string) : ZalgoPromise<T> {
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
                ${ fields }
            }
          }
        `,
        variables
    }).then((gqlResult) => {
        if (!gqlResult || !gqlResult.fundingEligibility) {
            throw new Error(`GraphQL fundingEligibility returned no fundingEligibility object`);
        }
        return gqlResult && gqlResult.fundingEligibility;
    }).catch(err => {
        getLogger().error(`graphql_fundingeligibility_error`, { err: stringifyError(err) });
        return ZalgoPromise.reject(err);
    });
}

const PERSONALIZATION_QUERY = `
    query GetPersonalization(
        $clientId: String,
        $buyerCountry: CountryCodes,
        $ip: String,
        $cookies: String,
        $currency: SupportedCountryCurrencies,
        $intent: FundingEligibilityIntent,
        $commit: Boolean,
        $vault: Boolean,
        $merchantID: [String],
        $buttonSessionID: String,
        $userAgent: String,
        $locale: LocaleInput!,
        $label: ButtonLabels,
        $period: String,
        $taglineEnabled: Boolean,
        $renderedButtons: [FundingButtonType]
        $layout: ButtonLayouts
        $buttonSize: ButtonSizes
    ) {
        checkoutCustomization(
            clientId: $clientId,
            merchantId: $merchantID,
            currency: $currency,
            commit: $commit,
            intent: $intent,
            vault: $vault,
            buyerCountry: $buyerCountry,
            ip: $ip,
            cookies: $cookies,
            buttonSessionId: $buttonSessionID,
            userAgent: $userAgent,
            locale: $locale,
            buttonLabel: $label,
            installmentPeriod: $period,
            taglineEnabled: $taglineEnabled,
            renderedButtons: $renderedButtons
            layout: $layout
            buttonSize: $buttonSize
        ) {
            tagline {
                text
                tracking {
                    impression
                    click
                }
            }
            buttonText {
                text
                tracking {
                    impression
                    click
                }
            }
            buttonAnimation {
                id
                text
                tracking {
                    impression
                    click
                }
            }
        }
    }
`;

function adaptPersonalizationToExperiments(personalization) : ?$ReadOnlyArray<Personalization> {
    const personalizations = [];
    Object.keys(personalization).forEach(experiment => {
        personalizations.push({
            id:        experiment.id,
            name:      experiment,
            tracking:  experiment.tracking,
            treatment: {
                name:   experiment,
                html: {
                    markup:   experiment.text,
                    selector: '',
                    location: LocationType.INNER
                },
                css: '',
                js:  ''
            }
        });
    });

    return personalizations;
}

export function getPersonalizations({ mlContext, eligibility, extra } : {| mlContext : MLContext, eligibility? : FundingEligibilityType, extra : Extra |}) : ZalgoPromise<$ReadOnlyArray<Personalization>> {
    const { userAgent, buyerCountry, locale, clientId, buyerIp: ip, currency, cookies } = mlContext;
    const { commit, intent, vault, buttonSessionID, renderedButtons, label, period, taglineEnabled, layout, buttonSize } = extra;
    const variables = {
        clientId,
        locale,
        buyerCountry,
        currency,
        intent,
        commit,
        vault,
        ip,
        cookies,
        userAgent,
        buttonSessionID,
        renderedButtons,
        label,
        period,
        taglineEnabled,
        layout,
        buttonSize,
        eligibility
    };

    // Placeholder for future API changes
    if (eligibility) {
        variables.eligibility = eligibility;
    } else {
        delete variables.eligibility;
    }

    return callGraphQL({
        query: PERSONALIZATION_QUERY,
        variables
    }).then((gqlResult) => {
        if (!gqlResult || !gqlResult.checkoutCustomization) {
            throw new Error(`GraphQL checkoutCustomization returned no checkoutCustomization object`);
        }
        return adaptPersonalizationToExperiments(gqlResult && gqlResult.checkoutCustomization);
    }).catch(err => {
        getLogger().error(`graphql_checkoutCustomization_error`, { err: stringifyError(err) });
        return ZalgoPromise.reject(err);
    });
}
