!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("btppClientConfig", [], factory) : "object" == typeof exports ? exports.btppClientConfig = factory() : root.btppClientConfig = factory();
}("undefined" != typeof self ? self : this, function() {
    return function(modules) {
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
        var installedModules = {};
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
        "./node_modules/webpack/buildin/global.js": function(module, exports) {
            var g, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            g = function() {
                return this;
            }();
            try {
                g = g || Function("return this")() || (0, eval)("this");
            } catch (e) {
                "object" === ("undefined" == typeof window ? "undefined" : _typeof(window)) && (g = window);
            }
            module.exports = g;
        },
        "./node_modules/zalgo-promise/src/exceptions.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function dispatchPossiblyUnhandledError(err) {
                if (-1 === Object(__WEBPACK_IMPORTED_MODULE_0__global__.a)().dispatchedErrors.indexOf(err)) {
                    Object(__WEBPACK_IMPORTED_MODULE_0__global__.a)().dispatchedErrors.push(err);
                    setTimeout(function() {
                        throw err;
                    }, 1);
                    for (var j = 0; j < Object(__WEBPACK_IMPORTED_MODULE_0__global__.a)().possiblyUnhandledPromiseHandlers.length; j++) Object(__WEBPACK_IMPORTED_MODULE_0__global__.a)().possiblyUnhandledPromiseHandlers[j](err);
                }
            }
            function onPossiblyUnhandledException(handler) {
                Object(__WEBPACK_IMPORTED_MODULE_0__global__.a)().possiblyUnhandledPromiseHandlers.push(handler);
                return {
                    cancel: function() {
                        Object(__WEBPACK_IMPORTED_MODULE_0__global__.a)().possiblyUnhandledPromiseHandlers.splice(Object(__WEBPACK_IMPORTED_MODULE_0__global__.a)().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                    }
                };
            }
            __webpack_exports__.a = dispatchPossiblyUnhandledError;
            __webpack_exports__.b = onPossiblyUnhandledException;
            var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/zalgo-promise/src/global.js");
        },
        "./node_modules/zalgo-promise/src/global.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            (function(global) {
                function getGlobal() {
                    var glob = void 0;
                    if ("undefined" != typeof window) glob = window; else {
                        if (void 0 === global) throw new Error("Can not find global");
                        glob = global;
                    }
                    glob.__zalgopromise__ || (glob.__zalgopromise__ = {
                        flushPromises: [],
                        activeCount: 0,
                        possiblyUnhandledPromiseHandlers: [],
                        dispatchedErrors: []
                    });
                    return glob.__zalgopromise__;
                }
                __webpack_exports__.a = getGlobal;
            }).call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/global.js"));
        },
        "./node_modules/zalgo-promise/src/promise.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return ZalgoPromise;
            });
            var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__("./node_modules/zalgo-promise/src/utils.js"), __WEBPACK_IMPORTED_MODULE_1__exceptions__ = __webpack_require__("./node_modules/zalgo-promise/src/exceptions.js"), __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__("./node_modules/zalgo-promise/src/global.js"), _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1;
                        descriptor.configurable = !0;
                        "value" in descriptor && (descriptor.writable = !0);
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    protoProps && defineProperties(Constructor.prototype, protoProps);
                    staticProps && defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }(), ZalgoPromise = function() {
                function ZalgoPromise(handler) {
                    var _this = this;
                    _classCallCheck(this, ZalgoPromise);
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
                _createClass(ZalgoPromise, [ {
                    key: "resolve",
                    value: function(result) {
                        if (this.resolved || this.rejected) return this;
                        if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(result)) throw new Error("Can not resolve promise with another promise");
                        this.resolved = !0;
                        this.value = result;
                        this.dispatch();
                        return this;
                    }
                }, {
                    key: "reject",
                    value: function(error) {
                        var _this2 = this;
                        if (this.resolved || this.rejected) return this;
                        if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(error)) throw new Error("Can not reject promise with another promise");
                        if (!error) {
                            var _err = error && "function" == typeof error.toString ? error.toString() : Object.prototype.toString.call(error);
                            error = new Error("Expected reject to be called with Error, got " + _err);
                        }
                        this.rejected = !0;
                        this.error = error;
                        this.errorHandled || setTimeout(function() {
                            _this2.errorHandled || Object(__WEBPACK_IMPORTED_MODULE_1__exceptions__.a)(error);
                        }, 1);
                        this.dispatch();
                        return this;
                    }
                }, {
                    key: "asyncReject",
                    value: function(error) {
                        this.errorHandled = !0;
                        this.reject(error);
                    }
                }, {
                    key: "dispatch",
                    value: function() {
                        var _this3 = this, dispatching = this.dispatching, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                        if (!dispatching && (resolved || rejected)) {
                            this.dispatching = !0;
                            Object(__WEBPACK_IMPORTED_MODULE_2__global__.a)().activeCount += 1;
                            for (var i = 0; i < handlers.length; i++) {
                                (function(i) {
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
                                    } else Object(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                                        promise.resolve(res);
                                    }, function(err) {
                                        promise.reject(err);
                                    }) : promise.resolve(result);
                                })(i);
                            }
                            handlers.length = 0;
                            this.dispatching = !1;
                            Object(__WEBPACK_IMPORTED_MODULE_2__global__.a)().activeCount -= 1;
                            0 === Object(__WEBPACK_IMPORTED_MODULE_2__global__.a)().activeCount && ZalgoPromise.flushQueue();
                        }
                    }
                }, {
                    key: "then",
                    value: function(onSuccess, onError) {
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
                    }
                }, {
                    key: "catch",
                    value: function(onError) {
                        return this.then(void 0, onError);
                    }
                }, {
                    key: "finally",
                    value: function(handler) {
                        return this.then(function(result) {
                            return ZalgoPromise.try(handler).then(function() {
                                return result;
                            });
                        }, function(err) {
                            return ZalgoPromise.try(handler).then(function() {
                                throw err;
                            });
                        });
                    }
                }, {
                    key: "timeout",
                    value: function(time, err) {
                        var _this4 = this;
                        if (this.resolved || this.rejected) return this;
                        var timeout = setTimeout(function() {
                            _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
                        }, time);
                        return this.then(function(result) {
                            clearTimeout(timeout);
                            return result;
                        });
                    }
                }, {
                    key: "toPromise",
                    value: function() {
                        if ("undefined" == typeof Promise) throw new Error("Could not find Promise");
                        return Promise.resolve(this);
                    }
                } ], [ {
                    key: "resolve",
                    value: function(value) {
                        return value instanceof ZalgoPromise ? value : Object(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(value) ? new ZalgoPromise(function(resolve, reject) {
                            return value.then(resolve, reject);
                        }) : new ZalgoPromise().resolve(value);
                    }
                }, {
                    key: "reject",
                    value: function(error) {
                        return new ZalgoPromise().reject(error);
                    }
                }, {
                    key: "all",
                    value: function(promises) {
                        var promise = new ZalgoPromise(), count = promises.length, results = [];
                        if (!count) {
                            promise.resolve(results);
                            return promise;
                        }
                        for (var i = 0; i < promises.length; i++) {
                            (function(i) {
                                var prom = promises[i];
                                if (prom instanceof ZalgoPromise) {
                                    if (prom.resolved) {
                                        results[i] = prom.value;
                                        count -= 1;
                                        return "continue";
                                    }
                                } else if (!Object(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(prom)) {
                                    results[i] = prom;
                                    count -= 1;
                                    return "continue";
                                }
                                ZalgoPromise.resolve(prom).then(function(result) {
                                    results[i] = result;
                                    count -= 1;
                                    0 === count && promise.resolve(results);
                                }, function(err) {
                                    promise.reject(err);
                                });
                            })(i);
                        }
                        0 === count && promise.resolve(results);
                        return promise;
                    }
                }, {
                    key: "hash",
                    value: function(promises) {
                        var result = {};
                        return ZalgoPromise.all(Object.keys(promises).map(function(key) {
                            return ZalgoPromise.resolve(promises[key]).then(function(value) {
                                result[key] = value;
                            });
                        })).then(function() {
                            return result;
                        });
                    }
                }, {
                    key: "map",
                    value: function(items, method) {
                        return ZalgoPromise.all(items.map(method));
                    }
                }, {
                    key: "onPossiblyUnhandledException",
                    value: function(handler) {
                        return Object(__WEBPACK_IMPORTED_MODULE_1__exceptions__.b)(handler);
                    }
                }, {
                    key: "try",
                    value: function(method, context, args) {
                        var result = void 0;
                        try {
                            result = method.apply(context, args || []);
                        } catch (err) {
                            return ZalgoPromise.reject(err);
                        }
                        return ZalgoPromise.resolve(result);
                    }
                }, {
                    key: "delay",
                    value: function(_delay) {
                        return new ZalgoPromise(function(resolve) {
                            setTimeout(resolve, _delay);
                        });
                    }
                }, {
                    key: "isPromise",
                    value: function(value) {
                        return !!(value && value instanceof ZalgoPromise) || Object(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(value);
                    }
                }, {
                    key: "flush",
                    value: function() {
                        var promise = new ZalgoPromise();
                        Object(__WEBPACK_IMPORTED_MODULE_2__global__.a)().flushPromises.push(promise);
                        0 === Object(__WEBPACK_IMPORTED_MODULE_2__global__.a)().activeCount && ZalgoPromise.flushQueue();
                        return promise;
                    }
                }, {
                    key: "flushQueue",
                    value: function() {
                        var promisesToFlush = Object(__WEBPACK_IMPORTED_MODULE_2__global__.a)().flushPromises;
                        Object(__WEBPACK_IMPORTED_MODULE_2__global__.a)().flushPromises = [];
                        for (var _iterator = promisesToFlush, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                _i = _iterator.next();
                                if (_i.done) break;
                                _ref = _i.value;
                            }
                            _ref.resolve();
                        }
                    }
                } ]);
                return ZalgoPromise;
            }();
        },
        "./node_modules/zalgo-promise/src/utils.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function isPromise(item) {
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
            __webpack_exports__.a = isPromise;
        },
        "./src/config.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function get(key, def) {
                var config = Object(__WEBPACK_IMPORTED_MODULE_0__global__.a)("config");
                return config.hasOwnProperty(key) ? config[key] : def;
            }
            function set(key, value) {
                Object(__WEBPACK_IMPORTED_MODULE_0__global__.a)("config")[key] = value;
                return value;
            }
            function getOrSet(key, value) {
                var config = Object(__WEBPACK_IMPORTED_MODULE_0__global__.a)("config");
                if (config.hasOwnProperty(key)) return config[key];
                config[key] = value;
                return value;
            }
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return clientConfig;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return serverConfig;
            });
            var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./src/global.js"), clientConfig = {
                get: get,
                set: set,
                getOrSet: getOrSet
            }, serverConfig = __SERVER_PAYPAL_BRAINTREE_CONFIG__;
        },
        "./src/constants.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return GLOBAL_KEY;
            });
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return ENV;
            });
            var GLOBAL_KEY = "__paypal_braintree_global__", ENV = {
                PRODUCTION: "production",
                SANDBOX: "sandbox",
                STAGE: "stage",
                LOCAL: "local"
            };
        },
        "./src/global.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function getGlobal(key, def) {
                window[__WEBPACK_IMPORTED_MODULE_0__constants__.b] = window[__WEBPACK_IMPORTED_MODULE_0__constants__.b] || {};
                if (window[__WEBPACK_IMPORTED_MODULE_0__constants__.b].hasOwnProperty(key)) return window[__WEBPACK_IMPORTED_MODULE_0__constants__.b][key];
                def = def || {};
                window[__WEBPACK_IMPORTED_MODULE_0__constants__.b][key] = def;
                return def;
            }
            __webpack_exports__.a = getGlobal;
            var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./src/constants.js");
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
        },
        "./src/interface.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function attach(exportBuilder) {
                exportBuilders.push(exportBuilder);
            }
            function client(clientOptions) {
                Object(__WEBPACK_IMPORTED_MODULE_2__validation__.a)(clientOptions);
                for (var xports = {}, i = 0; i < exportBuilders.length; i++) Object(__WEBPACK_IMPORTED_MODULE_0__util__.a)(xports, exportBuilders[i]({
                    clientOptions: clientOptions,
                    clientConfig: __WEBPACK_IMPORTED_MODULE_3__config__.a,
                    serverConfig: __WEBPACK_IMPORTED_MODULE_3__config__.b
                }));
                return xports;
            }
            __webpack_exports__.a = attach;
            var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./src/util.js"), __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__("./src/global.js"), __WEBPACK_IMPORTED_MODULE_2__validation__ = __webpack_require__("./src/validation.js"), __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__("./src/config.js"), exportBuilders = Object(__WEBPACK_IMPORTED_MODULE_1__global__.a)("exportBuilders", []);
            window.paypal = window.paypal || {};
            window.paypal.client = window.paypal.client || client;
        },
        "./src/util.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function extend(obj, source) {
                if (!source) return obj;
                if (Object.assign) return Object.assign(obj, source);
                for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
                return obj;
            }
            function values(obj) {
                if (Object.values) return Object.values(obj);
                var result = [];
                for (var key in obj) obj.hasOwnProperty(key) && result.push(obj[key]);
                return result;
            }
            function isObject(item) {
                return "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item;
            }
            __webpack_exports__.a = extend;
            __webpack_exports__.c = values;
            __webpack_exports__.b = isObject;
            var _typeof = (__webpack_require__("./node_modules/zalgo-promise/src/promise.js"), 
            __webpack_require__("./src/global.js"), "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            });
        },
        "./src/validation.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function validateClientOptions(_ref) {
                var env = _ref.env, auth = _ref.auth;
                if (!env || -1 === Object(__WEBPACK_IMPORTED_MODULE_1__util__.c)(__WEBPACK_IMPORTED_MODULE_0__constants__.a).indexOf(env)) throw new Error("Invalid env: " + env);
                if (!Object(__WEBPACK_IMPORTED_MODULE_1__util__.b)(auth)) throw new Error("Expected auth to be passed");
                if (!auth[env]) throw new Error("Expected auth to be passed for current env");
            }
            __webpack_exports__.a = validateClientOptions;
            var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./src/constants.js"), __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__("./src/util.js");
        }
    });
});
//# sourceMappingURL=paypal-braintree-sdk-client.js.map
//# sourceMappingURL=paypal-braintree-sdk-client.js.map