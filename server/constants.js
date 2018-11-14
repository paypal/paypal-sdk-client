/* @flow */

export const HOST = {
    LOCALHOST:     'localhost.paypal.com',
    PAYPAL:        '.paypal.com',
    PAYPALOBJECTS: 'www.paypalobjects.com'
};

export const PROTOCOL = {
    HTTP:  'http:',
    HTTPS: 'https:'
};

// eslint-disable-next-line security/detect-unsafe-regex, unicorn/no-unsafe-regex
export const LEGACY_SDK_PATH = /^\/api\/checkout(\.4\.0\.\d{1,3})?(\.min)?\.js/;

export const DEFAULT_SDK_META = {
    url: ''
};

export const DEFAULT_LEGACY_SDK_BASE_URL = 'https://www.paypalobjects.com/api/';
