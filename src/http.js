/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { HTTP_HEADERS } from './constants';
import { debounce } from './util';

type RequestOptionsType = {
    url : string,
    query? : { [string] : string },
    method? : string,
    headers? : { [key : string] : string },
    json? : Object,
    data? : { [key : string] : string },
    body? : string,
    timeout? : number
};

function parseQuery(queryString : string) : Object {

    let params = {};

    if (!queryString) {
        return params;
    }

    if (queryString.indexOf('=') === -1) {
        return params;
    }

    for (let pair of queryString.split('&')) {
        pair = pair.split('=');

        if (pair[0] && pair[1]) {
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    }

    return params;
}

function extendUrl(url : string, params : { [key : string] : string } = {}) : string {

    let hasHash = url.indexOf('#') > 0;

    let [ serverUrl, hash ] = url.split('#');

    if (hash && !serverUrl) {
        [ serverUrl, hash ] = [ `#${ hash }`, '' ];
    }

    let [ originalUrl, originalQueryString ] = serverUrl.split('?');

    if (originalQueryString) {
        let originalQuery = parseQuery(originalQueryString);

        for (let key in originalQuery) {
            if (!params.hasOwnProperty(key)) {
                params[key] = originalQuery[key];
            }
        }
    }

    let newQueryString = Object.keys(params).filter(key => key && params[key]).sort().map(key => {
        return `${ encodeURIComponent(key) }=${ encodeURIComponent(params[key]) }`;
    }).join('&');

    let newUrl = originalUrl;

    if (newQueryString) {
        newUrl = `${ newUrl }?${ newQueryString }`;
    }

    if (hasHash) {
        newUrl = `${ newUrl }#${ hash || '' }`;
    }

    return newUrl;
}

function parseHeaders(rawHeaders : string = '') : { [string] : string } {
    let result = {};
    for (let line of rawHeaders.trim().split('\n')) {
        let [ key, ...vals ] = line.split(':');
        result[key.toLowerCase()] = vals.join(':').trim();
    }
    return result;
}

export function request({ url, method = 'get', query = {}, headers = {}, json, data, body, timeout = 0 } : RequestOptionsType) : ZalgoPromise<Object> {
    return new ZalgoPromise((resolve, reject) => {
        extendUrl(url, query);

        if ((json && data) || (json && body) || (data && json)) {
            throw new Error(`Only options.json or options.data or options.body should be passed`);
        }

        let normalizedHeaders = {};

        for (let key of Object.keys(headers)) {
            normalizedHeaders[key.toLowerCase()] = headers[key];
        }

        if (json) {
            normalizedHeaders[HTTP_HEADERS.CONTENT_TYPE] = normalizedHeaders[HTTP_HEADERS.CONTENT_TYPE] || 'application/json';
        } else if (data || body) {
            normalizedHeaders[HTTP_HEADERS.CONTENT_TYPE] = normalizedHeaders[HTTP_HEADERS.CONTENT_TYPE] || 'application/x-www-form-urlencoded; charset=utf-8';
        }

        normalizedHeaders[HTTP_HEADERS.ACCEPT] = normalizedHeaders[HTTP_HEADERS.ACCEPT] || 'application/json';

        let xhr = new window.XMLHttpRequest();

        xhr.addEventListener('load', function xhrLoad() : void {

            let responseHeaders = parseHeaders(this.getAllResponseHeaders());

            if (!this.status) {
                return reject(new Error(`Request to ${ method.toLowerCase() } ${ url } failed: no response status code.`));
            }

            let contentType = responseHeaders['content-type'];
            let isJSON = contentType && (contentType.indexOf('application/json') === 0 || contentType.indexOf('text/json') === 0);
            let res = this.responseText;

            try {
                res = JSON.parse(this.responseText);
            } catch (err) {
                if (isJSON) {
                    return reject(new Error(`Invalid json: ${ this.responseText }`));
                }
            }

            if (this.status >= 400) {
                let message = `Request to ${ method.toLowerCase() } ${ url } failed with ${ this.status } error.`;

                if (res) {
                    if (typeof res === 'object' && res !== null) {
                        res = JSON.stringify(res, null, 4);
                    }

                    message = `${ message }\n\n${ res }\n`;
                }

                return reject(new Error(message));
            }

            return resolve(res);

        }, false);

        xhr.addEventListener('error', function xhrError(evt) {
            let corrID = this.getResponseHeader('paypal-debug-id');
            reject(new Error(`Request to ${ method.toLowerCase() } ${ url } failed: ${ evt.toString() }. Correlation id: ${ corrID }`));
        }, false);

        xhr.open(method, url, true);

        for (let key in normalizedHeaders) {
            if (normalizedHeaders.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, normalizedHeaders[key]);
            }
        }

        if (json) {
            body = JSON.stringify(json);
        } else if (data) {
            body = Object.keys(data).map(key => {
                return `${ encodeURIComponent(key) }=${ data ? encodeURIComponent(data[key]) : '' }`;
            }).join('&');
        }

        xhr.timeout = timeout;
        xhr.ontimeout = function xhrTimeout() {
            reject(new Error(`Request to ${ method.toLowerCase() } ${ url } has timed out`));
        };

        xhr.send(body);
    });
}

request.get = (url : string, options = {}) => {
    return request({ method: 'get', url, ...options });
};

request.post = (url : string, data, options = {}) => {
    return request({ method: 'post', url, data, ...options });
};

request.getDebounce = debounce('__request_get__', request.get, 100);
