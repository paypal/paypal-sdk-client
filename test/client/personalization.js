/* @flow */

import { INTENT } from '@paypal/sdk-constants/src';


import { getGraphQLApiMock } from '../mocks';
import { fetchPersonalizations } from '../../src';

describe(`personalization cases`, () => {
    it('should successfully fetch a personalization payload', async () => {
        const graphQLMock = getGraphQLApiMock();

        const mlContext = {
            userAgent:    window.navigator.userAgent,
            buyerCountry: 'US',
            locale:       {
                lang:    'en',
                country: 'US'
            },
            clientId:  'ARSwS0VNqpmnu-zumKX2ZNxfKLHV9M86WS61-hWy8iMezFS8wIoFaFSwIiiKo2t73O1K_zQ6n6WbrYBD',
            buyerIp:   '',
            currency:  'USD',
            cookies:   window.document.cookie || ''
        };

        const extra = {
            commit:          false,
            intent:          INTENT.CAPTURE,
            vault:           false,
            buttonSessionID: '',
            renderedButtons: [],
            label:           'checkout',
            period:          0,
            taglineEnabled:  true,
            layout:          'horizontal',
            buttonSize:      ''
        };
        await fetchPersonalizations({ mlContext, eligibility: {}, extra })
            .then(experiments => {
                let found = false;
                experiments.forEach(experiment => {
                    if (experiment.name === 'tagline' && experiment.tracking !== null && experiment.treatment !== null) {
                        found = true;
                        graphQLMock.done();
                    }
                });

                if (!found) {
                    throw new Error(`Expected tagline experiment to be returned.`);
                }
            });

    });
});
