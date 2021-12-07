/* @flow */

import { $mockEndpoint } from 'sync-browser-mocks/dist/sync-browser-mocks';

type MockEndpoint = {|
    listen : () => MockEndpoint,
    expectCalls : () => MockEndpoint,
    done : () => MockEndpoint,
    enable : () => MockEndpoint,
    disable : () => MockEndpoint
|};

export function getGraphQLApiMock(options : Object = {}) : MockEndpoint {
    return $mockEndpoint.register({
        method:  'POST',
        uri:     '/graphql',
        handler: ({ uri, method, query, data, headers }) => {
            if (options.extraHandler) {
                const result = options.extraHandler({ uri, method, query, data, headers });
                if (result) {
                    return result;
                }
            }

            if (options.data) {
                return options.data;
            }

            if (data.query.includes('query GetPersonalization')) {
                return {
                    data: {
                        'checkoutCustomization': {
                            'tagline': {
                                'text':     'Pay now or pay later',
                                'tracking': {
                                    'impression': '',
                                    'click':      ''
                                }
                            },
                            'buttonText':      null,
                            'buttonAnimation': null
                        }
                    }
                };
            }

            return {};
        },
        ...options
    });
}

getGraphQLApiMock().listen();
