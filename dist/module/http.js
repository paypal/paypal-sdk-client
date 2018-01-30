var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

import { ZalgoPromise } from 'zalgo-promise/src';

import { HTTP_HEADERS } from './constants';
import { debounce } from './util';

function parseQuery(queryString) {

    var params = {};

    if (!queryString) {
        return params;
    }

    if (queryString.indexOf('=') === -1) {
        return params;
    }

    for (var _iterator = queryString.split('&'), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var pair = _ref;

        pair = pair.split('=');

        if (pair[0] && pair[1]) {
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    }

    return params;
}

function extendUrl(url) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    var hasHash = url.indexOf('#') > 0;

    var _url$split = url.split('#'),
        _url$split2 = _slicedToArray(_url$split, 2),
        serverUrl = _url$split2[0],
        hash = _url$split2[1];

    if (hash && !serverUrl) {
        var _ref2 = ['#' + hash, ''];
        serverUrl = _ref2[0];
        hash = _ref2[1];
    }

    var _serverUrl$split = serverUrl.split('?'),
        _serverUrl$split2 = _slicedToArray(_serverUrl$split, 2),
        originalUrl = _serverUrl$split2[0],
        originalQueryString = _serverUrl$split2[1];

    if (originalQueryString) {
        var originalQuery = parseQuery(originalQueryString);

        for (var _key in originalQuery) {
            if (!params.hasOwnProperty(_key)) {
                params[_key] = originalQuery[_key];
            }
        }
    }

    var newQueryString = Object.keys(params).filter(function (key) {
        return key && params[key];
    }).sort().map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');

    var newUrl = originalUrl;

    if (newQueryString) {
        newUrl = newUrl + '?' + newQueryString;
    }

    if (hasHash) {
        newUrl = newUrl + '#' + (hash || '');
    }

    return newUrl;
}

function parseHeaders() {
    var rawHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var result = {};
    for (var _iterator2 = rawHeaders.trim().split('\n'), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref3 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref3 = _i2.value;
        }

        var line = _ref3;

        var _line$split = line.split(':'),
            _line$split2 = _toArray(_line$split),
            _key2 = _line$split2[0],
            vals = _line$split2.slice(1);

        result[_key2.toLowerCase()] = vals.join(':').trim();
    }
    return result;
}

export function request(_ref4) {
    var url = _ref4.url,
        _ref4$method = _ref4.method,
        method = _ref4$method === undefined ? 'get' : _ref4$method,
        _ref4$query = _ref4.query,
        query = _ref4$query === undefined ? {} : _ref4$query,
        _ref4$headers = _ref4.headers,
        headers = _ref4$headers === undefined ? {} : _ref4$headers,
        json = _ref4.json,
        data = _ref4.data,
        body = _ref4.body,
        _ref4$timeout = _ref4.timeout,
        timeout = _ref4$timeout === undefined ? 0 : _ref4$timeout;

    return new ZalgoPromise(function (resolve, reject) {
        extendUrl(url, query);

        if (json && data || json && body || data && json) {
            throw new Error('Only options.json or options.data or options.body should be passed');
        }

        var normalizedHeaders = {};

        for (var _iterator3 = Object.keys(headers), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref5 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref5 = _i3.value;
            }

            var _key4 = _ref5;

            normalizedHeaders[_key4.toLowerCase()] = headers[_key4];
        }

        if (json) {
            normalizedHeaders[HTTP_HEADERS.CONTENT_TYPE] = normalizedHeaders[HTTP_HEADERS.CONTENT_TYPE] || 'application/json';
        } else if (data || body) {
            normalizedHeaders[HTTP_HEADERS.CONTENT_TYPE] = normalizedHeaders[HTTP_HEADERS.CONTENT_TYPE] || 'application/x-www-form-urlencoded; charset=utf-8';
        }

        normalizedHeaders[HTTP_HEADERS.ACCEPT] = normalizedHeaders[HTTP_HEADERS.ACCEPT] || 'application/json';

        var xhr = new window.XMLHttpRequest();

        xhr.addEventListener('load', function xhrLoad() {

            var responseHeaders = parseHeaders(this.getAllResponseHeaders());

            if (!this.status) {
                return reject(new Error('Request to ' + method.toLowerCase() + ' ' + url + ' failed: no response status code.'));
            }

            var contentType = responseHeaders['content-type'];
            var isJSON = contentType && (contentType.indexOf('application/json') === 0 || contentType.indexOf('text/json') === 0);
            var res = this.responseText;

            try {
                res = JSON.parse(this.responseText);
            } catch (err) {
                if (isJSON) {
                    return reject(new Error('Invalid json: ' + this.responseText));
                }
            }

            if (this.status >= 400) {
                var message = 'Request to ' + method.toLowerCase() + ' ' + url + ' failed with ' + this.status + ' error.';

                if (res) {
                    if ((typeof res === 'undefined' ? 'undefined' : _typeof(res)) === 'object' && res !== null) {
                        res = JSON.stringify(res, null, 4);
                    }

                    message = message + '\n\n' + res + '\n';
                }

                return reject(new Error(message));
            }

            return resolve(res);
        }, false);

        xhr.addEventListener('error', function xhrError(evt) {
            var corrID = this.getResponseHeader('paypal-debug-id');
            reject(new Error('Request to ' + method.toLowerCase() + ' ' + url + ' failed: ' + evt.toString() + '. Correlation id: ' + corrID));
        }, false);

        xhr.open(method, url, true);

        for (var _key3 in normalizedHeaders) {
            if (normalizedHeaders.hasOwnProperty(_key3)) {
                xhr.setRequestHeader(_key3, normalizedHeaders[_key3]);
            }
        }

        if (json) {
            body = JSON.stringify(json);
        } else if (data) {
            body = Object.keys(data).map(function (key) {
                return encodeURIComponent(key) + '=' + (data ? encodeURIComponent(data[key]) : '');
            }).join('&');
        }

        xhr.timeout = timeout;
        xhr.ontimeout = function xhrTimeout() {
            reject(new Error('Request to ' + method.toLowerCase() + ' ' + url + ' has timed out'));
        };

        xhr.send(body);
    });
}

request.get = function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return request(_extends({ method: 'get', url: url }, options));
};

request.post = function (url, data) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return request(_extends({ method: 'post', url: url, data: data }, options));
};

request.getDebounce = debounce('__request_get__', request.get, 100);