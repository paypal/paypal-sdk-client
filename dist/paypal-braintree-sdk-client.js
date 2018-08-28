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
            __webpack_require__("./node_modules/zalgo-promise/src/index.js"), __webpack_require__("./node_modules/belter/src/util.js"), 
            __webpack_require__("./node_modules/belter/src/device.js");
            __webpack_exports__.a = function() {
                return "undefined" != typeof window;
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
            __webpack_require__.d(__webpack_exports__, "isBrowser", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.a;
            });
            __webpack_require__("./node_modules/belter/src/experiment.js"), __webpack_require__("./node_modules/belter/src/global.js"), 
            __webpack_require__("./node_modules/belter/src/jsx.jsx");
            var __WEBPACK_IMPORTED_MODULE_5__storage__ = __webpack_require__("./node_modules/belter/src/storage.js");
            __webpack_require__.d(__webpack_exports__, "getStorage", function() {
                return __WEBPACK_IMPORTED_MODULE_5__storage__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_6__util__ = __webpack_require__("./node_modules/belter/src/util.js");
            __webpack_require__.d(__webpack_exports__, "getGlobal", function() {
                return __WEBPACK_IMPORTED_MODULE_6__util__.a;
            });
            __webpack_require__.d(__webpack_exports__, "noop", function() {
                return __WEBPACK_IMPORTED_MODULE_6__util__.d;
            });
            __webpack_require__.d(__webpack_exports__, "objFilter", function() {
                return __WEBPACK_IMPORTED_MODULE_6__util__.e;
            });
            __webpack_require__.d(__webpack_exports__, "promiseDebounce", function() {
                return __WEBPACK_IMPORTED_MODULE_6__util__.f;
            });
            __webpack_require__.d(__webpack_exports__, "safeInterval", function() {
                return __WEBPACK_IMPORTED_MODULE_6__util__.i;
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
            __webpack_exports__.a = function(_ref) {
                var name = _ref.name, _ref$version = _ref.version, version = void 0 === _ref$version ? "latest" : _ref$version, _ref$lifetime = _ref.lifetime, lifetime = void 0 === _ref$lifetime ? 3e5 : _ref$lifetime, STORAGE_KEY = "__" + name + "_" + version + "_storage__", accessedStorage = void 0;
                function getState(handler) {
                    var localStorageEnabled = Object(__WEBPACK_IMPORTED_MODULE_0__util__.c)(), storage = void 0;
                    accessedStorage && (storage = accessedStorage);
                    if (!storage && localStorageEnabled) {
                        var rawStorage = window.localStorage.getItem(STORAGE_KEY);
                        rawStorage && (storage = JSON.parse(rawStorage));
                    }
                    storage || (storage = Object(__WEBPACK_IMPORTED_MODULE_0__util__.a)()[STORAGE_KEY]);
                    storage || (storage = {
                        id: Object(__WEBPACK_IMPORTED_MODULE_0__util__.k)()
                    });
                    storage.id || (storage.id = Object(__WEBPACK_IMPORTED_MODULE_0__util__.k)());
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
                            guid: Object(__WEBPACK_IMPORTED_MODULE_0__util__.k)(),
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
            };
            var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/belter/src/util.js");
        },
        "./node_modules/belter/src/types.js": function(module, exports) {},
        "./node_modules/belter/src/util.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.a = getGlobal;
            __webpack_exports__.b = inlineMemoize;
            __webpack_exports__.d = function() {};
            __webpack_exports__.k = function() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                }) + "_" + base64encode(new Date().toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            };
            __webpack_exports__.c = function isLocalStorageEnabled() {
                return inlineMemoize(isLocalStorageEnabled, function() {
                    try {
                        if ("undefined" == typeof window) return !1;
                        if (window.localStorage) {
                            var _value = Math.random().toString();
                            window.localStorage.setItem("__test__localStorage__", _value);
                            var result = window.localStorage.getItem("__test__localStorage__");
                            window.localStorage.removeItem("__test__localStorage__");
                            if (_value === result) return !0;
                        }
                    } catch (err) {}
                    return !1;
                });
            };
            __webpack_exports__.g = function(str, regex, handler) {
                var results = [];
                str.replace(regex, function(item) {
                    results.push(handler ? handler.apply(null, arguments) : item);
                });
                return results;
            };
            __webpack_exports__.j = function(svg) {
                return "data:image/svg+xml;base64," + base64encode(svg);
            };
            __webpack_exports__.e = function(obj) {
                var filter = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Boolean, result = {};
                for (var _key4 in obj) obj.hasOwnProperty(_key4) && filter(obj[_key4], _key4) && (result[_key4] = obj[_key4]);
                return result;
            };
            __webpack_exports__.h = function(text, regex) {
                var result = [];
                text.replace(regex, function(token) {
                    result.push(token);
                    return "";
                });
                return result;
            };
            __webpack_exports__.f = function(method) {
                var delay = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50, promise = void 0, timeout = void 0;
                return function() {
                    timeout && clearTimeout(timeout);
                    var localPromise = promise = promise || new __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a();
                    timeout = setTimeout(function() {
                        promise = null;
                        timeout = null;
                        __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.try(method).then(function(result) {
                            return localPromise.resolve(result);
                        }, function(err) {
                            return localPromise.reject(err);
                        });
                    }, delay);
                    return localPromise;
                };
            };
            __webpack_exports__.i = function(method, time) {
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
            function getGlobal() {
                if ("undefined" != typeof window) return window;
                if ("undefined" != typeof global) return global;
                throw new Error("No global found");
            }
            function inlineMemoize(method, logic) {
                var args = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
                method.__memoized__ || (method.__memoized__ = function(method) {
                    var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (method.__memoized__) return method.__memoized__;
                    var cache = {};
                    method.__memoized__ = function() {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                        if (method.__memoized__ && method.__memoized__.__calling__) throw new Error("Can not call memoized method recursively");
                        var key = void 0;
                        try {
                            key = JSON.stringify(Array.prototype.slice.call(arguments));
                        } catch (err) {
                            throw new Error("Arguments not serializable -- can not be used to memoize");
                        }
                        var cacheTime = options.time;
                        cache[key] && cacheTime && Date.now() - cache[key].time < cacheTime && delete cache[key];
                        var glob = getGlobal();
                        glob.__CACHE_START_TIME__ && cache[key] && cache[key].time < glob.__CACHE_START_TIME__ && delete cache[key];
                        if (cache[key]) return cache[key].value;
                        method.__memoized__.__calling__ = !0;
                        var time = Date.now(), value = method.apply(this, arguments);
                        method.__memoized__.__calling__ = !1;
                        cache[key] = {
                            time: time,
                            value: value
                        };
                        return cache[key].value;
                    };
                    method.__memoized__.reset = function() {
                        cache = {};
                    };
                    return method.__memoized__;
                }(logic));
                return method.__memoized__.apply(method, args);
            }
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
                    if ("undefined" == typeof global) throw new TypeError("Can not find global");
                    glob = global;
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
                        _this2.errorHandled || function(err) {
                            if (-1 === getGlobal().dispatchedErrors.indexOf(err)) {
                                getGlobal().dispatchedErrors.push(err);
                                setTimeout(function() {
                                    throw err;
                                }, 1);
                                for (var j = 0; j < getGlobal().possiblyUnhandledPromiseHandlers.length; j++) getGlobal().possiblyUnhandledPromiseHandlers[j](err);
                            }
                        }(error);
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
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return URLS;
            });
            var URLS = {
                LOGGER: "https://www.paypal.com/webapps/hermes/api/logger"
            };
        },
        "./src/constants.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "h", function() {
                return GLOBAL_KEY;
            });
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return ENV;
            });
            __webpack_require__.d(__webpack_exports__, "i", function() {
                return GLOBAL_NAMESPACE;
            });
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return DEFAULT_ENV;
            });
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return COUNTRY;
            });
            __webpack_require__.d(__webpack_exports__, "j", function() {
                return LANG;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return COUNTRY_LANGS;
            });
            __webpack_require__.d(__webpack_exports__, "g", function() {
                return FPTI_KEY;
            });
            __webpack_require__.d(__webpack_exports__, "e", function() {
                return FPTI_DATA_SOURCE;
            });
            __webpack_require__.d(__webpack_exports__, "f", function() {
                return FPTI_FEED;
            });
            var _COUNTRY_LANGS, GLOBAL_KEY = "__paypal_braintree_global__", ENV = {
                LOCAL: "local",
                STAGE: "stage",
                SANDBOX: "sandbox",
                PRODUCTION: "production",
                TEST: "test",
                DEMO: "demo"
            }, GLOBAL_NAMESPACE = "paypal", DEFAULT_ENV = ENV.PRODUCTION, COUNTRY = {
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
                VERSION: "checkoutjs_version"
            }, FPTI_DATA_SOURCE = {
                PAYMENTS_SDK: "payments_sdk"
            }, FPTI_FEED = {
                PAYMENTS_SDK: "payments_sdk"
            };
        },
        "./src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0__interface__ = __webpack_require__("./src/interface.js");
            __webpack_require__.d(__webpack_exports__, "attach", function() {
                return __WEBPACK_IMPORTED_MODULE_0__interface__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/constants.js");
            __webpack_require__.d(__webpack_exports__, "GLOBAL_KEY", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.h;
            });
            __webpack_require__.d(__webpack_exports__, "ENV", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.d;
            });
            __webpack_require__.d(__webpack_exports__, "GLOBAL_NAMESPACE", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.i;
            });
            __webpack_require__.d(__webpack_exports__, "DEFAULT_ENV", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.c;
            });
            __webpack_require__.d(__webpack_exports__, "COUNTRY", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.a;
            });
            __webpack_require__.d(__webpack_exports__, "LANG", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.j;
            });
            __webpack_require__.d(__webpack_exports__, "COUNTRY_LANGS", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.b;
            });
            __webpack_require__.d(__webpack_exports__, "FPTI_KEY", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.g;
            });
            __webpack_require__.d(__webpack_exports__, "FPTI_DATA_SOURCE", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.e;
            });
            __webpack_require__.d(__webpack_exports__, "FPTI_FEED", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.f;
            });
            var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__("./src/config.js");
            __webpack_require__.d(__webpack_exports__, "URLS", function() {
                return __WEBPACK_IMPORTED_MODULE_2__config__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_3__logger__ = __webpack_require__("./src/logger.js");
            __webpack_require__.d(__webpack_exports__, "logger", function() {
                return __WEBPACK_IMPORTED_MODULE_3__logger__.b;
            });
            __webpack_require__.d(__webpack_exports__, "getSessionID", function() {
                return __WEBPACK_IMPORTED_MODULE_3__logger__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_4__types__ = __webpack_require__("./src/types.js");
            __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__types__);
            for (var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_4__types__) [ "attach", "GLOBAL_KEY", "ENV", "GLOBAL_NAMESPACE", "DEFAULT_ENV", "COUNTRY", "LANG", "COUNTRY_LANGS", "FPTI_KEY", "FPTI_DATA_SOURCE", "FPTI_FEED", "URLS", "logger", "getSessionID", "default" ].indexOf(__WEBPACK_IMPORT_KEY__) < 0 && function(key) {
                __webpack_require__.d(__webpack_exports__, key, function() {
                    return __WEBPACK_IMPORTED_MODULE_4__types__[key];
                });
            }(__WEBPACK_IMPORT_KEY__);
        },
        "./src/interface.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, src = __webpack_require__("./node_modules/belter/src/index.js"), constants = __webpack_require__("./src/constants.js");
            __webpack_exports__.a = function(moduleName, exportBuilder) {
                if (exportBuilders[moduleName]) throw new Error("Already attached " + moduleName);
                window[constants.i] = window[constants.i] || {};
                window[constants.i].client = window.client || client;
                exportBuilders[moduleName] = exportBuilder;
            };
            var exportBuilders = function(key, def) {
                var glob = Object(src.getGlobal)();
                glob[constants.h] = glob[constants.h] || {};
                if (glob[constants.h].hasOwnProperty(key)) return glob[constants.h][key];
                def = def || {};
                glob[constants.h][key] = def;
                return def;
            }("exportBuilders", {});
            function client() {
                var clientOptions = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                    env: constants.c
                };
                !function(_ref) {
                    var item, env = _ref.env, auth = _ref.auth;
                    if (env && -1 === function(obj) {
                        if (Object.values) return Object.values(obj);
                        var result = [];
                        for (var key in obj) obj.hasOwnProperty(key) && result.push(obj[key]);
                        return result;
                    }(constants.d).indexOf(env)) throw new Error("Invalid env: " + env);
                    if (auth && !(item = auth, "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item)) throw new Error("Expected auth to be passed");
                    if (auth && env && !auth[env]) throw new Error("Expected auth to be passed for env: " + env);
                }(clientOptions = JSON.parse(JSON.stringify(clientOptions)));
                var xports = {};
                Object.keys(exportBuilders).forEach(function(moduleName) {
                    !function(obj, source) {
                        if (!source) return obj;
                        if (Object.assign) return Object.assign(obj, source);
                        for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
                    }(xports, exportBuilders[moduleName]({
                        clientOptions: clientOptions
                    }));
                });
                return xports;
            }
        },
        "./src/logger.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), belter_src = __webpack_require__("./node_modules/belter/src/index.js"), AUTO_FLUSH_LEVEL = [ "warn", "error" ], LOG_LEVEL_PRIORITY = [ "error", "warn", "info", "debug" ], _extends = Object.assign || function(target) {
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
            var config = __webpack_require__("./src/config.js"), constants = __webpack_require__("./src/constants.js");
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return logger;
            });
            __webpack_exports__.a = getSessionID;
            var logger = function(_ref2) {
                var url = _ref2.url, prefix = _ref2.prefix, _ref2$logLevel = _ref2.logLevel, logLevel = void 0 === _ref2$logLevel ? "warn" : _ref2$logLevel, _ref2$transport = _ref2.transport, transport = void 0 === _ref2$transport ? httpTransport : _ref2$transport, _ref2$flushInterval = _ref2.flushInterval, flushInterval = void 0 === _ref2$flushInterval ? 6e4 : _ref2$flushInterval, events = [], tracking = [], payloadBuilders = [], metaBuilders = [], trackingBuilders = [], headerBuilders = [];
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
                        log("debug", event, payload);
                    },
                    info: function(event, payload) {
                        log("info", event, payload);
                    },
                    warn: function(event, payload) {
                        log("warn", event, payload);
                    },
                    error: function(event, payload) {
                        log("error", event, payload);
                    },
                    track: function() {
                        var payload = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        if (Object(belter_src.isBrowser)()) {
                            for (var trackingPayload = Object(belter_src.objFilter)(payload), _i8 = 0, _length8 = null == trackingBuilders ? 0 : trackingBuilders.length; _i8 < _length8; _i8++) extendIfDefined(trackingPayload, (0, 
                            trackingBuilders[_i8])(trackingPayload));
                            print("debug", "track", trackingPayload);
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
                url: config.a.LOGGER
            }), storage = Object(belter_src.getStorage)({
                name: "paypal_payments_sdk"
            });
            function getSessionID() {
                return storage.getSessionID();
            }
            logger.addPayloadBuilder(function() {
                return {
                    referer: window.location.host,
                    uid: getSessionID(),
                    env: "production"
                };
            });
            logger.addTrackingBuilder(function() {
                var _ref, sessionID = getSessionID();
                return (_ref = {})[constants.g.FEED] = constants.f.PAYMENTS_SDK, _ref[constants.g.DATA_SOURCE] = constants.e.PAYMENTS_SDK, 
                _ref[constants.g.CLIENT_ID] = __CLIENT_ID__, _ref[constants.g.SELLER_ID] = __MERCHANT_ID__, 
                _ref[constants.g.SESSION_UID] = sessionID, _ref[constants.g.REFERER] = window.location.host, 
                _ref;
            });
        },
        "./src/types.js": function(module, exports) {}
    });
});
//# sourceMappingURL=paypal-braintree-sdk-client.js.map
//# sourceMappingURL=paypal-braintree-sdk-client.js.map