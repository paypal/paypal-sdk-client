!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("btppClientConfig", [], factory) : "object" == typeof exports ? exports.btppClientConfig = factory() : root.btppClientConfig = factory();
}("undefined" != typeof self ? self : this, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = !0;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = "./src/index.js");
    }({
        "./node_modules/belter/src/device.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.a = function() {
                return !!(window.navigator.mockUserAgent || window.navigator.userAgent).match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i);
            };
        },
        "./node_modules/belter/src/dom.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/zalgo-promise/src/index.js");
            var util = __webpack_require__("./node_modules/belter/src/util.js");
            __webpack_require__("./node_modules/belter/src/device.js");
            __webpack_exports__.c = function() {
                return "undefined" != typeof window;
            };
            __webpack_exports__.b = function getScript(_ref2) {
                var _ref2$host = _ref2.host, host = void 0 === _ref2$host ? window.location.host : _ref2$host, path = _ref2.path;
                return Object(util.b)(getScript, function() {
                    for (var url = "" + host + path, scripts = Array.prototype.slice.call(document.getElementsByTagName("script")), _i4 = 0, _length4 = null == scripts ? 0 : scripts.length; _i4 < _length4; _i4++) {
                        var script = scripts[_i4];
                        if (script.src && script.src.replace(/^https?:\/\//, "").split("?")[0] === url) return script;
                    }
                }, [ path ]);
            };
            __webpack_exports__.d = function isLocalStorageEnabled() {
                return Object(util.b)(isLocalStorageEnabled, function() {
                    try {
                        if ("undefined" == typeof window) return !1;
                        if (window.localStorage) {
                            var value = Math.random().toString();
                            window.localStorage.setItem("__test__localStorage__", value);
                            var result = window.localStorage.getItem("__test__localStorage__");
                            window.localStorage.removeItem("__test__localStorage__");
                            if (value === result) return !0;
                        }
                    } catch (err) {}
                    return !1;
                });
            };
            __webpack_exports__.a = function() {
                var nav = window.navigator, locales = nav.languages ? Array.prototype.slice.apply(nav.languages) : [];
                nav.language && locales.push(nav.language);
                nav.userLanguage && locales.push(nav.userLanguage);
                return locales.map(function(locale) {
                    if (locale && locale.match(/^[a-z]{2}[-_][A-Z]{2}$/)) {
                        var _locale$split = locale.split(/[-_]/), _lang = _locale$split[0];
                        return {
                            country: _locale$split[1],
                            lang: _lang
                        };
                    }
                    return locale && locale.match(/^[a-z]{2}$/) ? {
                        lang: locale
                    } : null;
                }).filter(Boolean);
            };
        },
        "./node_modules/belter/src/experiment.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/belter/src/util.js"), __webpack_require__("./node_modules/belter/src/storage.js");
        },
        "./node_modules/belter/src/global.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/belter/src/util.js");
        },
        "./node_modules/belter/src/http.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.a = function(_ref) {
                var url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, _ref$headers = _ref.headers, headers = void 0 === _ref$headers ? {} : _ref$headers, json = _ref.json, data = _ref.data, body = _ref.body, _ref$win = _ref.win, win = void 0 === _ref$win ? window : _ref$win, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 0 : _ref$timeout;
                return new __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a(function(resolve, reject) {
                    if (json && data || json && body || data && json) throw new Error("Only options.json or options.data or options.body should be passed");
                    for (var normalizedHeaders = {}, _i4 = 0, _Object$keys2 = Object.keys(headers), _length4 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
                        var _key2 = _Object$keys2[_i4];
                        normalizedHeaders[_key2.toLowerCase()] = headers[_key2];
                    }
                    json ? normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/json" : (data || body) && (normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/x-www-form-urlencoded; charset=utf-8");
                    normalizedHeaders[HEADERS.ACCEPT] = normalizedHeaders[HEADERS.ACCEPT] || "application/json";
                    for (var _i6 = 0, _length6 = null == headerBuilders ? 0 : headerBuilders.length; _i6 < _length6; _i6++) for (var builtHeaders = (0, 
                    headerBuilders[_i6])(), _i8 = 0, _Object$keys4 = Object.keys(builtHeaders), _length8 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i8 < _length8; _i8++) {
                        var _key3 = _Object$keys4[_i8];
                        normalizedHeaders[_key3.toLowerCase()] = builtHeaders[_key3];
                    }
                    var xhr = new win.XMLHttpRequest();
                    xhr.addEventListener("load", function() {
                        var responseHeaders = function() {
                            for (var result = {}, _i2 = 0, _rawHeaders$trim$spli2 = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").trim().split("\n"), _length2 = null == _rawHeaders$trim$spli2 ? 0 : _rawHeaders$trim$spli2.length; _i2 < _length2; _i2++) {
                                var _line$split = _rawHeaders$trim$spli2[_i2].split(":"), _key = _line$split[0], values = _line$split.slice(1);
                                result[_key.toLowerCase()] = values.join(":").trim();
                            }
                            return result;
                        }(this.getAllResponseHeaders());
                        if (!this.status) return reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: no response status code."));
                        var contentType = responseHeaders["content-type"], isJSON = contentType && (0 === contentType.indexOf("application/json") || 0 === contentType.indexOf("text/json")), responseBody = this.responseText;
                        try {
                            responseBody = JSON.parse(responseBody);
                        } catch (err) {
                            if (isJSON) return reject(new Error("Invalid json: " + this.responseText + "."));
                        }
                        var res = {
                            status: this.status,
                            headers: responseHeaders,
                            body: responseBody
                        };
                        return resolve(res);
                    }, !1);
                    xhr.addEventListener("error", function(evt) {
                        reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString() + "."));
                    }, !1);
                    xhr.open(method, url, !0);
                    for (var _key4 in normalizedHeaders) normalizedHeaders.hasOwnProperty(_key4) && xhr.setRequestHeader(_key4, normalizedHeaders[_key4]);
                    json ? body = JSON.stringify(json) : data && (body = Object.keys(data).map(function(key) {
                        return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : "");
                    }).join("&"));
                    xhr.timeout = timeout;
                    xhr.ontimeout = function() {
                        reject(new Error("Request to " + method.toLowerCase() + " " + url + " has timed out"));
                    };
                    xhr.send(body);
                });
            };
            var __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), HEADERS = (__webpack_require__("./node_modules/cross-domain-utils/src/index.js"), 
            {
                CONTENT_TYPE: "content-type",
                ACCEPT: "accept"
            }), headerBuilders = [];
        },
        "./node_modules/belter/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/belter/src/device.js");
            var __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__("./node_modules/belter/src/dom.js");
            __webpack_require__.d(__webpack_exports__, "getBrowserLocales", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.a;
            });
            __webpack_require__.d(__webpack_exports__, "getScript", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.b;
            });
            __webpack_require__.d(__webpack_exports__, "isBrowser", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.c;
            });
            __webpack_require__("./node_modules/belter/src/experiment.js"), __webpack_require__("./node_modules/belter/src/global.js"), 
            __webpack_require__("./node_modules/belter/src/jsx.jsx");
            var __WEBPACK_IMPORTED_MODULE_5__storage__ = __webpack_require__("./node_modules/belter/src/storage.js");
            __webpack_require__.d(__webpack_exports__, "getStorage", function() {
                return __WEBPACK_IMPORTED_MODULE_5__storage__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_6__util__ = __webpack_require__("./node_modules/belter/src/util.js");
            __webpack_require__.d(__webpack_exports__, "inlineMemoize", function() {
                return __WEBPACK_IMPORTED_MODULE_6__util__.b;
            });
            __webpack_require__.d(__webpack_exports__, "noop", function() {
                return __WEBPACK_IMPORTED_MODULE_6__util__.c;
            });
            __webpack_require__.d(__webpack_exports__, "objFilter", function() {
                return __WEBPACK_IMPORTED_MODULE_6__util__.d;
            });
            __webpack_require__.d(__webpack_exports__, "promiseDebounce", function() {
                return __WEBPACK_IMPORTED_MODULE_6__util__.e;
            });
            __webpack_require__.d(__webpack_exports__, "safeInterval", function() {
                return __WEBPACK_IMPORTED_MODULE_6__util__.h;
            });
            __webpack_require__.d(__webpack_exports__, "stringifyError", function() {
                return __WEBPACK_IMPORTED_MODULE_6__util__.i;
            });
            __webpack_require__.d(__webpack_exports__, "stringifyErrorMessage", function() {
                return __WEBPACK_IMPORTED_MODULE_6__util__.j;
            });
            var __WEBPACK_IMPORTED_MODULE_7__http__ = __webpack_require__("./node_modules/belter/src/http.js");
            __webpack_require__.d(__webpack_exports__, "request", function() {
                return __WEBPACK_IMPORTED_MODULE_7__http__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_8__types__ = __webpack_require__("./node_modules/belter/src/types.js");
            __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__types__);
        },
        "./node_modules/belter/src/jsx.jsx": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/belter/src/util.js"), Object.assign;
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function htmlEncode() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#x2F;");
            }
            !function(_JsxHTMLNode) {
                !function(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    });
                    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
                }(JsxHTMLNodeContainer, _JsxHTMLNode);
                function JsxHTMLNodeContainer(children) {
                    _classCallCheck(this, JsxHTMLNodeContainer);
                    return function(self, call) {
                        if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !call || "object" != typeof call && "function" != typeof call ? self : call;
                    }(this, _JsxHTMLNode.call(this, "", {}, children));
                }
                JsxHTMLNodeContainer.prototype.toString = function() {
                    return this.childrenToString();
                };
            }(function() {
                function JsxHTMLNode(name, props, children) {
                    _classCallCheck(this, JsxHTMLNode);
                    this.name = name;
                    this.props = props;
                    this.children = children;
                }
                JsxHTMLNode.prototype.toString = function() {
                    var name = this.name, props = this.propsToString(), children = this.childrenToString();
                    return "<" + name + (props ? " " : "") + props + ">" + children + "</" + name + ">";
                };
                JsxHTMLNode.prototype.propsToString = function() {
                    var props = this.props;
                    return props ? Object.keys(props).filter(function(key) {
                        return "innerHTML" !== key && props && !1 !== props[key];
                    }).map(function(key) {
                        if (props) {
                            var val = props[key];
                            if (!0 === val) return "" + htmlEncode(key);
                            if ("string" == typeof val) return htmlEncode(key) + '="' + htmlEncode(val) + '"';
                        }
                        return "";
                    }).filter(Boolean).join(" ") : "";
                };
                JsxHTMLNode.prototype.childrenToString = function() {
                    if (this.props && this.props.innerHTML) return this.props.innerHTML;
                    if (!this.children) return "";
                    var result = "";
                    !function iterate(children) {
                        for (var _i2 = 0, _length2 = null == children ? 0 : children.length; _i2 < _length2; _i2++) {
                            var child = children[_i2];
                            null !== child && void 0 !== child && (Array.isArray(child) ? iterate(child) : result += child instanceof JsxHTMLNode ? child.toString() : htmlEncode(child));
                        }
                    }(this.children);
                    return result;
                };
                return JsxHTMLNode;
            }());
        },
        "./node_modules/belter/src/storage.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.a = function getStorage(_ref) {
                var name = _ref.name, _ref$version = _ref.version, version = void 0 === _ref$version ? "latest" : _ref$version, _ref$lifetime = _ref.lifetime, lifetime = void 0 === _ref$lifetime ? 3e5 : _ref$lifetime;
                return Object(__WEBPACK_IMPORTED_MODULE_0__util__.b)(getStorage, function() {
                    var STORAGE_KEY = "__" + name + "_" + version + "_storage__", accessedStorage = void 0;
                    function getState(handler) {
                        var localStorageEnabled = Object(__WEBPACK_IMPORTED_MODULE_1__dom__.d)(), storage = void 0;
                        accessedStorage && (storage = accessedStorage);
                        if (!storage && localStorageEnabled) {
                            var rawStorage = window.localStorage.getItem(STORAGE_KEY);
                            rawStorage && (storage = JSON.parse(rawStorage));
                        }
                        storage || (storage = Object(__WEBPACK_IMPORTED_MODULE_0__util__.a)()[STORAGE_KEY]);
                        storage || (storage = {
                            id: Object(__WEBPACK_IMPORTED_MODULE_0__util__.l)()
                        });
                        storage.id || (storage.id = Object(__WEBPACK_IMPORTED_MODULE_0__util__.l)());
                        accessedStorage = storage;
                        var result = handler(storage);
                        localStorageEnabled ? window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage)) : Object(__WEBPACK_IMPORTED_MODULE_0__util__.a)()[STORAGE_KEY] = storage;
                        accessedStorage = null;
                        return result;
                    }
                    function getSession(handler) {
                        return getState(function(storage) {
                            var session = storage.__session__, now = Date.now();
                            session && now - session.created > lifetime && (session = null);
                            session || (session = {
                                guid: Object(__WEBPACK_IMPORTED_MODULE_0__util__.l)(),
                                created: now
                            });
                            storage.__session__ = session;
                            return handler(session);
                        });
                    }
                    return {
                        getState: getState,
                        getID: function() {
                            return getState(function(storage) {
                                return storage.id;
                            });
                        },
                        getSessionState: function(handler) {
                            return getSession(function(session) {
                                session.state = session.state || {};
                                return handler(session.state);
                            });
                        },
                        getSessionID: function() {
                            return getSession(function(session) {
                                return session.guid;
                            });
                        }
                    };
                }, [ {
                    name: name,
                    version: version,
                    lifetime: lifetime
                } ]);
            };
            var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/belter/src/util.js"), __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__("./node_modules/belter/src/dom.js");
        },
        "./node_modules/belter/src/types.js": function(module, exports) {},
        "./node_modules/belter/src/util.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.a = function() {
                if ("undefined" != typeof window) return window;
                if ("undefined" != typeof window) return window;
                if ("undefined" != typeof global) return global;
                throw new Error("No global found");
            };
            __webpack_exports__.b = function(method, logic) {
                var args = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
                method.__memoized__ || (method.__memoized__ = function(method) {
                    var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, cache = {};
                    function memoizedFunction() {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                        var key = void 0;
                        try {
                            key = JSON.stringify(Array.prototype.slice.call(arguments));
                        } catch (err) {
                            throw new Error("Arguments not serializable -- can not be used to memoize");
                        }
                        var cacheTime = options.time;
                        cache[key] && cacheTime && Date.now() - cache[key].time < cacheTime && delete cache[key];
                        if (cache[key]) return cache[key].value;
                        memoizedFunction.__calling__ = !0;
                        var time = Date.now(), value = method.apply(this, arguments);
                        memoizedFunction.__calling__ = !1;
                        cache[key] = {
                            time: time,
                            value: value
                        };
                        return cache[key].value;
                    }
                    memoizedFunction.reset = function() {
                        cache = {};
                    };
                    return memoizedFunction;
                }(logic));
                if (method.__memoized__ && method.__memoized__.__calling__) throw new Error("Can not call memoized method recursively");
                return method.__memoized__.apply(method, args);
            };
            __webpack_exports__.c = function() {};
            __webpack_exports__.l = function() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                }) + "_" + base64encode(new Date().toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            };
            __webpack_exports__.i = function stringifyError(err) {
                var level = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                if (level >= 3) return "stringifyError stack overflow";
                try {
                    if (!err) return "<unknown error: " + Object.prototype.toString.call(err) + ">";
                    if ("string" == typeof err) return err;
                    if (err instanceof Error) {
                        var stack = err && err.stack, message = err && err.message;
                        if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                        if (stack) return stack;
                        if (message) return message;
                    }
                    return "function" == typeof err.toString ? err.toString() : Object.prototype.toString.call(err);
                } catch (newErr) {
                    return "Error while stringifying error: " + stringifyError(newErr, level + 1);
                }
            };
            __webpack_exports__.j = function(err) {
                var defaultMessage = "<unknown error: " + Object.prototype.toString.call(err) + ">";
                return err ? err instanceof Error ? err.message || defaultMessage : "string" == typeof err.message && err.message || defaultMessage : defaultMessage;
            };
            __webpack_exports__.f = function(str, regex, handler) {
                var results = [];
                str.replace(regex, function(item) {
                    results.push(handler ? handler.apply(null, arguments) : item);
                });
                return results;
            };
            __webpack_exports__.k = function(svg) {
                return "data:image/svg+xml;base64," + base64encode(svg);
            };
            __webpack_exports__.d = function(obj) {
                var filter = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Boolean, result = {};
                for (var _key4 in obj) obj.hasOwnProperty(_key4) && filter(obj[_key4], _key4) && (result[_key4] = obj[_key4]);
                return result;
            };
            __webpack_exports__.g = function(text, regex) {
                var result = [];
                text.replace(regex, function(token) {
                    result.push(token);
                    return "";
                });
                return result;
            };
            __webpack_exports__.e = function(method) {
                var delay = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50, promise = void 0, timeout = void 0;
                return function() {
                    timeout && clearTimeout(timeout);
                    var localPromise = promise = promise || new __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a();
                    timeout = setTimeout(function() {
                        promise = null;
                        timeout = null;
                        __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.try(method).then(function(result) {
                            localPromise.resolve(result);
                        }, function(err) {
                            localPromise.reject(err);
                        });
                    }, delay);
                    return localPromise;
                };
            };
            __webpack_exports__.h = function(method, time) {
                var timeout = void 0;
                !function loop() {
                    timeout = setTimeout(function() {
                        method();
                        loop();
                    }, time);
                }();
                return {
                    cancel: function() {
                        clearTimeout(timeout);
                    }
                };
            };
            var __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__("./node_modules/zalgo-promise/src/index.js");
            "function" == typeof Symbol && Symbol.iterator;
            function base64encode(str) {
                return window.btoa(str);
            }
        },
        "./node_modules/cross-domain-utils/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/cross-domain-utils/src/utils.js");
            var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__("./node_modules/cross-domain-utils/src/types.js");
            __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__types__);
        },
        "./node_modules/cross-domain-utils/src/types.js": function(module, exports) {},
        "./node_modules/cross-domain-utils/src/utils.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
        },
        "./node_modules/zalgo-promise/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function utils_isPromise(item) {
                try {
                    if (!item) return !1;
                    if ("undefined" != typeof Promise && item instanceof Promise) return !0;
                    if ("undefined" != typeof window && window.Window && item instanceof window.Window) return !1;
                    if ("undefined" != typeof window && window.constructor && item instanceof window.constructor) return !1;
                    var _toString = {}.toString;
                    if (_toString) {
                        var name = _toString.call(item);
                        if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                    }
                    if ("function" == typeof item.then) return !0;
                } catch (err) {
                    return !1;
                }
                return !1;
            }
            function getGlobal() {
                var glob = void 0;
                if ("undefined" != typeof window) glob = window; else {
                    if ("undefined" == typeof window) throw new TypeError("Can not find global");
                    glob = window;
                }
                var zalgoGlobal = glob.__zalgopromise__ = glob.__zalgopromise__ || {};
                zalgoGlobal.flushPromises = zalgoGlobal.flushPromises || [];
                zalgoGlobal.activeCount = zalgoGlobal.activeCount || 0;
                zalgoGlobal.possiblyUnhandledPromiseHandlers = zalgoGlobal.possiblyUnhandledPromiseHandlers || [];
                zalgoGlobal.dispatchedErrors = zalgoGlobal.dispatchedErrors || [];
                return zalgoGlobal;
            }
            var promise_ZalgoPromise = function() {
                function ZalgoPromise(handler) {
                    var _this = this;
                    !function(instance, Constructor) {
                        if (!(instance instanceof ZalgoPromise)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    this.resolved = !1;
                    this.rejected = !1;
                    this.errorHandled = !1;
                    this.handlers = [];
                    if (handler) {
                        var _result = void 0, _error = void 0, resolved = !1, rejected = !1, isAsync = !1;
                        try {
                            handler(function(res) {
                                if (isAsync) _this.resolve(res); else {
                                    resolved = !0;
                                    _result = res;
                                }
                            }, function(err) {
                                if (isAsync) _this.reject(err); else {
                                    rejected = !0;
                                    _error = err;
                                }
                            });
                        } catch (err) {
                            this.reject(err);
                            return;
                        }
                        isAsync = !0;
                        resolved ? this.resolve(_result) : rejected && this.reject(_error);
                    }
                }
                ZalgoPromise.prototype.resolve = function(result) {
                    if (this.resolved || this.rejected) return this;
                    if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                    this.resolved = !0;
                    this.value = result;
                    this.dispatch();
                    return this;
                };
                ZalgoPromise.prototype.reject = function(error) {
                    var _this2 = this;
                    if (this.resolved || this.rejected) return this;
                    if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                    if (!error) {
                        var _err = error && "function" == typeof error.toString ? error.toString() : Object.prototype.toString.call(error);
                        error = new Error("Expected reject to be called with Error, got " + _err);
                    }
                    this.rejected = !0;
                    this.error = error;
                    this.errorHandled || setTimeout(function() {
                        _this2.errorHandled || function(err, promise) {
                            if (-1 === getGlobal().dispatchedErrors.indexOf(err)) {
                                getGlobal().dispatchedErrors.push(err);
                                setTimeout(function() {
                                    throw err;
                                }, 1);
                                for (var j = 0; j < getGlobal().possiblyUnhandledPromiseHandlers.length; j++) getGlobal().possiblyUnhandledPromiseHandlers[j](err, promise);
                            }
                        }(error, _this2);
                    }, 1);
                    this.dispatch();
                    return this;
                };
                ZalgoPromise.prototype.asyncReject = function(error) {
                    this.errorHandled = !0;
                    this.reject(error);
                };
                ZalgoPromise.prototype.dispatch = function() {
                    var _this3 = this, dispatching = this.dispatching, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                    if (!dispatching && (resolved || rejected)) {
                        this.dispatching = !0;
                        getGlobal().activeCount += 1;
                        for (var _loop = function(i) {
                            var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise, result = void 0;
                            if (resolved) try {
                                result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                            } catch (err) {
                                promise.reject(err);
                                return "continue";
                            } else if (rejected) {
                                if (!onError) {
                                    promise.reject(_this3.error);
                                    return "continue";
                                }
                                try {
                                    result = onError(_this3.error);
                                } catch (err) {
                                    promise.reject(err);
                                    return "continue";
                                }
                            }
                            if (result instanceof ZalgoPromise && (result.resolved || result.rejected)) {
                                result.resolved ? promise.resolve(result.value) : promise.reject(result.error);
                                result.errorHandled = !0;
                            } else utils_isPromise(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                                promise.resolve(res);
                            }, function(err) {
                                promise.reject(err);
                            }) : promise.resolve(result);
                        }, i = 0; i < handlers.length; i++) _loop(i);
                        handlers.length = 0;
                        this.dispatching = !1;
                        getGlobal().activeCount -= 1;
                        0 === getGlobal().activeCount && ZalgoPromise.flushQueue();
                    }
                };
                ZalgoPromise.prototype.then = function(onSuccess, onError) {
                    if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                    if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                    var promise = new ZalgoPromise();
                    this.handlers.push({
                        promise: promise,
                        onSuccess: onSuccess,
                        onError: onError
                    });
                    this.errorHandled = !0;
                    this.dispatch();
                    return promise;
                };
                ZalgoPromise.prototype.catch = function(onError) {
                    return this.then(void 0, onError);
                };
                ZalgoPromise.prototype.finally = function(onFinally) {
                    if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
                    return this.then(function(result) {
                        return ZalgoPromise.try(onFinally).then(function() {
                            return result;
                        });
                    }, function(err) {
                        return ZalgoPromise.try(onFinally).then(function() {
                            throw err;
                        });
                    });
                };
                ZalgoPromise.prototype.timeout = function(time, err) {
                    var _this4 = this;
                    if (this.resolved || this.rejected) return this;
                    var timeout = setTimeout(function() {
                        _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
                    }, time);
                    return this.then(function(result) {
                        clearTimeout(timeout);
                        return result;
                    });
                };
                ZalgoPromise.prototype.toPromise = function() {
                    if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                    return Promise.resolve(this);
                };
                ZalgoPromise.resolve = function(value) {
                    return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise(function(resolve, reject) {
                        return value.then(resolve, reject);
                    }) : new ZalgoPromise().resolve(value);
                };
                ZalgoPromise.reject = function(error) {
                    return new ZalgoPromise().reject(error);
                };
                ZalgoPromise.all = function(promises) {
                    var promise = new ZalgoPromise(), count = promises.length, results = [];
                    if (!count) {
                        promise.resolve(results);
                        return promise;
                    }
                    for (var _loop2 = function(i) {
                        var prom = promises[i];
                        if (prom instanceof ZalgoPromise) {
                            if (prom.resolved) {
                                results[i] = prom.value;
                                count -= 1;
                                return "continue";
                            }
                        } else if (!utils_isPromise(prom)) {
                            results[i] = prom;
                            count -= 1;
                            return "continue";
                        }
                        ZalgoPromise.resolve(prom).then(function(result) {
                            results[i] = result;
                            0 == (count -= 1) && promise.resolve(results);
                        }, function(err) {
                            promise.reject(err);
                        });
                    }, i = 0; i < promises.length; i++) _loop2(i);
                    0 === count && promise.resolve(results);
                    return promise;
                };
                ZalgoPromise.hash = function(promises) {
                    var result = {};
                    return ZalgoPromise.all(Object.keys(promises).map(function(key) {
                        return ZalgoPromise.resolve(promises[key]).then(function(value) {
                            result[key] = value;
                        });
                    })).then(function() {
                        return result;
                    });
                };
                ZalgoPromise.map = function(items, method) {
                    return ZalgoPromise.all(items.map(method));
                };
                ZalgoPromise.onPossiblyUnhandledException = function(handler) {
                    return function(handler) {
                        getGlobal().possiblyUnhandledPromiseHandlers.push(handler);
                        return {
                            cancel: function() {
                                getGlobal().possiblyUnhandledPromiseHandlers.splice(getGlobal().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                            }
                        };
                    }(handler);
                };
                ZalgoPromise.try = function(method, context, args) {
                    if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
                    var result = void 0;
                    try {
                        result = method.apply(context, args || []);
                    } catch (err) {
                        return ZalgoPromise.reject(err);
                    }
                    return ZalgoPromise.resolve(result);
                };
                ZalgoPromise.delay = function(_delay) {
                    return new ZalgoPromise(function(resolve) {
                        setTimeout(resolve, _delay);
                    });
                };
                ZalgoPromise.isPromise = function(value) {
                    return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
                };
                ZalgoPromise.flush = function() {
                    var promise = new ZalgoPromise();
                    getGlobal().flushPromises.push(promise);
                    0 === getGlobal().activeCount && ZalgoPromise.flushQueue();
                    return promise;
                };
                ZalgoPromise.flushQueue = function() {
                    var promisesToFlush = getGlobal().flushPromises;
                    getGlobal().flushPromises = [];
                    for (var _i2 = 0, _length2 = null == promisesToFlush ? 0 : promisesToFlush.length; _i2 < _length2; _i2++) promisesToFlush[_i2].resolve();
                };
                return ZalgoPromise;
            }();
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return promise_ZalgoPromise;
            });
        },
        "./src/config.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.a = function(domain, uri) {
                return "" + domain + (uri || "");
            };
            __webpack_exports__.c = getPayPalDomain;
            __webpack_exports__.b = function() {
                return {
                    local: "https://" + Object(__WEBPACK_IMPORTED_MODULE_2__script__.a)() + ":12326",
                    stage: "https://" + Object(__WEBPACK_IMPORTED_MODULE_2__script__.a)() + ":12326",
                    sandbox: "https://cors.api.sandbox.paypal.com",
                    paypal: "https://www.cors.api.paypal.com",
                    test: "mock://api.paypal.com"
                }.production;
            };
            __webpack_exports__.d = getPayPalLoggerDomain;
            __webpack_exports__.e = function() {
                return getPayPalLoggerDomain() + "/xoplatform/logger/api/logger";
            };
            __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
            var __WEBPACK_IMPORTED_MODULE_1__globals__ = __webpack_require__("./src/globals.js"), __WEBPACK_IMPORTED_MODULE_2__script__ = __webpack_require__("./src/script.js");
            function getPayPalDomain() {
                return {
                    local: "http://localhost.paypal.com:" + Object(__WEBPACK_IMPORTED_MODULE_1__globals__.o)(),
                    stage: "https://" + Object(__WEBPACK_IMPORTED_MODULE_2__script__.f)(),
                    sandbox: "https://www.sandbox.paypal.com",
                    paypal: "https://www.paypal.com",
                    test: "mock://www.paypal.com"
                }.production;
            }
            function getPayPalLoggerDomain() {
                return {
                    local: "https://" + Object(__WEBPACK_IMPORTED_MODULE_2__script__.f)(),
                    stage: getPayPalDomain(),
                    sandbox: getPayPalDomain(),
                    paypal: getPayPalDomain(),
                    test: getPayPalDomain()
                }.production;
            }
        },
        "./src/constants.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "e", function() {
                return ENV;
            });
            __webpack_require__.d(__webpack_exports__, "l", function() {
                return SDK_SETTINGS;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return COUNTRY;
            });
            __webpack_require__.d(__webpack_exports__, "k", function() {
                return LANG;
            });
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return COUNTRY_LANGS;
            });
            __webpack_require__.d(__webpack_exports__, "h", function() {
                return FPTI_KEY;
            });
            __webpack_require__.d(__webpack_exports__, "f", function() {
                return FPTI_DATA_SOURCE;
            });
            __webpack_require__.d(__webpack_exports__, "g", function() {
                return FPTI_FEED;
            });
            __webpack_require__.d(__webpack_exports__, "i", function() {
                return FPTI_SDK_NAME;
            });
            __webpack_require__.d(__webpack_exports__, "j", function() {
                return INTENT;
            });
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return COMMIT;
            });
            __webpack_require__.d(__webpack_exports__, "m", function() {
                return VAULT;
            });
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return CURRENCY;
            });
            var _COUNTRY_LANGS, ENV = {
                LOCAL: "local",
                STAGE: "stage",
                SANDBOX: "sandbox",
                PRODUCTION: "production",
                TEST: "test",
                DEMO: "demo"
            }, SDK_SETTINGS = {
                CLIENT_TOKEN: "data-client-token",
                PARTNER_ATTRIBUTION_ID: "data-partner-attribution-id",
                STAGE_HOST: "data-stage-host",
                API_STAGE_HOST: "data-api-stage-host"
            }, COUNTRY = {
                AD: "AD",
                AE: "AE",
                AG: "AG",
                AI: "AI",
                AL: "AL",
                AM: "AM",
                AN: "AN",
                AO: "AO",
                AR: "AR",
                AT: "AT",
                AU: "AU",
                AW: "AW",
                AZ: "AZ",
                BA: "BA",
                BB: "BB",
                BE: "BE",
                BF: "BF",
                BG: "BG",
                BH: "BH",
                BI: "BI",
                BJ: "BJ",
                BM: "BM",
                BN: "BN",
                BO: "BO",
                BR: "BR",
                BS: "BS",
                BT: "BT",
                BW: "BW",
                BY: "BY",
                BZ: "BZ",
                CA: "CA",
                CD: "CD",
                CG: "CG",
                CH: "CH",
                CI: "CI",
                CK: "CK",
                CL: "CL",
                CM: "CM",
                CN: "CN",
                CO: "CO",
                CR: "CR",
                CV: "CV",
                CY: "CY",
                CZ: "CZ",
                DE: "DE",
                DJ: "DJ",
                DK: "DK",
                DM: "DM",
                DO: "DO",
                DZ: "DZ",
                EC: "EC",
                EE: "EE",
                EG: "EG",
                ER: "ER",
                ES: "ES",
                ET: "ET",
                FI: "FI",
                FJ: "FJ",
                FK: "FK",
                FM: "FM",
                FO: "FO",
                FR: "FR",
                GA: "GA",
                GB: "GB",
                GD: "GD",
                GE: "GE",
                GF: "GF",
                GI: "GI",
                GL: "GL",
                GM: "GM",
                GN: "GN",
                GP: "GP",
                GR: "GR",
                GT: "GT",
                GW: "GW",
                GY: "GY",
                HK: "HK",
                HN: "HN",
                HR: "HR",
                HU: "HU",
                ID: "ID",
                IE: "IE",
                IL: "IL",
                IN: "IN",
                IS: "IS",
                IT: "IT",
                JM: "JM",
                JO: "JO",
                JP: "JP",
                KE: "KE",
                KG: "KG",
                KH: "KH",
                KI: "KI",
                KM: "KM",
                KN: "KN",
                KR: "KR",
                KW: "KW",
                KY: "KY",
                KZ: "KZ",
                LA: "LA",
                LC: "LC",
                LI: "LI",
                LK: "LK",
                LS: "LS",
                LT: "LT",
                LU: "LU",
                LV: "LV",
                MA: "MA",
                MC: "MC",
                MD: "MD",
                ME: "ME",
                MG: "MG",
                MH: "MH",
                MK: "MK",
                ML: "ML",
                MN: "MN",
                MQ: "MQ",
                MR: "MR",
                MS: "MS",
                MT: "MT",
                MU: "MU",
                MV: "MV",
                MW: "MW",
                MX: "MX",
                MY: "MY",
                MZ: "MZ",
                NA: "NA",
                NC: "NC",
                NE: "NE",
                NF: "NF",
                NG: "NG",
                NI: "NI",
                NL: "NL",
                NO: "NO",
                NP: "NP",
                NR: "NR",
                NU: "NU",
                NZ: "NZ",
                OM: "OM",
                PA: "PA",
                PE: "PE",
                PF: "PF",
                PG: "PG",
                PH: "PH",
                PL: "PL",
                PM: "PM",
                PN: "PN",
                PT: "PT",
                PW: "PW",
                PY: "PY",
                QA: "QA",
                RE: "RE",
                RO: "RO",
                RS: "RS",
                RU: "RU",
                RW: "RW",
                SA: "SA",
                SB: "SB",
                SC: "SC",
                SE: "SE",
                SG: "SG",
                SH: "SH",
                SI: "SI",
                SJ: "SJ",
                SK: "SK",
                SL: "SL",
                SM: "SM",
                SN: "SN",
                SO: "SO",
                SR: "SR",
                ST: "ST",
                SV: "SV",
                SZ: "SZ",
                TC: "TC",
                TD: "TD",
                TG: "TG",
                TH: "TH",
                TJ: "TJ",
                TM: "TM",
                TN: "TN",
                TO: "TO",
                TR: "TR",
                TT: "TT",
                TV: "TV",
                TW: "TW",
                TZ: "TZ",
                UA: "UA",
                UG: "UG",
                US: "US",
                UY: "UY",
                VA: "VA",
                VC: "VC",
                VE: "VE",
                VG: "VG",
                VN: "VN",
                VU: "VU",
                WF: "WF",
                WS: "WS",
                YE: "YE",
                YT: "YT",
                ZA: "ZA",
                ZM: "ZM",
                ZW: "ZW"
            }, LANG = {
                AR: "ar",
                CS: "cs",
                DA: "da",
                DE: "de",
                EL: "el",
                EN: "en",
                ES: "es",
                FI: "fi",
                FR: "fr",
                HE: "he",
                HU: "hu",
                ID: "id",
                IT: "it",
                JA: "ja",
                KO: "ko",
                NL: "nl",
                NO: "no",
                PL: "pl",
                PT: "pt",
                RU: "ru",
                SK: "sk",
                SV: "sv",
                TH: "th",
                TR: "tr",
                ZH: "zh"
            }, COUNTRY_LANGS = ((_COUNTRY_LANGS = {})[COUNTRY.AD] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.AE] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR ], _COUNTRY_LANGS[COUNTRY.AG] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.AI] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.AL] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.AM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.AN] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.AO] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.AR] = [ LANG.ES, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.AT] = [ LANG.DE, LANG.EN ], _COUNTRY_LANGS[COUNTRY.AU] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.AW] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.AZ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.BA] = [ LANG.EN ], _COUNTRY_LANGS[COUNTRY.BB] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.BE] = [ LANG.EN, LANG.NL, LANG.FR ], _COUNTRY_LANGS[COUNTRY.BF] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.BG] = [ LANG.EN ], _COUNTRY_LANGS[COUNTRY.BH] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.BI] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.BJ] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.BM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.BN] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.BO] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.BR] = [ LANG.PT, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.BS] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.BT] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.BW] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.BY] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.BZ] = [ LANG.EN, LANG.ES, LANG.FR, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.CA] = [ LANG.EN, LANG.FR ], 
            _COUNTRY_LANGS[COUNTRY.CD] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.CG] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.CH] = [ LANG.DE, LANG.FR, LANG.EN ], _COUNTRY_LANGS[COUNTRY.CI] = [ LANG.FR, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.CK] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.CL] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.CM] = [ LANG.FR, LANG.EN ], _COUNTRY_LANGS[COUNTRY.CN] = [ LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.CO] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.CR] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.CV] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.CY] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.CZ] = [ LANG.CS, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.DE] = [ LANG.DE, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.DJ] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.DK] = [ LANG.DA, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.DM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.DO] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.DZ] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.EC] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.EE] = [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.EG] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.ER] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.ES] = [ LANG.ES, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.ET] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.FI] = [ LANG.FI, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.FJ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.FK] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.FM] = [ LANG.EN ], _COUNTRY_LANGS[COUNTRY.FO] = [ LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.FR] = [ LANG.FR, LANG.EN ], _COUNTRY_LANGS[COUNTRY.GA] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.GB] = [ LANG.EN ], _COUNTRY_LANGS[COUNTRY.GD] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.GE] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.GF] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.GI] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.GL] = [ LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.GM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.GN] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.GP] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.GR] = [ LANG.EL, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.GT] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.GW] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.GY] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.HK] = [ LANG.EN, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.HN] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.HR] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.HU] = [ LANG.HU, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.ID] = [ LANG.ID, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.IE] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.IL] = [ LANG.HE, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.IN] = [ LANG.EN ], _COUNTRY_LANGS[COUNTRY.IS] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.IT] = [ LANG.IT, LANG.EN ], _COUNTRY_LANGS[COUNTRY.JM] = [ LANG.EN, LANG.ES, LANG.FR, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.JO] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.JP] = [ LANG.JA, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.KE] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.KG] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.KH] = [ LANG.EN ], _COUNTRY_LANGS[COUNTRY.KI] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.KM] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.KN] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.KR] = [ LANG.KO, LANG.EN ], _COUNTRY_LANGS[COUNTRY.KW] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.KY] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.KZ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.LA] = [ LANG.EN ], _COUNTRY_LANGS[COUNTRY.LC] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.LI] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.LK] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.LS] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.LT] = [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.LU] = [ LANG.EN, LANG.DE, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.LV] = [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.MA] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.MC] = [ LANG.FR, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.MD] = [ LANG.EN ], _COUNTRY_LANGS[COUNTRY.ME] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.MG] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.MH] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.MK] = [ LANG.EN ], _COUNTRY_LANGS[COUNTRY.ML] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.MN] = [ LANG.EN ], _COUNTRY_LANGS[COUNTRY.MQ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.MR] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.MS] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.MT] = [ LANG.EN ], _COUNTRY_LANGS[COUNTRY.MU] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.MV] = [ LANG.EN ], _COUNTRY_LANGS[COUNTRY.MW] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.MX] = [ LANG.ES, LANG.EN ], _COUNTRY_LANGS[COUNTRY.MY] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.MZ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.NA] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.NC] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.NE] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.NF] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.NG] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.NI] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.NL] = [ LANG.NL, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.NO] = [ LANG.NO, LANG.EN ], _COUNTRY_LANGS[COUNTRY.NP] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.NR] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.NU] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.NZ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.OM] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.PA] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.PE] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.PF] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.PG] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.PH] = [ LANG.EN ], _COUNTRY_LANGS[COUNTRY.PL] = [ LANG.PL, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.PM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.PN] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.PT] = [ LANG.PT, LANG.EN ], _COUNTRY_LANGS[COUNTRY.PW] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.PY] = [ LANG.ES, LANG.EN ], _COUNTRY_LANGS[COUNTRY.QA] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR ], 
            _COUNTRY_LANGS[COUNTRY.RE] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.RO] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.RS] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.RU] = [ LANG.RU, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.RW] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.SA] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.SB] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.SC] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.SE] = [ LANG.SV, LANG.EN ], _COUNTRY_LANGS[COUNTRY.SG] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.SH] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.SI] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.SJ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.SK] = [ LANG.SK, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.SL] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.SM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.SN] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.SO] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.SR] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.ST] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.SV] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.SZ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.TC] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.TD] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.TG] = [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.TH] = [ LANG.TH, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.TJ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.TM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.TN] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.TO] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.TR] = [ LANG.TR, LANG.EN ], _COUNTRY_LANGS[COUNTRY.TT] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.TV] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.TW] = [ LANG.ZH, LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.TZ] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.UA] = [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.UG] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.US] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.UY] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.VA] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.VC] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.VE] = [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.VG] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.VN] = [ LANG.EN ], 
            _COUNTRY_LANGS[COUNTRY.VU] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.WF] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.WS] = [ LANG.EN ], _COUNTRY_LANGS[COUNTRY.YE] = [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.YT] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.ZA] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], 
            _COUNTRY_LANGS[COUNTRY.ZM] = [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ], _COUNTRY_LANGS[COUNTRY.ZW] = [ LANG.EN ], 
            _COUNTRY_LANGS), FPTI_KEY = {
                FEED: "feed_name",
                STATE: "state_name",
                TRANSITION: "transition_name",
                BUTTON_TYPE: "button_type",
                SESSION_UID: "page_session_id",
                BUTTON_SESSION_UID: "button_session_id",
                TOKEN: "token",
                CONTEXT_ID: "context_id",
                CONTEXT_TYPE: "context_type",
                REFERER: "referer_url",
                PAY_ID: "pay_id",
                SELLER_ID: "seller_id",
                CLIENT_ID: "client_id",
                DATA_SOURCE: "serverside_data_source",
                BUTTON_SOURCE: "button_source",
                ERROR_CODE: "ext_error_code",
                ERROR_DESC: "ext_error_desc",
                PAGE_LOAD_TIME: "page_load_time",
                EXPERIMENT_NAME: "pxp_exp_id",
                TREATMENT_NAME: "pxp_trtmnt_id",
                TRANSITION_TIME: "transition_time",
                FUNDING_LIST: "eligible_payment_methods",
                FUNDING_COUNT: "eligible_payment_count",
                CHOSEN_FUNDING: "selected_payment_method",
                BUTTON_LAYOUT: "button_layout",
                VERSION: "checkoutjs_version",
                LOCALE: "locale",
                BUYER_COUNTRY: "buyer_cntry",
                INTEGRATION_IDENTIFIER: "integration_identifier",
                PARTNER_ATTRIBUTION_ID: "bn_code",
                SDK_NAME: "sdk_name",
                SDK_VERSION: "sdk_version",
                USER_AGENT: "user_agent"
            }, FPTI_DATA_SOURCE = {
                PAYMENTS_SDK: "payments_sdk"
            }, FPTI_FEED = {
                PAYMENTS_SDK: "payments_sdk"
            }, FPTI_SDK_NAME = {
                PAYMENTS_SDK: "payments_sdk"
            }, INTENT = {
                CAPTURE: "capture",
                AUTH: "auth",
                ORDER: "order"
            }, COMMIT = {
                TRUE: !0,
                FALSE: !1
            }, VAULT = {
                TRUE: !0,
                FALSE: !1
            }, CURRENCY = {
                AUD: "AUD",
                BRL: "BRL",
                CAD: "CAD",
                CZK: "CZK",
                DKK: "DKK",
                EUR: "EUR",
                HKD: "HKD",
                HUF: "HUF",
                INR: "INR",
                ILS: "ILS",
                JPY: "JPY",
                MYR: "MYR",
                MXN: "MXN",
                TWD: "TWD",
                NZD: "NZD",
                NOK: "NOK",
                PHP: "PHP",
                PLN: "PLN",
                GBP: "GBP",
                RUB: "RUB",
                SGD: "SGD",
                SEK: "SEK",
                CHF: "CHF",
                THB: "THB",
                USD: "USD"
            };
        },
        "./src/globals.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.h = function() {
                return __HOST__;
            };
            __webpack_exports__.i = function() {
                return __HOSTNAME__;
            };
            __webpack_exports__.o = function() {
                return __PORT__;
            };
            __webpack_exports__.n = function() {
                return __PATH__;
            };
            __webpack_exports__.g = function() {
                return "production";
            };
            __webpack_exports__.a = function() {
                return __CLIENT_ID__;
            };
            __webpack_exports__.m = function() {
                return __MERCHANT_ID__;
            };
            __webpack_exports__.d = getCountry;
            __webpack_exports__.k = getLang;
            __webpack_exports__.l = function() {
                return {
                    lang: getLang(),
                    country: getCountry()
                };
            };
            __webpack_exports__.f = function() {
                return __STAGE_HOST__;
            };
            __webpack_exports__.j = function() {
                return __INTENT__;
            };
            __webpack_exports__.b = function() {
                return __COMMIT__;
            };
            __webpack_exports__.p = function() {
                return __VAULT__;
            };
            __webpack_exports__.e = function() {
                return __CURRENCY__;
            };
            __webpack_exports__.q = function() {
                return __VERSION__;
            };
            __webpack_exports__.c = function() {
                return __CORRELATION_ID__;
            };
            var __WEBPACK_IMPORTED_MODULE_0_belter_src__ = __webpack_require__("./node_modules/belter/src/index.js"), __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/constants.js");
            function getCountry() {
                return __LOCALE_COUNTRY__;
            }
            function getLang() {
                if ("undefined" != typeof __LOCALE_LANG__) return __LOCALE_LANG__;
                for (var _i2 = 0, _getBrowserLocales2 = Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__.getBrowserLocales)(), _length2 = null == _getBrowserLocales2 ? 0 : _getBrowserLocales2.length; _i2 < _length2; _i2++) {
                    var _ref2 = _getBrowserLocales2[_i2], country = _ref2.country, lang = _ref2.lang;
                    if (country && country === __LOCALE_COUNTRY__ && -1 !== __WEBPACK_IMPORTED_MODULE_1__constants__.c[__LOCALE_COUNTRY__].indexOf(lang)) return lang;
                }
                return __DEFAULT_LANG__;
            }
        },
        "./src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./src/constants.js");
            __webpack_require__.d(__webpack_exports__, "ENV", function() {
                return __WEBPACK_IMPORTED_MODULE_0__constants__.e;
            });
            __webpack_require__.d(__webpack_exports__, "SDK_SETTINGS", function() {
                return __WEBPACK_IMPORTED_MODULE_0__constants__.l;
            });
            __webpack_require__.d(__webpack_exports__, "COUNTRY", function() {
                return __WEBPACK_IMPORTED_MODULE_0__constants__.b;
            });
            __webpack_require__.d(__webpack_exports__, "LANG", function() {
                return __WEBPACK_IMPORTED_MODULE_0__constants__.k;
            });
            __webpack_require__.d(__webpack_exports__, "COUNTRY_LANGS", function() {
                return __WEBPACK_IMPORTED_MODULE_0__constants__.c;
            });
            __webpack_require__.d(__webpack_exports__, "FPTI_KEY", function() {
                return __WEBPACK_IMPORTED_MODULE_0__constants__.h;
            });
            __webpack_require__.d(__webpack_exports__, "FPTI_DATA_SOURCE", function() {
                return __WEBPACK_IMPORTED_MODULE_0__constants__.f;
            });
            __webpack_require__.d(__webpack_exports__, "FPTI_FEED", function() {
                return __WEBPACK_IMPORTED_MODULE_0__constants__.g;
            });
            __webpack_require__.d(__webpack_exports__, "FPTI_SDK_NAME", function() {
                return __WEBPACK_IMPORTED_MODULE_0__constants__.i;
            });
            __webpack_require__.d(__webpack_exports__, "INTENT", function() {
                return __WEBPACK_IMPORTED_MODULE_0__constants__.j;
            });
            __webpack_require__.d(__webpack_exports__, "COMMIT", function() {
                return __WEBPACK_IMPORTED_MODULE_0__constants__.a;
            });
            __webpack_require__.d(__webpack_exports__, "VAULT", function() {
                return __WEBPACK_IMPORTED_MODULE_0__constants__.m;
            });
            __webpack_require__.d(__webpack_exports__, "CURRENCY", function() {
                return __WEBPACK_IMPORTED_MODULE_0__constants__.d;
            });
            var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__("./src/config.js");
            __webpack_require__.d(__webpack_exports__, "buildConfigUrl", function() {
                return __WEBPACK_IMPORTED_MODULE_1__config__.a;
            });
            __webpack_require__.d(__webpack_exports__, "getPayPalDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_1__config__.c;
            });
            __webpack_require__.d(__webpack_exports__, "getPayPalAPIDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_1__config__.b;
            });
            __webpack_require__.d(__webpack_exports__, "getPayPalLoggerDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_1__config__.d;
            });
            __webpack_require__.d(__webpack_exports__, "getPayPalLoggerUrl", function() {
                return __WEBPACK_IMPORTED_MODULE_1__config__.e;
            });
            var __WEBPACK_IMPORTED_MODULE_2__logger__ = __webpack_require__("./src/logger.js");
            __webpack_require__.d(__webpack_exports__, "getLogger", function() {
                return __WEBPACK_IMPORTED_MODULE_2__logger__.a;
            });
            __webpack_require__.d(__webpack_exports__, "getPaymentsSDKStorage", function() {
                return __WEBPACK_IMPORTED_MODULE_2__logger__.b;
            });
            __webpack_require__.d(__webpack_exports__, "getSessionID", function() {
                return __WEBPACK_IMPORTED_MODULE_2__logger__.c;
            });
            __webpack_require__.d(__webpack_exports__, "setupLogger", function() {
                return __WEBPACK_IMPORTED_MODULE_2__logger__.d;
            });
            var __WEBPACK_IMPORTED_MODULE_3__types__ = __webpack_require__("./src/types.js");
            __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__types__);
            for (var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_3__types__) [ "ENV", "SDK_SETTINGS", "COUNTRY", "LANG", "COUNTRY_LANGS", "FPTI_KEY", "FPTI_DATA_SOURCE", "FPTI_FEED", "FPTI_SDK_NAME", "INTENT", "COMMIT", "VAULT", "CURRENCY", "buildConfigUrl", "getPayPalDomain", "getPayPalAPIDomain", "getPayPalLoggerDomain", "getPayPalLoggerUrl", "getLogger", "getPaymentsSDKStorage", "getSessionID", "setupLogger", "default" ].indexOf(__WEBPACK_IMPORT_KEY__) < 0 && function(key) {
                __webpack_require__.d(__webpack_exports__, key, function() {
                    return __WEBPACK_IMPORTED_MODULE_3__types__[key];
                });
            }(__WEBPACK_IMPORT_KEY__);
            var __WEBPACK_IMPORTED_MODULE_4__globals__ = __webpack_require__("./src/globals.js");
            __webpack_require__.d(__webpack_exports__, "getHost", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.h;
            });
            __webpack_require__.d(__webpack_exports__, "getHostName", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.i;
            });
            __webpack_require__.d(__webpack_exports__, "getPort", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.o;
            });
            __webpack_require__.d(__webpack_exports__, "getPath", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.n;
            });
            __webpack_require__.d(__webpack_exports__, "getEnv", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.g;
            });
            __webpack_require__.d(__webpack_exports__, "getClientID", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.a;
            });
            __webpack_require__.d(__webpack_exports__, "getMerchantID", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.m;
            });
            __webpack_require__.d(__webpack_exports__, "getCountry", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.d;
            });
            __webpack_require__.d(__webpack_exports__, "getLang", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.k;
            });
            __webpack_require__.d(__webpack_exports__, "getLocale", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.l;
            });
            __webpack_require__.d(__webpack_exports__, "getDefaultStageHost", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.f;
            });
            __webpack_require__.d(__webpack_exports__, "getIntent", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.j;
            });
            __webpack_require__.d(__webpack_exports__, "getCommit", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.b;
            });
            __webpack_require__.d(__webpack_exports__, "getVault", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.p;
            });
            __webpack_require__.d(__webpack_exports__, "getCurrency", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.e;
            });
            __webpack_require__.d(__webpack_exports__, "getVersion", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.q;
            });
            __webpack_require__.d(__webpack_exports__, "getCorrelationID", function() {
                return __WEBPACK_IMPORTED_MODULE_4__globals__.c;
            });
            var __WEBPACK_IMPORTED_MODULE_5__script__ = __webpack_require__("./src/script.js");
            __webpack_require__.d(__webpack_exports__, "getSDKScript", function() {
                return __WEBPACK_IMPORTED_MODULE_5__script__.d;
            });
            __webpack_require__.d(__webpack_exports__, "getSDKSettings", function() {
                return __WEBPACK_IMPORTED_MODULE_5__script__.e;
            });
            __webpack_require__.d(__webpack_exports__, "getClientToken", function() {
                return __WEBPACK_IMPORTED_MODULE_5__script__.b;
            });
            __webpack_require__.d(__webpack_exports__, "getPartnerAttributionID", function() {
                return __WEBPACK_IMPORTED_MODULE_5__script__.c;
            });
            __webpack_require__.d(__webpack_exports__, "getStageHost", function() {
                return __WEBPACK_IMPORTED_MODULE_5__script__.f;
            });
            __webpack_require__.d(__webpack_exports__, "getAPIStageHost", function() {
                return __WEBPACK_IMPORTED_MODULE_5__script__.a;
            });
        },
        "./src/logger.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), belter_src = __webpack_require__("./node_modules/belter/src/index.js"), LOG_LEVEL = {
                DEBUG: "debug",
                INFO: "info",
                WARN: "warn",
                ERROR: "error"
            }, AUTO_FLUSH_LEVEL = [ LOG_LEVEL.WARN, LOG_LEVEL.ERROR ], LOG_LEVEL_PRIORITY = [ LOG_LEVEL.ERROR, LOG_LEVEL.WARN, LOG_LEVEL.INFO, LOG_LEVEL.DEBUG ], FLUSH_INTERVAL = 6e4, DEFAULT_LOG_LEVEL = LOG_LEVEL.WARN, _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            };
            function httpTransport(_ref) {
                var url = _ref.url, method = _ref.method, headers = _ref.headers, json = _ref.json;
                return Object(belter_src.request)({
                    url: url,
                    method: method,
                    headers: headers,
                    json: json
                }).then(belter_src.noop);
            }
            function extendIfDefined(target, source) {
                for (var key in source) source.hasOwnProperty(key) && source[key] && (target[key] = source[key]);
            }
            var config = __webpack_require__("./src/config.js"), constants = __webpack_require__("./src/constants.js"), globals = __webpack_require__("./src/globals.js"), script = __webpack_require__("./src/script.js");
            __webpack_exports__.a = getLogger;
            __webpack_exports__.b = getPaymentsSDKStorage;
            __webpack_exports__.c = getSessionID;
            __webpack_exports__.d = function() {
                var logger = getLogger();
                logger.addPayloadBuilder(function() {
                    return {
                        referer: window.location.host,
                        uid: getSessionID(),
                        env: Object(globals.g)()
                    };
                });
                logger.addTrackingBuilder(function() {
                    var _ref;
                    return (_ref = {})[constants.h.FEED] = constants.g.PAYMENTS_SDK, _ref[constants.h.DATA_SOURCE] = constants.f.PAYMENTS_SDK, 
                    _ref[constants.h.CLIENT_ID] = Object(globals.a)(), _ref[constants.h.SELLER_ID] = Object(globals.m)(), 
                    _ref[constants.h.SESSION_UID] = getSessionID(), _ref[constants.h.REFERER] = window.location.host, 
                    _ref[constants.h.LOCALE] = Object(globals.k)() + "_" + Object(globals.d)(), _ref[constants.h.BUYER_COUNTRY] = Object(globals.d)(), 
                    _ref[constants.h.INTEGRATION_IDENTIFIER] = Object(globals.a)(), _ref[constants.h.PARTNER_ATTRIBUTION_ID] = Object(script.c)(), 
                    _ref[constants.h.SDK_NAME] = constants.i.PAYMENTS_SDK, _ref[constants.h.SDK_VERSION] = Object(globals.q)(), 
                    _ref[constants.h.USER_AGENT] = window.navigator && window.navigator.userAgent, _ref;
                });
                src.a.onPossiblyUnhandledException(function(err) {
                    var _logger$track;
                    logger.track(((_logger$track = {})[constants.h.ERROR_CODE] = "checkoutjs_error", 
                    _logger$track[constants.h.ERROR_DESC] = Object(belter_src.stringifyErrorMessage)(err), 
                    _logger$track));
                    logger.error("unhandled_error", {
                        stack: Object(belter_src.stringifyError)(err),
                        errtype: {}.toString.call(err)
                    });
                    logger.flush().catch(belter_src.noop);
                });
            };
            function getLogger() {
                return Object(belter_src.inlineMemoize)(getLogger, function() {
                    return function(_ref2) {
                        var url = _ref2.url, prefix = _ref2.prefix, _ref2$logLevel = _ref2.logLevel, logLevel = void 0 === _ref2$logLevel ? DEFAULT_LOG_LEVEL : _ref2$logLevel, _ref2$transport = _ref2.transport, transport = void 0 === _ref2$transport ? httpTransport : _ref2$transport, _ref2$flushInterval = _ref2.flushInterval, flushInterval = void 0 === _ref2$flushInterval ? FLUSH_INTERVAL : _ref2$flushInterval, events = [], tracking = [], payloadBuilders = [], metaBuilders = [], trackingBuilders = [], headerBuilders = [];
                        function print(level, event, payload) {
                            if (Object(belter_src.isBrowser)() && window.console && window.console.log) {
                                var consoleLogLevel = logLevel;
                                window.LOG_LEVEL && -1 !== LOG_LEVEL_PRIORITY.indexOf(window.LOG_LEVEL) && (consoleLogLevel = window.LOG_LEVEL);
                                if (!(LOG_LEVEL_PRIORITY.indexOf(level) > LOG_LEVEL_PRIORITY.indexOf(consoleLogLevel))) {
                                    var args = [ event ];
                                    args.push(payload);
                                    (payload.error || payload.warning) && args.push("\n\n", payload.error || payload.warning);
                                    try {
                                        window.console[level] && window.console[level].apply ? window.console[level].apply(window.console, args) : window.console.log && window.console.log.apply && window.console.log.apply(window.console, args);
                                    } catch (err) {}
                                }
                            }
                        }
                        function immediateFlush() {
                            return src.a.try(function() {
                                if (Object(belter_src.isBrowser)() && (events.length || tracking.length)) {
                                    for (var meta = {}, _i2 = 0, _length2 = null == metaBuilders ? 0 : metaBuilders.length; _i2 < _length2; _i2++) extendIfDefined(meta, (0, 
                                    metaBuilders[_i2])(meta));
                                    for (var headers = {}, _i4 = 0, _length4 = null == headerBuilders ? 0 : headerBuilders.length; _i4 < _length4; _i4++) extendIfDefined(headers, (0, 
                                    headerBuilders[_i4])(headers));
                                    var req = transport({
                                        method: "POST",
                                        url: url,
                                        headers: headers,
                                        json: {
                                            events: events,
                                            meta: meta,
                                            tracking: tracking
                                        }
                                    });
                                    events = [];
                                    tracking = [];
                                    return req.then(belter_src.noop);
                                }
                            });
                        }
                        var flush = Object(belter_src.promiseDebounce)(immediateFlush);
                        function log(level, event) {
                            var payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            if (Object(belter_src.isBrowser)()) {
                                prefix && (event = prefix + "_" + event);
                                for (var logPayload = _extends({}, Object(belter_src.objFilter)(payload), {
                                    timestamp: Date.now().toString()
                                }), _i6 = 0, _length6 = null == payloadBuilders ? 0 : payloadBuilders.length; _i6 < _length6; _i6++) extendIfDefined(logPayload, (0, 
                                payloadBuilders[_i6])(logPayload));
                                !function(level, event, payload) {
                                    events.push({
                                        level: level,
                                        event: event,
                                        payload: payload
                                    });
                                    -1 !== AUTO_FLUSH_LEVEL.indexOf(level) && flush();
                                }(level, event, logPayload);
                                print(level, event, logPayload);
                            }
                        }
                        Object(belter_src.isBrowser)() && Object(belter_src.safeInterval)(flush, flushInterval);
                        return {
                            debug: function(event, payload) {
                                log(LOG_LEVEL.DEBUG, event, payload);
                            },
                            info: function(event, payload) {
                                log(LOG_LEVEL.INFO, event, payload);
                            },
                            warn: function(event, payload) {
                                log(LOG_LEVEL.WARN, event, payload);
                            },
                            error: function(event, payload) {
                                log(LOG_LEVEL.ERROR, event, payload);
                            },
                            track: function() {
                                var payload = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                if (Object(belter_src.isBrowser)()) {
                                    for (var trackingPayload = Object(belter_src.objFilter)(payload), _i8 = 0, _length8 = null == trackingBuilders ? 0 : trackingBuilders.length; _i8 < _length8; _i8++) extendIfDefined(trackingPayload, (0, 
                                    trackingBuilders[_i8])(trackingPayload));
                                    print(LOG_LEVEL.DEBUG, "track", trackingPayload);
                                    tracking.push(trackingPayload);
                                }
                            },
                            flush: flush,
                            immediateFlush: immediateFlush,
                            addPayloadBuilder: function(builder) {
                                payloadBuilders.push(builder);
                            },
                            addMetaBuilder: function(builder) {
                                metaBuilders.push(builder);
                            },
                            addTrackingBuilder: function(builder) {
                                trackingBuilders.push(builder);
                            },
                            addHeaderBuilder: function(builder) {
                                headerBuilders.push(builder);
                            },
                            setTransport: function(newTransport) {
                                transport = newTransport;
                            }
                        };
                    }({
                        url: Object(config.e)()
                    });
                });
            }
            function getPaymentsSDKStorage() {
                return Object(belter_src.getStorage)({
                    name: "paypal_payments_sdk"
                });
            }
            function getSessionID() {
                return getPaymentsSDKStorage().getSessionID();
            }
        },
        "./src/script.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.d = getSDKScript;
            __webpack_exports__.e = getSDKSettings;
            __webpack_exports__.b = function() {
                var clientToken = getSDKSettings().clientToken;
                if (!clientToken) throw new Error('Expected data-client-token="xyz" to be passed with client token, to ' + getSDKScript().outerHTML);
                return clientToken;
            };
            __webpack_exports__.c = function() {
                return getSDKSettings().partnerAttributionID;
            };
            __webpack_exports__.f = getStageHost;
            __webpack_exports__.a = function() {
                return getSDKSettings().apiStageHost || getStageHost();
            };
            var __WEBPACK_IMPORTED_MODULE_0_belter_src__ = __webpack_require__("./node_modules/belter/src/index.js"), __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/constants.js"), __WEBPACK_IMPORTED_MODULE_2__globals__ = __webpack_require__("./src/globals.js");
            function getSDKScript() {
                return Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__.inlineMemoize)(getSDKScript, function() {
                    var _host$path = {
                        host: Object(__WEBPACK_IMPORTED_MODULE_2__globals__.h)(),
                        path: Object(__WEBPACK_IMPORTED_MODULE_2__globals__.n)()
                    }, host = _host$path.host, path = _host$path.path, script = Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__.getScript)({
                        host: host,
                        path: path
                    });
                    if (!script) throw new Error('PayPal Payments SDK script not present on page! Excected to find <script src="https://' + host + path + '">');
                    return script;
                });
            }
            function getSDKSettings() {
                return Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__.inlineMemoize)(getSDKSettings, function() {
                    var sdkScript = getSDKScript();
                    return {
                        clientToken: sdkScript.getAttribute(__WEBPACK_IMPORTED_MODULE_1__constants__.l.CLIENT_TOKEN),
                        partnerAttributionID: sdkScript.getAttribute(__WEBPACK_IMPORTED_MODULE_1__constants__.l.PARTNER_ATTRIBUTION_ID),
                        stageHost: sdkScript.getAttribute(__WEBPACK_IMPORTED_MODULE_1__constants__.l.STAGE_HOST),
                        apiStageHost: sdkScript.getAttribute(__WEBPACK_IMPORTED_MODULE_1__constants__.l.API_STAGE_HOST)
                    };
                });
            }
            function getStageHost() {
                return getSDKSettings().stageHost || Object(__WEBPACK_IMPORTED_MODULE_2__globals__.f)();
            }
        },
        "./src/types.js": function(module, exports) {}
    });
});
//# sourceMappingURL=paypal-braintree-sdk-client.js.map
//# sourceMappingURL=paypal-braintree-sdk-client.js.map