/* @flow */

export const SUPPORTED_BROWSERS = {
    msie:           '11',
    firefox:        '30',
    chrome:         '27',
    safari:         '7',
    opera:          '16',
    msedge:         '12',
    samsungBrowser: '2.1',
    silk:           '59.3',
    ucbrowser:      '10.0.0.488',
    vivaldi:        '1.91'
};

const SANDBOX_ALIAS = 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R';

export const CLIENT_ID_ALIAS = {
    sandbox:    SANDBOX_ALIAS,
    sb:         SANDBOX_ALIAS,
    test:       SANDBOX_ALIAS
};

export const URI = {
    LOGGER: `/xoplatform/logger/api/logger`,
    AUTH:   `/v1/oauth2/token`,
    ORDER:  `/v2/checkout/orders`
};
