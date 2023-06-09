!function(root, factory) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = factory(); else if ("function" == typeof define && define.amd) define([], factory); else {
        var a = factory();
        for (var i in a) ("object" == typeof exports ? exports : root)[i] = a[i];
    }
}("undefined" != typeof self ? self : this, (function() {
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
                enumerable: !0,
                get: getter
            });
        };
        __webpack_require__.r = function(exports) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            });
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
        };
        __webpack_require__.t = function(value, mode) {
            1 & mode && (value = __webpack_require__(value));
            if (8 & mode) return value;
            if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
            var ns = Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", {
                enumerable: !0,
                value: value
            });
            if (2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
                return value[key];
            }.bind(null, key));
            return ns;
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
            return {}.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = "./src/index.js");
    }({
        "./src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "setupSDK", (function() {
                return setupSDK;
            }));
            __webpack_require__.d(__webpack_exports__, "SUPPORTED_BROWSERS", (function() {
                return SUPPORTED_BROWSERS;
            }));
            __webpack_require__.d(__webpack_exports__, "CLIENT_ID_ALIAS", (function() {
                return CLIENT_ID_ALIAS;
            }));
            __webpack_require__.d(__webpack_exports__, "URI", (function() {
                return URI;
            }));
            __webpack_require__.d(__webpack_exports__, "getLogger", (function() {
                return getLogger;
            }));
            __webpack_require__.d(__webpack_exports__, "_TYPES", (function() {
                return _TYPES;
            }));
            __webpack_require__.d(__webpack_exports__, "TYPES", (function() {
                return src_types_TYPES;
            }));
            __webpack_require__.d(__webpack_exports__, "getSDKHost", (function() {
                return getSDKHost;
            }));
            __webpack_require__.d(__webpack_exports__, "getProtocol", (function() {
                return global_getProtocol;
            }));
            __webpack_require__.d(__webpack_exports__, "getHost", (function() {
                return getHost;
            }));
            __webpack_require__.d(__webpack_exports__, "getHostName", (function() {
                return getHostName;
            }));
            __webpack_require__.d(__webpack_exports__, "getPort", (function() {
                return getPort;
            }));
            __webpack_require__.d(__webpack_exports__, "getPath", (function() {
                return getPath;
            }));
            __webpack_require__.d(__webpack_exports__, "getEnv", (function() {
                return getEnv;
            }));
            __webpack_require__.d(__webpack_exports__, "getPayPalDomain", (function() {
                return getPayPalDomain;
            }));
            __webpack_require__.d(__webpack_exports__, "getPayPalAPIDomain", (function() {
                return getPayPalAPIDomain;
            }));
            __webpack_require__.d(__webpack_exports__, "getDefaultServiceStageHost", (function() {
                return getDefaultServiceStageHost;
            }));
            __webpack_require__.d(__webpack_exports__, "getDefaultStageHost", (function() {
                return getDefaultStageHost;
            }));
            __webpack_require__.d(__webpack_exports__, "getDefaultAPIStageHost", (function() {
                return getDefaultAPIStageHost;
            }));
            __webpack_require__.d(__webpack_exports__, "getStageHost", (function() {
                return getStageHost;
            }));
            __webpack_require__.d(__webpack_exports__, "getAPIStageHost", (function() {
                return getAPIStageHost;
            }));
            __webpack_require__.d(__webpack_exports__, "getVersion", (function() {
                return getVersion;
            }));
            __webpack_require__.d(__webpack_exports__, "getCorrelationID", (function() {
                return getCorrelationID;
            }));
            __webpack_require__.d(__webpack_exports__, "getDefaultNamespace", (function() {
                return getDefaultNamespace;
            }));
            __webpack_require__.d(__webpack_exports__, "getDebug", (function() {
                return getDebug;
            }));
            __webpack_require__.d(__webpack_exports__, "getComponents", (function() {
                return getComponents;
            }));
            __webpack_require__.d(__webpack_exports__, "getFundingEligibility", (function() {
                return getFundingEligibility;
            }));
            __webpack_require__.d(__webpack_exports__, "getPlatform", (function() {
                return getPlatform;
            }));
            __webpack_require__.d(__webpack_exports__, "getDisableSetCookie", (function() {
                return getDisableSetCookie;
            }));
            __webpack_require__.d(__webpack_exports__, "getSDKScript", (function() {
                return getSDKScript;
            }));
            __webpack_require__.d(__webpack_exports__, "getSDKAttributes", (function() {
                return getSDKAttributes;
            }));
            __webpack_require__.d(__webpack_exports__, "getSDKAttribute", (function() {
                return getSDKAttribute;
            }));
            __webpack_require__.d(__webpack_exports__, "getSDKQueryParams", (function() {
                return getSDKQueryParams;
            }));
            __webpack_require__.d(__webpack_exports__, "getSDKQueryParam", (function() {
                return getSDKQueryParam;
            }));
            __webpack_require__.d(__webpack_exports__, "getScriptUrl", (function() {
                return getScriptUrl;
            }));
            __webpack_require__.d(__webpack_exports__, "getSDKQueryParamBool", (function() {
                return getSDKQueryParamBool;
            }));
            __webpack_require__.d(__webpack_exports__, "getClientID", (function() {
                return getClientID;
            }));
            __webpack_require__.d(__webpack_exports__, "getMerchantID", (function() {
                return getMerchantID;
            }));
            __webpack_require__.d(__webpack_exports__, "getIntent", (function() {
                return getIntent;
            }));
            __webpack_require__.d(__webpack_exports__, "getCommit", (function() {
                return getCommit;
            }));
            __webpack_require__.d(__webpack_exports__, "getVault", (function() {
                return getVault;
            }));
            __webpack_require__.d(__webpack_exports__, "getCurrency", (function() {
                return getCurrency;
            }));
            __webpack_require__.d(__webpack_exports__, "getEnableFunding", (function() {
                return getEnableFunding;
            }));
            __webpack_require__.d(__webpack_exports__, "getDisableFunding", (function() {
                return getDisableFunding;
            }));
            __webpack_require__.d(__webpack_exports__, "getDisableCard", (function() {
                return getDisableCard;
            }));
            __webpack_require__.d(__webpack_exports__, "getBuyerCountry", (function() {
                return getBuyerCountry;
            }));
            __webpack_require__.d(__webpack_exports__, "getNamespace", (function() {
                return getNamespace;
            }));
            __webpack_require__.d(__webpack_exports__, "getClientToken", (function() {
                return getClientToken;
            }));
            __webpack_require__.d(__webpack_exports__, "getAmount", (function() {
                return getAmount;
            }));
            __webpack_require__.d(__webpack_exports__, "getUserIDToken", (function() {
                return getUserIDToken;
            }));
            __webpack_require__.d(__webpack_exports__, "getClientAccessToken", (function() {
                return getClientAccessToken;
            }));
            __webpack_require__.d(__webpack_exports__, "getPartnerAttributionID", (function() {
                return getPartnerAttributionID;
            }));
            __webpack_require__.d(__webpack_exports__, "getMerchantRequestedPopupsDisabled", (function() {
                return getMerchantRequestedPopupsDisabled;
            }));
            __webpack_require__.d(__webpack_exports__, "getPageType", (function() {
                return getPageType;
            }));
            __webpack_require__.d(__webpack_exports__, "getLocale", (function() {
                return getLocale;
            }));
            __webpack_require__.d(__webpack_exports__, "getCSPNonce", (function() {
                return getCSPNonce;
            }));
            __webpack_require__.d(__webpack_exports__, "getEnableThreeDomainSecure", (function() {
                return getEnableThreeDomainSecure;
            }));
            __webpack_require__.d(__webpack_exports__, "getSDKIntegrationSource", (function() {
                return getSDKIntegrationSource;
            }));
            __webpack_require__.d(__webpack_exports__, "getUserExperienceFlow", (function() {
                return getUserExperienceFlow;
            }));
            __webpack_require__.d(__webpack_exports__, "isChildWindow", (function() {
                return isChildWindow;
            }));
            __webpack_require__.d(__webpack_exports__, "getUserAccessToken", (function() {
                return getUserAccessToken;
            }));
            __webpack_require__.d(__webpack_exports__, "getUserAuthCode", (function() {
                return getUserAuthCode;
            }));
            __webpack_require__.d(__webpack_exports__, "getCountry", (function() {
                return getCountry;
            }));
            __webpack_require__.d(__webpack_exports__, "getLang", (function() {
                return getLang;
            }));
            __webpack_require__.d(__webpack_exports__, "getSDKMeta", (function() {
                return getSDKMeta;
            }));
            __webpack_require__.d(__webpack_exports__, "createAccessToken", (function() {
                return createAccessToken;
            }));
            __webpack_require__.d(__webpack_exports__, "createOrder", (function() {
                return createOrder;
            }));
            __webpack_require__.d(__webpack_exports__, "createExperiment", (function() {
                return createExperiment;
            }));
            __webpack_require__.d(__webpack_exports__, "getSessionID", (function() {
                return session_getSessionID;
            }));
            __webpack_require__.d(__webpack_exports__, "getStorageState", (function() {
                return getStorageState;
            }));
            __webpack_require__.d(__webpack_exports__, "getStorageID", (function() {
                return getStorageID;
            }));
            __webpack_require__.d(__webpack_exports__, "getSessionState", (function() {
                return session_getSessionState;
            }));
            __webpack_require__.d(__webpack_exports__, "getClientMetadataID", (function() {
                return getClientMetadataID;
            }));
            __webpack_require__.d(__webpack_exports__, "getEventEmitter", (function() {
                return getEventEmitter;
            }));
            __webpack_require__.d(__webpack_exports__, "insertMockSDKScript", (function() {
                return insertMockSDKScript;
            }));
            __webpack_require__.d(__webpack_exports__, "callGraphQL", (function() {
                return callGraphQL;
            }));
            __webpack_require__.d(__webpack_exports__, "getGraphQLFundingEligibility", (function() {
                return getGraphQLFundingEligibility;
            }));
            __webpack_require__.d(__webpack_exports__, "getPayPalLoggerDomain", (function() {
                return getPayPalLoggerDomain;
            }));
            __webpack_require__.d(__webpack_exports__, "buildPayPalUrl", (function() {
                return buildPayPalUrl;
            }));
            __webpack_require__.d(__webpack_exports__, "buildPayPalAPIUrl", (function() {
                return buildPayPalAPIUrl;
            }));
            __webpack_require__.d(__webpack_exports__, "getPayPalLoggerUrl", (function() {
                return getPayPalLoggerUrl;
            }));
            __webpack_require__.d(__webpack_exports__, "getAuthAPIUrl", (function() {
                return getAuthAPIUrl;
            }));
            __webpack_require__.d(__webpack_exports__, "getOrderAPIUrl", (function() {
                return getOrderAPIUrl;
            }));
            __webpack_require__.d(__webpack_exports__, "getPayPalDomainRegex", (function() {
                return getPayPalDomainRegex;
            }));
            __webpack_require__.d(__webpack_exports__, "isPayPalDomain", (function() {
                return isPayPalDomain;
            }));
            __webpack_require__.d(__webpack_exports__, "getSDKInitTime", (function() {
                return getSDKInitTime;
            }));
            __webpack_require__.d(__webpack_exports__, "setupLogger", (function() {
                return setupLogger;
            }));
            __webpack_require__.d(__webpack_exports__, "getComputedLocales", (function() {
                return getComputedLocales;
            }));
            function _setPrototypeOf(o, p) {
                return (_setPrototypeOf = Object.setPrototypeOf || function(o, p) {
                    o.__proto__ = p;
                    return o;
                })(o, p);
            }
            function _inheritsLoose(subClass, superClass) {
                subClass.prototype = Object.create(superClass.prototype);
                subClass.prototype.constructor = subClass;
                _setPrototypeOf(subClass, superClass);
            }
            function _extends() {
                return (_extends = Object.assign || function(target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) ({}).hasOwnProperty.call(source, key) && (target[key] = source[key]);
                    }
                    return target;
                }).apply(this, arguments);
            }
            function utils_isPromise(item) {
                try {
                    if (!item) return !1;
                    if ("undefined" != typeof Promise && item instanceof Promise) return !0;
                    if ("undefined" != typeof window && "function" == typeof window.Window && item instanceof window.Window) return !1;
                    if ("undefined" != typeof window && "function" == typeof window.constructor && item instanceof window.constructor) return !1;
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
            var dispatchedErrors = [];
            var possiblyUnhandledPromiseHandlers = [];
            var activeCount = 0;
            var flushPromise;
            function flushActive() {
                if (!activeCount && flushPromise) {
                    var promise = flushPromise;
                    flushPromise = null;
                    promise.resolve();
                }
            }
            function startActive() {
                activeCount += 1;
            }
            function endActive() {
                activeCount -= 1;
                flushActive();
            }
            var promise_ZalgoPromise = function() {
                function ZalgoPromise(handler) {
                    var _this = this;
                    this.resolved = void 0;
                    this.rejected = void 0;
                    this.errorHandled = void 0;
                    this.value = void 0;
                    this.error = void 0;
                    this.handlers = void 0;
                    this.dispatching = void 0;
                    this.stack = void 0;
                    this.resolved = !1;
                    this.rejected = !1;
                    this.errorHandled = !1;
                    this.handlers = [];
                    if (handler) {
                        var _result;
                        var _error;
                        var resolved = !1;
                        var rejected = !1;
                        var isAsync = !1;
                        startActive();
                        try {
                            handler((function(res) {
                                if (isAsync) _this.resolve(res); else {
                                    resolved = !0;
                                    _result = res;
                                }
                            }), (function(err) {
                                if (isAsync) _this.reject(err); else {
                                    rejected = !0;
                                    _error = err;
                                }
                            }));
                        } catch (err) {
                            endActive();
                            this.reject(err);
                            return;
                        }
                        endActive();
                        isAsync = !0;
                        resolved ? this.resolve(_result) : rejected && this.reject(_error);
                    }
                    if ("undefined" == typeof window || !("__DEBUG__" in window) || window.__DEBUG__) try {
                        throw new Error("ZalgoPromise");
                    } catch (err) {
                        this.stack = err.stack;
                    }
                }
                var _proto = ZalgoPromise.prototype;
                _proto.resolve = function(result) {
                    if (this.resolved || this.rejected) return this;
                    if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                    this.resolved = !0;
                    this.value = result;
                    this.dispatch();
                    return this;
                };
                _proto.reject = function(error) {
                    var _this2 = this;
                    if (this.resolved || this.rejected) return this;
                    if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                    if (!error) {
                        var _err = error && "function" == typeof error.toString ? error.toString() : {}.toString.call(error);
                        error = new Error("Expected reject to be called with Error, got " + _err);
                    }
                    this.rejected = !0;
                    this.error = error;
                    this.errorHandled || setTimeout((function() {
                        _this2.errorHandled || function(err, promise) {
                            if (-1 === dispatchedErrors.indexOf(err)) {
                                dispatchedErrors.push(err);
                                setTimeout((function() {
                                    if ("undefined" == typeof window || !("__DEBUG__" in window) || window.__DEBUG__) throw new Error((err.stack || err.toString()) + "\n\nFrom promise:\n\n" + promise.stack);
                                    throw err;
                                }), 1);
                                for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err, promise);
                            }
                        }(error, _this2);
                    }), 1);
                    this.dispatch();
                    return this;
                };
                _proto.asyncReject = function(error) {
                    this.errorHandled = !0;
                    this.reject(error);
                    return this;
                };
                _proto.dispatch = function() {
                    var resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                    if (!this.dispatching && (resolved || rejected)) {
                        this.dispatching = !0;
                        startActive();
                        var chain = function(firstPromise, secondPromise) {
                            return firstPromise.then((function(res) {
                                secondPromise.resolve(res);
                            }), (function(err) {
                                secondPromise.reject(err);
                            }));
                        };
                        for (var i = 0; i < handlers.length; i++) {
                            var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise;
                            var _result2 = void 0;
                            if (resolved) try {
                                _result2 = onSuccess ? onSuccess(this.value) : this.value;
                            } catch (err) {
                                promise.reject(err);
                                continue;
                            } else if (rejected) {
                                if (!onError) {
                                    promise.reject(this.error);
                                    continue;
                                }
                                try {
                                    _result2 = onError(this.error);
                                } catch (err) {
                                    promise.reject(err);
                                    continue;
                                }
                            }
                            if (_result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected)) {
                                var promiseResult = _result2;
                                promiseResult.resolved ? promise.resolve(promiseResult.value) : promise.reject(promiseResult.error);
                                promiseResult.errorHandled = !0;
                            } else utils_isPromise(_result2) ? _result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected) ? _result2.resolved ? promise.resolve(_result2.value) : promise.reject(_result2.error) : chain(_result2, promise) : promise.resolve(_result2);
                        }
                        handlers.length = 0;
                        this.dispatching = !1;
                        endActive();
                    }
                };
                _proto.then = function(onSuccess, onError) {
                    if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                    if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                    var promise = new ZalgoPromise;
                    this.handlers.push({
                        promise: promise,
                        onSuccess: onSuccess,
                        onError: onError
                    });
                    this.errorHandled = !0;
                    this.dispatch();
                    return promise;
                };
                _proto.catch = function(onError) {
                    return this.then(void 0, onError);
                };
                _proto.finally = function(onFinally) {
                    if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
                    return this.then((function(result) {
                        return ZalgoPromise.try(onFinally).then((function() {
                            return result;
                        }));
                    }), (function(err) {
                        return ZalgoPromise.try(onFinally).then((function() {
                            throw err;
                        }));
                    }));
                };
                _proto.timeout = function(time, err) {
                    var _this3 = this;
                    if (this.resolved || this.rejected) return this;
                    var timeout = setTimeout((function() {
                        _this3.resolved || _this3.rejected || _this3.reject(err || new Error("Promise timed out after " + time + "ms"));
                    }), time);
                    return this.then((function(result) {
                        clearTimeout(timeout);
                        return result;
                    }));
                };
                _proto.toPromise = function() {
                    if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                    return Promise.resolve(this);
                };
                _proto.lazy = function() {
                    this.errorHandled = !0;
                    return this;
                };
                ZalgoPromise.resolve = function(value) {
                    return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise((function(resolve, reject) {
                        return value.then(resolve, reject);
                    })) : (new ZalgoPromise).resolve(value);
                };
                ZalgoPromise.reject = function(error) {
                    return (new ZalgoPromise).reject(error);
                };
                ZalgoPromise.asyncReject = function(error) {
                    return (new ZalgoPromise).asyncReject(error);
                };
                ZalgoPromise.all = function(promises) {
                    var promise = new ZalgoPromise;
                    var count = promises.length;
                    var results = [].slice();
                    if (!count) {
                        promise.resolve(results);
                        return promise;
                    }
                    var chain = function(i, firstPromise, secondPromise) {
                        return firstPromise.then((function(res) {
                            results[i] = res;
                            0 == (count -= 1) && promise.resolve(results);
                        }), (function(err) {
                            secondPromise.reject(err);
                        }));
                    };
                    for (var i = 0; i < promises.length; i++) {
                        var prom = promises[i];
                        if (prom instanceof ZalgoPromise) {
                            if (prom.resolved) {
                                results[i] = prom.value;
                                count -= 1;
                                continue;
                            }
                        } else if (!utils_isPromise(prom)) {
                            results[i] = prom;
                            count -= 1;
                            continue;
                        }
                        chain(i, ZalgoPromise.resolve(prom), promise);
                    }
                    0 === count && promise.resolve(results);
                    return promise;
                };
                ZalgoPromise.hash = function(promises) {
                    var result = {};
                    var awaitPromises = [];
                    var _loop = function(key) {
                        if (promises.hasOwnProperty(key)) {
                            var value = promises[key];
                            utils_isPromise(value) ? awaitPromises.push(value.then((function(res) {
                                result[key] = res;
                            }))) : result[key] = value;
                        }
                    };
                    for (var key in promises) _loop(key);
                    return ZalgoPromise.all(awaitPromises).then((function() {
                        return result;
                    }));
                };
                ZalgoPromise.map = function(items, method) {
                    return ZalgoPromise.all(items.map(method));
                };
                ZalgoPromise.onPossiblyUnhandledException = function(handler) {
                    return function(handler) {
                        possiblyUnhandledPromiseHandlers.push(handler);
                        return {
                            cancel: function() {
                                possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                            }
                        };
                    }(handler);
                };
                ZalgoPromise.try = function(method, context, args) {
                    if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
                    var result;
                    startActive();
                    try {
                        result = method.apply(context, args || []);
                    } catch (err) {
                        endActive();
                        return ZalgoPromise.reject(err);
                    }
                    endActive();
                    return ZalgoPromise.resolve(result);
                };
                ZalgoPromise.delay = function(_delay) {
                    return new ZalgoPromise((function(resolve) {
                        setTimeout(resolve, _delay);
                    }));
                };
                ZalgoPromise.isPromise = function(value) {
                    return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
                };
                ZalgoPromise.flush = function() {
                    return function(Zalgo) {
                        var promise = flushPromise = flushPromise || new Zalgo;
                        flushActive();
                        return promise;
                    }(ZalgoPromise);
                };
                return ZalgoPromise;
            }();
            var IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
            function getActualProtocol(win) {
                void 0 === win && (win = window);
                return win.location.protocol;
            }
            function getProtocol(win) {
                void 0 === win && (win = window);
                if (win.mockDomain) {
                    var protocol = win.mockDomain.split("//")[0];
                    if (protocol) return protocol;
                }
                return getActualProtocol(win);
            }
            function isAboutProtocol(win) {
                void 0 === win && (win = window);
                return "about:" === getProtocol(win);
            }
            function canReadFromWindow(win) {
                try {
                    return !0;
                } catch (err) {}
                return !1;
            }
            function getActualDomain(win) {
                void 0 === win && (win = window);
                var location = win.location;
                if (!location) throw new Error("Can not read window location");
                var protocol = getActualProtocol(win);
                if (!protocol) throw new Error("Can not read window protocol");
                if ("file:" === protocol) return "file://";
                if ("about:" === protocol) {
                    var parent = function(win) {
                        void 0 === win && (win = window);
                        if (win) try {
                            if (win.parent && win.parent !== win) return win.parent;
                        } catch (err) {}
                    }(win);
                    return parent && canReadFromWindow() ? getActualDomain(parent) : "about://";
                }
                var host = location.host;
                if (!host) throw new Error("Can not read window host");
                return protocol + "//" + host;
            }
            function getDomain(win) {
                void 0 === win && (win = window);
                var domain = getActualDomain(win);
                return domain && win.mockDomain && 0 === win.mockDomain.indexOf("mock:") ? win.mockDomain : domain;
            }
            function isSameDomain(win) {
                if (!function(win) {
                    try {
                        if (win === window) return !0;
                    } catch (err) {}
                    try {
                        var desc = Object.getOwnPropertyDescriptor(win, "location");
                        if (desc && !1 === desc.enumerable) return !1;
                    } catch (err) {}
                    try {
                        if (isAboutProtocol(win) && canReadFromWindow()) return !0;
                    } catch (err) {}
                    try {
                        if (function(win) {
                            void 0 === win && (win = window);
                            return "mock:" === getProtocol(win);
                        }(win) && canReadFromWindow()) return !0;
                    } catch (err) {}
                    try {
                        if (getActualDomain(win) === getActualDomain(window)) return !0;
                    } catch (err) {}
                    return !1;
                }(win)) return !1;
                try {
                    if (win === window) return !0;
                    if (isAboutProtocol(win) && canReadFromWindow()) return !0;
                    if (getDomain(window) === getDomain(win)) return !0;
                } catch (err) {}
                return !1;
            }
            var iframeWindows = [];
            var iframeFrames = [];
            function isWindowClosed(win, allowMock) {
                void 0 === allowMock && (allowMock = !0);
                try {
                    if (win === window) return !1;
                } catch (err) {
                    return !0;
                }
                try {
                    if (!win) return !0;
                } catch (err) {
                    return !0;
                }
                try {
                    if (win.closed) return !0;
                } catch (err) {
                    return !err || err.message !== IE_WIN_ACCESS_ERROR;
                }
                if (allowMock && isSameDomain(win)) try {
                    if (win.mockclosed) return !0;
                } catch (err) {}
                try {
                    if (!win.parent || !win.top) return !0;
                } catch (err) {}
                var iframeIndex = function(collection, item) {
                    for (var i = 0; i < collection.length; i++) try {
                        if (collection[i] === item) return i;
                    } catch (err) {}
                    return -1;
                }(iframeWindows, win);
                if (-1 !== iframeIndex) {
                    var frame = iframeFrames[iframeIndex];
                    if (frame && function(frame) {
                        if (!frame.contentWindow) return !0;
                        if (!frame.parentNode) return !0;
                        var doc = frame.ownerDocument;
                        if (doc && doc.documentElement && !doc.documentElement.contains(frame)) {
                            var parent = frame;
                            for (;parent.parentNode && parent.parentNode !== parent; ) parent = parent.parentNode;
                            if (!parent.host || !doc.documentElement.contains(parent.host)) return !0;
                        }
                        return !1;
                    }(frame)) return !0;
                }
                return !1;
            }
            function isWindow(obj) {
                try {
                    if (obj === window) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if ("[object Window]" === {}.toString.call(obj)) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if (window.Window && obj instanceof window.Window) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if (obj && obj.self === obj) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if (obj && obj.parent === obj) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if (obj && obj.top === obj) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if (obj && "__unlikely_value__" === obj.__cross_domain_utils_window_check__) return !1;
                } catch (err) {
                    return !0;
                }
                try {
                    if ("postMessage" in obj && "self" in obj && "location" in obj) return !0;
                } catch (err) {}
                return !1;
            }
            function util_safeIndexOf(collection, item) {
                for (var i = 0; i < collection.length; i++) try {
                    if (collection[i] === item) return i;
                } catch (err) {}
                return -1;
            }
            var weakmap_CrossDomainSafeWeakMap = function() {
                function CrossDomainSafeWeakMap() {
                    this.name = void 0;
                    this.weakmap = void 0;
                    this.keys = void 0;
                    this.values = void 0;
                    this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__";
                    if (function() {
                        if ("undefined" == typeof WeakMap) return !1;
                        if (void 0 === Object.freeze) return !1;
                        try {
                            var testWeakMap = new WeakMap;
                            var testKey = {};
                            Object.freeze(testKey);
                            testWeakMap.set(testKey, "__testvalue__");
                            return "__testvalue__" === testWeakMap.get(testKey);
                        } catch (err) {
                            return !1;
                        }
                    }()) try {
                        this.weakmap = new WeakMap;
                    } catch (err) {}
                    this.keys = [];
                    this.values = [];
                }
                var _proto = CrossDomainSafeWeakMap.prototype;
                _proto._cleanupClosedWindows = function() {
                    var weakmap = this.weakmap;
                    var keys = this.keys;
                    for (var i = 0; i < keys.length; i++) {
                        var value = keys[i];
                        if (isWindow(value) && isWindowClosed(value)) {
                            if (weakmap) try {
                                weakmap.delete(value);
                            } catch (err) {}
                            keys.splice(i, 1);
                            this.values.splice(i, 1);
                            i -= 1;
                        }
                    }
                };
                _proto.isSafeToReadWrite = function(key) {
                    return !isWindow(key);
                };
                _proto.set = function(key, value) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        weakmap.set(key, value);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) try {
                        var name = this.name;
                        var entry = key[name];
                        entry && entry[0] === key ? entry[1] = value : Object.defineProperty(key, name, {
                            value: [ key, value ],
                            writable: !0
                        });
                        return;
                    } catch (err) {}
                    this._cleanupClosedWindows();
                    var keys = this.keys;
                    var values = this.values;
                    var index = util_safeIndexOf(keys, key);
                    if (-1 === index) {
                        keys.push(key);
                        values.push(value);
                    } else values[index] = value;
                };
                _proto.get = function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        if (weakmap.has(key)) return weakmap.get(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) try {
                        var entry = key[this.name];
                        return entry && entry[0] === key ? entry[1] : void 0;
                    } catch (err) {}
                    this._cleanupClosedWindows();
                    var index = util_safeIndexOf(this.keys, key);
                    if (-1 !== index) return this.values[index];
                };
                _proto.delete = function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        weakmap.delete(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) try {
                        var entry = key[this.name];
                        entry && entry[0] === key && (entry[0] = entry[1] = void 0);
                    } catch (err) {}
                    this._cleanupClosedWindows();
                    var keys = this.keys;
                    var index = util_safeIndexOf(keys, key);
                    if (-1 !== index) {
                        keys.splice(index, 1);
                        this.values.splice(index, 1);
                    }
                };
                _proto.has = function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        if (weakmap.has(key)) return !0;
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) try {
                        var entry = key[this.name];
                        return !(!entry || entry[0] !== key);
                    } catch (err) {}
                    this._cleanupClosedWindows();
                    return -1 !== util_safeIndexOf(this.keys, key);
                };
                _proto.getOrSet = function(key, getter) {
                    if (this.has(key)) return this.get(key);
                    var value = getter();
                    this.set(key, value);
                    return value;
                };
                return CrossDomainSafeWeakMap;
            }();
            function _getPrototypeOf(o) {
                return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                })(o);
            }
            function _isNativeReflectConstruct() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    Date.prototype.toString.call(Reflect.construct(Date, [], (function() {})));
                    return !0;
                } catch (e) {
                    return !1;
                }
            }
            function construct_construct(Parent, args, Class) {
                return (construct_construct = _isNativeReflectConstruct() ? Reflect.construct : function(Parent, args, Class) {
                    var a = [ null ];
                    a.push.apply(a, args);
                    var instance = new (Function.bind.apply(Parent, a));
                    Class && _setPrototypeOf(instance, Class.prototype);
                    return instance;
                }).apply(null, arguments);
            }
            function wrapNativeSuper_wrapNativeSuper(Class) {
                var _cache = "function" == typeof Map ? new Map : void 0;
                return (wrapNativeSuper_wrapNativeSuper = function(Class) {
                    if (null === Class || !(fn = Class, -1 !== Function.toString.call(fn).indexOf("[native code]"))) return Class;
                    var fn;
                    if ("function" != typeof Class) throw new TypeError("Super expression must either be null or a function");
                    if (void 0 !== _cache) {
                        if (_cache.has(Class)) return _cache.get(Class);
                        _cache.set(Class, Wrapper);
                    }
                    function Wrapper() {
                        return construct_construct(Class, arguments, _getPrototypeOf(this).constructor);
                    }
                    Wrapper.prototype = Object.create(Class.prototype, {
                        constructor: {
                            value: Wrapper,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    });
                    return _setPrototypeOf(Wrapper, Class);
                })(Class);
            }
            function getFunctionName(fn) {
                return fn.name || fn.__name__ || fn.displayName || "anonymous";
            }
            function setFunctionName(fn, name) {
                try {
                    delete fn.name;
                    fn.name = name;
                } catch (err) {}
                fn.__name__ = fn.displayName = name;
                return fn;
            }
            function base64encode(str) {
                if ("function" == typeof btoa) return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function(m, p1) {
                    return String.fromCharCode(parseInt(p1, 16));
                }))).replace(/[=]/g, "");
                if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64").replace(/[=]/g, "");
                throw new Error("Can not find window.btoa or Buffer");
            }
            function uniqueID() {
                var chars = "0123456789abcdef";
                return "uid_" + "xxxxxxxxxx".replace(/./g, (function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                })) + "_" + base64encode((new Date).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            }
            function getGlobal() {
                if ("undefined" != typeof window) return window;
                if ("undefined" != typeof window) return window;
                if ("undefined" != typeof global) return global;
                throw new Error("No global found");
            }
            var objectIDs;
            function serializeArgs(args) {
                try {
                    return JSON.stringify([].slice.call(args), (function(subkey, val) {
                        return "function" == typeof val ? "memoize[" + function(obj) {
                            objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap;
                            if (null == obj || "object" != typeof obj && "function" != typeof obj) throw new Error("Invalid object");
                            var uid = objectIDs.get(obj);
                            if (!uid) {
                                uid = typeof obj + ":" + uniqueID();
                                objectIDs.set(obj, uid);
                            }
                            return uid;
                        }(val) + "]" : function(element) {
                            var passed = !1;
                            try {
                                (element instanceof window.Element || null !== element && "object" == typeof element && 1 === element.nodeType && "object" == typeof element.style && "object" == typeof element.ownerDocument) && (passed = !0);
                            } catch (_) {}
                            return passed;
                        }(val) ? {} : val;
                    }));
                } catch (err) {
                    throw new Error("Arguments not serializable -- can not be used to memoize");
                }
            }
            function getEmptyObject() {
                return {};
            }
            var memoizeGlobalIndex = 0;
            var memoizeGlobalIndexValidFrom = 0;
            function memoize(method, options) {
                void 0 === options && (options = {});
                var _options$thisNamespac = options.thisNamespace, thisNamespace = void 0 !== _options$thisNamespac && _options$thisNamespac, cacheTime = options.time;
                var simpleCache;
                var thisCache;
                var memoizeIndex = memoizeGlobalIndex;
                memoizeGlobalIndex += 1;
                var memoizedFunction = function() {
                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    if (memoizeIndex < memoizeGlobalIndexValidFrom) {
                        simpleCache = null;
                        thisCache = null;
                        memoizeIndex = memoizeGlobalIndex;
                        memoizeGlobalIndex += 1;
                    }
                    var cache;
                    cache = thisNamespace ? (thisCache = thisCache || new weakmap_CrossDomainSafeWeakMap).getOrSet(this, getEmptyObject) : simpleCache = simpleCache || {};
                    var cacheKey;
                    try {
                        cacheKey = serializeArgs(args);
                    } catch (_unused) {
                        return method.apply(this, arguments);
                    }
                    var cacheResult = cache[cacheKey];
                    if (cacheResult && cacheTime && Date.now() - cacheResult.time < cacheTime) {
                        delete cache[cacheKey];
                        cacheResult = null;
                    }
                    if (cacheResult) return cacheResult.value;
                    var time = Date.now();
                    var value = method.apply(this, arguments);
                    cache[cacheKey] = {
                        time: time,
                        value: value
                    };
                    return value;
                };
                memoizedFunction.reset = function() {
                    simpleCache = null;
                    thisCache = null;
                };
                return setFunctionName(memoizedFunction, (options.name || getFunctionName(method)) + "::memoized");
            }
            memoize.clear = function() {
                memoizeGlobalIndexValidFrom = memoizeGlobalIndex;
            };
            function inlineMemoize(method, logic, args) {
                void 0 === args && (args = []);
                var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {};
                var key = serializeArgs(args);
                return cache.hasOwnProperty(key) ? cache[key] : cache[key] = logic.apply(void 0, args);
            }
            function src_util_noop() {}
            function stringifyError(err, level) {
                void 0 === level && (level = 1);
                if (level >= 3) return "stringifyError stack overflow";
                try {
                    if (!err) return "<unknown error: " + {}.toString.call(err) + ">";
                    if ("string" == typeof err) return err;
                    if (err instanceof Error) {
                        var stack = err && err.stack;
                        var message = err && err.message;
                        if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                        if (stack) return stack;
                        if (message) return message;
                    }
                    return err && err.toString && "function" == typeof err.toString ? err.toString() : {}.toString.call(err);
                } catch (newErr) {
                    return "Error while stringifying error: " + stringifyError(newErr, level + 1);
                }
            }
            function util_values(obj) {
                if (Object.values) return Object.values(obj);
                var result = [];
                for (var key in obj) obj.hasOwnProperty(key) && result.push(obj[key]);
                return result;
            }
            memoize(util_values);
            function objFilter(obj, filter) {
                void 0 === filter && (filter = Boolean);
                var result = {};
                for (var key in obj) obj.hasOwnProperty(key) && filter(obj[key], key) && (result[key] = obj[key]);
                return result;
            }
            var util_ExtendableError = function(_Error) {
                _inheritsLoose(ExtendableError, _Error);
                function ExtendableError(message) {
                    var _this6;
                    (_this6 = _Error.call(this, message) || this).name = _this6.constructor.name;
                    "function" == typeof Error.captureStackTrace ? Error.captureStackTrace(function(self) {
                        if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return self;
                    }(_this6), _this6.constructor) : _this6.stack = new Error(message).stack;
                    return _this6;
                }
                return ExtendableError;
            }(wrapNativeSuper_wrapNativeSuper(Error));
            function isDocumentReady() {
                return Boolean(document.body) && "complete" === document.readyState;
            }
            function isDocumentInteractive() {
                return Boolean(document.body) && "interactive" === document.readyState;
            }
            function urlEncode(str) {
                return encodeURIComponent(str);
            }
            function waitForWindowReady() {
                return inlineMemoize(waitForWindowReady, (function() {
                    return new promise_ZalgoPromise((function(resolve) {
                        isDocumentReady() && resolve();
                        window.addEventListener("load", (function() {
                            return resolve();
                        }));
                    }));
                }));
            }
            memoize((function() {
                return new promise_ZalgoPromise((function(resolve) {
                    if (isDocumentReady() || isDocumentInteractive()) return resolve();
                    var interval = setInterval((function() {
                        if (isDocumentReady() || isDocumentInteractive()) {
                            clearInterval(interval);
                            return resolve();
                        }
                    }), 10);
                }));
            }));
            function parseQuery(queryString) {
                return inlineMemoize(parseQuery, (function() {
                    var params = {};
                    if (!queryString) return params;
                    if (-1 === queryString.indexOf("=")) return params;
                    for (var _i2 = 0, _queryString$split2 = queryString.split("&"); _i2 < _queryString$split2.length; _i2++) {
                        var pair = _queryString$split2[_i2];
                        (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
                    }
                    return params;
                }), [ queryString ]);
            }
            function extendQuery(originalQuery, props) {
                void 0 === props && (props = {});
                return props && Object.keys(props).length ? function(obj) {
                    void 0 === obj && (obj = {});
                    return Object.keys(obj).filter((function(key) {
                        return "string" == typeof obj[key] || "boolean" == typeof obj[key];
                    })).map((function(key) {
                        var val = obj[key];
                        if ("string" != typeof val && "boolean" != typeof val) throw new TypeError("Invalid type for query");
                        return urlEncode(key) + "=" + urlEncode(val.toString());
                    })).join("&");
                }(_extends({}, parseQuery(originalQuery), props)) : originalQuery;
            }
            function getPerformance() {
                return inlineMemoize(getPerformance, (function() {
                    var performance = window.performance;
                    if (performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0) return performance;
                }));
            }
            function dom_isBrowser() {
                return "undefined" != typeof window && void 0 !== window.location;
            }
            function getScript(_ref) {
                var _ref$host = _ref.host, host = void 0 === _ref$host ? window.location.host : _ref$host, path = _ref.path, _ref$reverse = _ref.reverse, reverse = void 0 !== _ref$reverse && _ref$reverse;
                return inlineMemoize(getScript, (function() {
                    var url = "" + host + path;
                    var scripts = [].slice.call(document.getElementsByTagName("script"));
                    reverse && scripts.reverse();
                    for (var _i4 = 0; _i4 < scripts.length; _i4++) {
                        var script = scripts[_i4];
                        if (script.src && script.src.replace(/^https?:\/\//, "").split("?")[0] === url) return script;
                    }
                }), [ path ]);
            }
            function isLocalStorageEnabled() {
                return inlineMemoize(isLocalStorageEnabled, (function() {
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
                }));
            }
            function getBrowserLocales() {
                var nav = window.navigator;
                var locales = nav.languages ? [].concat(nav.languages) : [];
                nav.language && locales.push(nav.language);
                nav.userLanguage && locales.push(nav.userLanguage);
                return locales.map((function(locale) {
                    if (locale && locale.match(/^[a-z]{2}[-_][A-Z]{2}$/)) {
                        var _locale$split = locale.split(/[-_]/);
                        return {
                            country: _locale$split[1],
                            lang: _locale$split[0]
                        };
                    }
                    return locale && locale.match(/^[a-z]{2}$/) ? {
                        lang: locale
                    } : null;
                })).filter(Boolean);
            }
            _inheritsLoose((function() {
                return _ExtendableError.apply(this, arguments) || this;
            }), _ExtendableError = util_ExtendableError);
            var _ExtendableError;
            var currentScript = "undefined" != typeof document ? document.currentScript : null;
            var getCurrentScript = memoize((function() {
                if (currentScript) return currentScript;
                if (currentScript = function() {
                    try {
                        var stack = function() {
                            try {
                                throw new Error("_");
                            } catch (err) {
                                return err.stack || "";
                            }
                        }();
                        var stackDetails = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(stack);
                        var scriptLocation = stackDetails && stackDetails[1];
                        if (!scriptLocation) return;
                        for (var _i22 = 0, _Array$prototype$slic2 = [].slice.call(document.getElementsByTagName("script")).reverse(); _i22 < _Array$prototype$slic2.length; _i22++) {
                            var script = _Array$prototype$slic2[_i22];
                            if (script.src && script.src === scriptLocation) return script;
                        }
                    } catch (err) {}
                }()) return currentScript;
                throw new Error("Can not determine current script");
            }));
            var currentUID = uniqueID();
            var getCurrentScriptUID = memoize((function() {
                var script;
                try {
                    script = getCurrentScript();
                } catch (err) {
                    return currentUID;
                }
                var uid = script.getAttribute("data-uid");
                if (uid && "string" == typeof uid) return uid;
                if ((uid = script.getAttribute("data-uid-auto")) && "string" == typeof uid) return uid;
                if (script.src) {
                    var hashedString = function(str) {
                        var hash = "";
                        for (var i = 0; i < str.length; i++) {
                            var total = str[i].charCodeAt(0) * i;
                            str[i + 1] && (total += str[i + 1].charCodeAt(0) * (i - 1));
                            hash += String.fromCharCode(97 + Math.abs(total) % 26);
                        }
                        return hash;
                    }(JSON.stringify({
                        src: script.src,
                        dataset: script.dataset
                    }));
                    uid = "uid_" + hashedString.slice(hashedString.length - 30);
                } else uid = uniqueID();
                script.setAttribute("data-uid-auto", uid);
                return uid;
            }));
            function getStorage(_ref) {
                var name = _ref.name, _ref$lifetime = _ref.lifetime, lifetime = void 0 === _ref$lifetime ? 12e5 : _ref$lifetime;
                return inlineMemoize(getStorage, (function() {
                    var STORAGE_KEY = "__" + name + "_storage__";
                    var newStateID = uniqueID();
                    var accessedStorage;
                    function getState(handler) {
                        var localStorageEnabled = isLocalStorageEnabled();
                        var storage;
                        accessedStorage && (storage = accessedStorage);
                        if (!storage && localStorageEnabled) {
                            var rawStorage = window.localStorage.getItem(STORAGE_KEY);
                            rawStorage && (storage = JSON.parse(rawStorage));
                        }
                        storage || (storage = getGlobal()[STORAGE_KEY]);
                        storage || (storage = {
                            id: newStateID
                        });
                        storage.id || (storage.id = newStateID);
                        accessedStorage = storage;
                        var result = handler(storage);
                        localStorageEnabled ? window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage)) : getGlobal()[STORAGE_KEY] = storage;
                        accessedStorage = null;
                        return result;
                    }
                    function getID() {
                        return getState((function(storage) {
                            return storage.id;
                        }));
                    }
                    function getSession(handler) {
                        return getState((function(storage) {
                            var session = storage.__session__;
                            var now = Date.now();
                            session && now - session.created > lifetime && (session = null);
                            session || (session = {
                                guid: uniqueID(),
                                created: now
                            });
                            storage.__session__ = session;
                            return handler(session);
                        }));
                    }
                    return {
                        getState: getState,
                        getID: getID,
                        isStateFresh: function() {
                            return getID() === newStateID;
                        },
                        getSessionState: function(handler) {
                            return getSession((function(session) {
                                session.state = session.state || {};
                                return handler(session.state);
                            }));
                        },
                        getSessionID: function() {
                            return getSession((function(session) {
                                return session.guid;
                            }));
                        }
                    };
                }), [ {
                    name: name,
                    lifetime: lifetime
                } ]);
            }
            function getBelterExperimentStorage() {
                return getStorage({
                    name: "belter_experiment"
                });
            }
            function isEventUnique(name) {
                return getBelterExperimentStorage().getSessionState((function(state) {
                    state.loggedBeacons = state.loggedBeacons || [];
                    if (-1 === state.loggedBeacons.indexOf(name)) {
                        state.loggedBeacons.push(name);
                        return !0;
                    }
                    return !1;
                }));
            }
            function getRandomInteger(range) {
                return Math.floor(Math.random() * range);
            }
            var http_headerBuilders = [];
            function request(_ref) {
                var url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, _ref$headers = _ref.headers, headers = void 0 === _ref$headers ? {} : _ref$headers, json = _ref.json, data = _ref.data, body = _ref.body, _ref$win = _ref.win, win = void 0 === _ref$win ? window : _ref$win, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 0 : _ref$timeout;
                return new promise_ZalgoPromise((function(resolve, reject) {
                    if (json && data || json && body || data && json) throw new Error("Only options.json or options.data or options.body should be passed");
                    var normalizedHeaders = {};
                    for (var _i4 = 0, _Object$keys2 = Object.keys(headers); _i4 < _Object$keys2.length; _i4++) {
                        var _key2 = _Object$keys2[_i4];
                        normalizedHeaders[_key2.toLowerCase()] = headers[_key2];
                    }
                    json ? normalizedHeaders["content-type"] = normalizedHeaders["content-type"] || "application/json" : (data || body) && (normalizedHeaders["content-type"] = normalizedHeaders["content-type"] || "application/x-www-form-urlencoded; charset=utf-8");
                    normalizedHeaders.accept = normalizedHeaders.accept || "application/json";
                    for (var _i6 = 0; _i6 < http_headerBuilders.length; _i6++) {
                        var builtHeaders = (0, http_headerBuilders[_i6])();
                        for (var _i8 = 0, _Object$keys4 = Object.keys(builtHeaders); _i8 < _Object$keys4.length; _i8++) {
                            var _key3 = _Object$keys4[_i8];
                            normalizedHeaders[_key3.toLowerCase()] = builtHeaders[_key3];
                        }
                    }
                    var xhr = new win.XMLHttpRequest;
                    xhr.addEventListener("load", (function() {
                        var responseHeaders = function(rawHeaders) {
                            void 0 === rawHeaders && (rawHeaders = "");
                            var result = {};
                            for (var _i2 = 0, _rawHeaders$trim$spli2 = rawHeaders.trim().split("\n"); _i2 < _rawHeaders$trim$spli2.length; _i2++) {
                                var _line$split = _rawHeaders$trim$spli2[_i2].split(":"), _key = _line$split[0], values = _line$split.slice(1);
                                result[_key.toLowerCase()] = values.join(":").trim();
                            }
                            return result;
                        }(this.getAllResponseHeaders());
                        if (!this.status) return reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: no response status code."));
                        var contentType = responseHeaders["content-type"];
                        var isJSON = contentType && (0 === contentType.indexOf("application/json") || 0 === contentType.indexOf("text/json"));
                        var responseBody = this.responseText;
                        try {
                            responseBody = JSON.parse(responseBody);
                        } catch (err) {
                            if (isJSON) return reject(new Error("Invalid json: " + this.responseText + "."));
                        }
                        return resolve({
                            status: this.status,
                            headers: responseHeaders,
                            body: responseBody
                        });
                    }), !1);
                    xhr.addEventListener("error", (function(evt) {
                        reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString() + "."));
                    }), !1);
                    xhr.open(method, url, !0);
                    for (var _key4 in normalizedHeaders) normalizedHeaders.hasOwnProperty(_key4) && xhr.setRequestHeader(_key4, normalizedHeaders[_key4]);
                    json ? body = JSON.stringify(json) : data && (body = Object.keys(data).map((function(key) {
                        return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : "");
                    })).join("&"));
                    xhr.timeout = timeout;
                    xhr.ontimeout = function() {
                        reject(new Error("Request to " + method.toLowerCase() + " " + url + " has timed out"));
                    };
                    xhr.send(body);
                }));
            }
            var COUNTRY = {
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
            };
            var LANG = {
                AR: "ar",
                BG: "bg",
                CS: "cs",
                DA: "da",
                DE: "de",
                EL: "el",
                EN: "en",
                ES: "es",
                ET: "et",
                FI: "fi",
                FR: "fr",
                HE: "he",
                HU: "hu",
                ID: "id",
                IT: "it",
                JA: "ja",
                KO: "ko",
                LT: "lt",
                LV: "lv",
                MS: "ms",
                NL: "nl",
                NO: "no",
                PL: "pl",
                PT: "pt",
                RO: "ro",
                RU: "ru",
                SI: "si",
                SK: "sk",
                SL: "sl",
                SQ: "sq",
                SV: "sv",
                TH: "th",
                TL: "tl",
                TR: "tr",
                VI: "vi",
                ZH: "zh",
                ZH_HANT: "zh_Hant"
            };
            var COUNTRY_LANGS = {
                AD: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                AE: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR ],
                AG: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                AI: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                AL: [ LANG.SQ, LANG.EN ],
                AM: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                AN: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                AO: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                AR: [ LANG.ES, LANG.EN ],
                AT: [ LANG.DE, LANG.EN ],
                AU: [ LANG.EN ],
                AW: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                AZ: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                BA: [ LANG.EN ],
                BB: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                BE: [ LANG.EN, LANG.NL, LANG.FR ],
                BF: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                BG: [ LANG.BG, LANG.EN ],
                BH: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                BI: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                BJ: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                BM: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                BN: [ LANG.MS, LANG.EN ],
                BO: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
                BR: [ LANG.PT, LANG.EN ],
                BS: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                BT: [ LANG.EN ],
                BW: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                BY: [ LANG.EN ],
                BZ: [ LANG.EN, LANG.ES, LANG.FR, LANG.ZH ],
                CA: [ LANG.EN, LANG.FR ],
                CD: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                CG: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                CH: [ LANG.DE, LANG.FR, LANG.EN ],
                CI: [ LANG.FR, LANG.EN ],
                CK: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                CL: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
                CM: [ LANG.FR, LANG.EN ],
                CN: [ LANG.ZH ],
                CO: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
                CR: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
                CV: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                CY: [ LANG.EN ],
                CZ: [ LANG.CS, LANG.EN ],
                DE: [ LANG.DE, LANG.EN ],
                DJ: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                DK: [ LANG.DA, LANG.EN ],
                DM: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                DO: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
                DZ: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                EC: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
                EE: [ LANG.ET, LANG.EN, LANG.RU ],
                EG: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                ER: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                ES: [ LANG.ES, LANG.EN ],
                ET: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                FI: [ LANG.FI, LANG.EN ],
                FJ: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                FK: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                FM: [ LANG.EN ],
                FO: [ LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                FR: [ LANG.FR, LANG.EN ],
                GA: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                GB: [ LANG.EN ],
                GD: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                GE: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                GF: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                GI: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                GL: [ LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                GM: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                GN: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                GP: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                GR: [ LANG.EL, LANG.EN ],
                GT: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
                GW: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                GY: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                HK: [ LANG.EN, LANG.ZH_HANT, LANG.ZH ],
                HN: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
                HR: [ LANG.EN ],
                HU: [ LANG.HU, LANG.EN ],
                ID: [ LANG.ID, LANG.EN ],
                IE: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                IL: [ LANG.HE, LANG.EN ],
                IN: [ LANG.EN ],
                IS: [ LANG.EN ],
                IT: [ LANG.IT, LANG.EN ],
                JM: [ LANG.EN, LANG.ES, LANG.FR, LANG.ZH ],
                JO: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                JP: [ LANG.JA, LANG.EN ],
                KE: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                KG: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                KH: [ LANG.EN ],
                KI: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                KM: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                KN: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                KR: [ LANG.KO, LANG.EN ],
                KW: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                KY: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                KZ: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                LA: [ LANG.EN ],
                LC: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                LI: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                LK: [ LANG.SI, LANG.EN ],
                LS: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                LT: [ LANG.LT, LANG.EN, LANG.RU, LANG.ZH ],
                LU: [ LANG.EN, LANG.DE, LANG.FR, LANG.ES, LANG.ZH ],
                LV: [ LANG.LV, LANG.EN, LANG.RU ],
                MA: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                MC: [ LANG.FR, LANG.EN ],
                MD: [ LANG.EN ],
                ME: [ LANG.EN ],
                MG: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                MH: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                MK: [ LANG.EN ],
                ML: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                MN: [ LANG.EN ],
                MQ: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                MR: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                MS: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                MT: [ LANG.EN ],
                MU: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                MV: [ LANG.EN ],
                MW: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                MX: [ LANG.ES, LANG.EN ],
                MY: [ LANG.MS, LANG.EN ],
                MZ: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                NA: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                NC: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                NE: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                NF: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                NG: [ LANG.EN ],
                NI: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
                NL: [ LANG.NL, LANG.EN ],
                NO: [ LANG.NO, LANG.EN ],
                NP: [ LANG.EN ],
                NR: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                NU: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                NZ: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                OM: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                PA: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
                PE: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
                PF: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                PG: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                PH: [ LANG.TL, LANG.EN ],
                PL: [ LANG.PL, LANG.EN ],
                PM: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                PN: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                PT: [ LANG.PT, LANG.EN ],
                PW: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                PY: [ LANG.ES, LANG.EN ],
                QA: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR ],
                RE: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                RO: [ LANG.RO, LANG.EN ],
                RS: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                RU: [ LANG.RU, LANG.EN ],
                RW: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                SA: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                SB: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                SC: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                SE: [ LANG.SV, LANG.EN ],
                SG: [ LANG.EN ],
                SH: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                SI: [ LANG.SL, LANG.EN ],
                SJ: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                SK: [ LANG.SK, LANG.EN ],
                SL: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                SM: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                SN: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                SO: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                SR: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                ST: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                SV: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
                SZ: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                TC: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                TD: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                TG: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
                TH: [ LANG.TH, LANG.EN ],
                TJ: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                TM: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                TN: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                TO: [ LANG.EN ],
                TR: [ LANG.TR, LANG.EN ],
                TT: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                TV: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                TW: [ LANG.ZH_HANT, LANG.ZH, LANG.EN ],
                TZ: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                UA: [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ],
                UG: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                US: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                UY: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
                VA: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                VC: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                VE: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
                VG: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                VN: [ LANG.VI, LANG.EN ],
                VU: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                WF: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                WS: [ LANG.EN ],
                YE: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                YT: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                ZA: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                ZM: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
                ZW: [ LANG.EN ]
            };
            var PAGE_TYPES = {
                HOME: "home",
                PRODUCT: "product",
                CART: "cart",
                CHECKOUT: "checkout",
                PRODUCT_LISTING: "product-listing",
                SEARCH_RESULTS: "search-results",
                PRODUCT_DETAILS: "product-details",
                MINI_CART: "mini-cart"
            };
            var src_types_TYPES = !0;
            function getSDKHost() {
                return "undefined" != typeof window && "__SDK_HOST__" in window ? window.__SDK_HOST__ : "test.paypal.com";
            }
            function global_getProtocol() {
                return "undefined" != typeof __PROTOCOL__ ? __PROTOCOL__ : "https";
            }
            function getHost() {
                return "undefined" != typeof window && "__HOST__" in window ? window.__HOST__ : "test.paypal.com";
            }
            function getHostName() {
                return "undefined" != typeof window && "__HOSTNAME__" in window ? window.__HOSTNAME__ : "test.paypal.com";
            }
            function getPort() {
                return "undefined" != typeof window && "__PORT__" in window ? window.__PORT__ : 8e3;
            }
            function getPath() {
                return "undefined" != typeof window && "__PATH__" in window ? window.__PATH__ : "/sdk/js";
            }
            function getEnv() {
                return "undefined" != typeof window && "__ENV__" in window ? window.__ENV__ : "test";
            }
            function getPayPalDomain() {
                return "undefined" != typeof window && "__PAYPAL_DOMAIN__" in window ? window.__PAYPAL_DOMAIN__ : "mock://www.paypal.com";
            }
            function getPayPalAPIDomain() {
                return "undefined" != typeof window && "__PAYPAL_API_DOMAIN__" in window ? window.__PAYPAL_API_DOMAIN__ : "mock://msmaster.qa.paypal.com";
            }
            function getDefaultServiceStageHost() {
                if ("undefined" != typeof __SERVICE_STAGE_HOST__ && null !== __SERVICE_STAGE_HOST__) return __SERVICE_STAGE_HOST__;
            }
            function getDefaultStageHost() {
                if (void 0 !== ("undefined" != typeof window && "__STAGE_HOST__" in window ? window.__STAGE_HOST__ : "msmaster.qa.paypal.com") && null !== ("undefined" != typeof window && "__STAGE_HOST__" in window ? window.__STAGE_HOST__ : "msmaster.qa.paypal.com")) return "undefined" != typeof window && "__STAGE_HOST__" in window ? window.__STAGE_HOST__ : "msmaster.qa.paypal.com";
            }
            function getDefaultAPIStageHost() {
                var serviceStageHost = getDefaultServiceStageHost();
                var stageHost = getDefaultStageHost();
                return serviceStageHost || stageHost || void 0;
            }
            function getStageHost() {
                return getDefaultStageHost();
            }
            function getAPIStageHost() {
                var defaultAPIStageHost = getDefaultAPIStageHost();
                if (defaultAPIStageHost) return defaultAPIStageHost.replace("www.", "api.");
            }
            function getVersion() {
                return "undefined" != typeof window && "__VERSION__" in window ? window.__VERSION__ : "1.0.45";
            }
            function getCorrelationID() {
                return "undefined" != typeof window && "__CORRELATION_ID__" in window ? window.__CORRELATION_ID__ : "abc123";
            }
            function getDefaultNamespace() {
                return "undefined" != typeof window && "__NAMESPACE__" in window ? window.__NAMESPACE__ : "paypaltest";
            }
            function getDebug() {
                return "undefined" == typeof window || !("__DEBUG__" in window) || window.__DEBUG__;
            }
            function getComponents() {
                return "undefined" != typeof window && "__COMPONENTS__" in window ? window.__COMPONENTS__ : [ "buttons" ];
            }
            function getFundingEligibility() {
                return __FUNDING_ELIGIBILITY__;
            }
            function getPlatform() {
                return function(userAgent) {
                    void 0 === userAgent && (userAgent = window.navigator.mockUserAgent || window.navigator.userAgent);
                    return !!userAgent.match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i);
                }() ? "mobile" : "desktop";
            }
            function getDisableSetCookie() {
                return __DISABLE_SET_COOKIE__;
            }
            var SUPPORTED_BROWSERS = {
                msie: "11",
                firefox: "30",
                chrome: "27",
                safari: "7",
                opera: "16",
                msedge: "12",
                samsungBrowser: "2.1",
                silk: "59.3",
                ucbrowser: "10.0.0.488",
                vivaldi: "1.91"
            };
            var SANDBOX_ALIAS = "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R";
            var CLIENT_ID_ALIAS = {
                sandbox: SANDBOX_ALIAS,
                sb: SANDBOX_ALIAS,
                test: SANDBOX_ALIAS
            };
            var URI = {
                LOGGER: "/xoplatform/logger/api/logger",
                AUTH: "/v1/oauth2/token",
                ORDER: "/v2/checkout/orders"
            };
            function getComputedLocales(locale) {
                var _locale$split = locale.split("_"), lang = _locale$split[0], country = _locale$split[1];
                lang = LANG[lang.toUpperCase()];
                var countryLangs = COUNTRY_LANGS[country = COUNTRY[country]];
                countryLangs && -1 !== countryLangs.indexOf(LANG.ZH_HANT) && lang === LANG.ZH && (lang = LANG.ZH_HANT);
                return {
                    lang: lang,
                    country: country
                };
            }
            var script_buildScriptNotFoundError = function(host, path, error) {
                var errorString = error ? stringifyError(error) : "";
                return new Error('PayPal Payments SDK script not found on page! Expected to find <script src="https://' + host + path + '">\n\n' + errorString);
            };
            var getSDKScript = memoize((function() {
                if ("undefined" == typeof window || !("__TEST__" in window) || window.__TEST__) {
                    var script = getScript({
                        host: getSDKHost(),
                        path: getPath(),
                        reverse: !0
                    });
                    if (!script) throw script_buildScriptNotFoundError(getSDKHost(), getPath());
                    return script;
                }
                try {
                    return getCurrentScript();
                } catch (error) {
                    throw script_buildScriptNotFoundError(getSDKHost(), getPath(), error);
                }
            }));
            var getSDKAttributes = memoize((function() {
                var result = {};
                for (var _i2 = 0, _sdkScript$attributes2 = getSDKScript().attributes; _i2 < _sdkScript$attributes2.length; _i2++) {
                    var attr = _sdkScript$attributes2[_i2];
                    0 === attr.name.indexOf("data-") && (result[attr.name] = attr.value);
                }
                result["data-uid"] = getCurrentScriptUID();
                return result;
            }));
            function getSDKAttribute(name, def) {
                return getSDKAttributes()[name] || def;
            }
            function getSDKQueryParams() {
                return parseQuery(getSDKScript().src.split("?")[1] || "");
            }
            var getSDKQueryParam = function(name, def) {
                return getSDKQueryParams()[name] || def;
            };
            function getScriptUrl() {
                var src = getSDKScript().getAttribute("src");
                if (!src) throw new Error("Can not find src for sdk script");
                return src;
            }
            function getSDKQueryParamBool(name, def) {
                return "true" === getSDKQueryParam(name, def ? def.toString() : "false");
            }
            function getClientID() {
                var clientID = getSDKQueryParam("client-id");
                if (!clientID) throw new Error("Expected client-id parameter in sdk url");
                return CLIENT_ID_ALIAS[clientID] ? CLIENT_ID_ALIAS[clientID] : clientID;
            }
            function getMerchantID() {
                var merchantIDString = getSDKQueryParam("merchant-id");
                if ("*" === merchantIDString) {
                    var merchantIDAttribute = getSDKAttribute("data-merchant-id");
                    if (!merchantIDAttribute) throw new Error("Must pass data-merchant-id when merchant-id=* passed in url");
                    var merchantID = merchantIDAttribute.split(",");
                    if (merchantID.length <= 1) throw new Error("Must pass multiple merchant ids to data-merchant-id. If passing a single id, pass merchant-id=XYZ in url");
                    if (merchantID.some((function(val, i) {
                        return merchantID && merchantID.indexOf(val) !== i;
                    }))) throw new Error("Duplicates data-merchant-id. Must pass unique merchant ids to data-merchant-id.");
                    return merchantID;
                }
                return merchantIDString ? merchantIDString.split(",") : [];
            }
            function getIntent() {
                return getSDKQueryParam("intent", "capture");
            }
            function getCommit() {
                return getSDKQueryParamBool("commit", (getIntent(), !0));
            }
            function getVault() {
                return getSDKQueryParamBool("vault", !1);
            }
            function getCurrency() {
                return getSDKQueryParam("currency", "USD");
            }
            function getEnableFunding() {
                var funding = getSDKQueryParam("enable-funding");
                return funding ? funding.split(",") : [];
            }
            function getDisableFunding() {
                var funding = getSDKQueryParam("disable-funding");
                return funding ? funding.split(",") : [];
            }
            function getDisableCard() {
                var funding = getSDKQueryParam("disable-card");
                return funding ? funding.split(",") : [];
            }
            function getBuyerCountry() {
                return getSDKQueryParam("buyer-country");
            }
            function getNamespace() {
                return getSDKAttribute("data-namespace") || getDefaultNamespace();
            }
            function getClientToken() {
                return getSDKAttribute("data-client-token");
            }
            function getAmount() {
                var amount = getSDKAttribute("data-amount");
                if (amount && !amount.match(/^\d+\.\d\d$/)) throw new Error("Invalid amount: " + amount);
                return amount;
            }
            function getUserIDToken() {
                return getSDKAttribute("data-user-id-token");
            }
            function getClientAccessToken() {
                var clientToken = getClientToken();
                if (clientToken) return JSON.parse(function(str) {
                    if ("function" == typeof atob) return decodeURIComponent([].map.call(atob(str), (function(c) {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })).join(""));
                    if ("undefined" != typeof Buffer) return Buffer.from(str, "base64").toString("utf8");
                    throw new Error("Can not find window.atob or Buffer");
                }(clientToken)).paypal.accessToken;
            }
            function getPartnerAttributionID() {
                return getSDKAttribute("data-partner-attribution-id");
            }
            function getMerchantRequestedPopupsDisabled() {
                return "true" === getSDKAttribute("data-popups-disabled");
            }
            function getPageType() {
                var pageType = getSDKAttribute("data-page-type", "");
                if (-1 === util_values(PAGE_TYPES).indexOf(pageType.toLowerCase()) && pageType.length) throw new Error("Invalid page type, '" + pageType + "'");
                return pageType.toLowerCase();
            }
            function getLocale() {
                var locale = getSDKQueryParam("locale");
                if (locale) return getComputedLocales(locale);
                var _loop = function() {
                    var _getBrowserLocales2$_ = _getBrowserLocales2[_i4], country = _getBrowserLocales2$_.country, lang = _getBrowserLocales2$_.lang;
                    country = country && COUNTRY[country];
                    lang = lang && LANG[lang.toUpperCase()];
                    if (country && lang && COUNTRY_LANGS[country] && -1 !== COUNTRY_LANGS[country].indexOf(lang)) return {
                        v: {
                            country: country,
                            lang: lang
                        }
                    };
                    if (lang) {
                        var possibleCountries = Object.keys(COUNTRY_LANGS).filter((function(c) {
                            return COUNTRY_LANGS[c].some((function(l) {
                                return l === lang;
                            }));
                        }));
                        if (1 === possibleCountries.length) return {
                            v: {
                                country: possibleCountries[0],
                                lang: lang
                            }
                        };
                    }
                };
                for (var _i4 = 0, _getBrowserLocales2 = getBrowserLocales(); _i4 < _getBrowserLocales2.length; _i4++) {
                    var _ret = _loop();
                    if ("object" == typeof _ret) return _ret.v;
                }
                for (var _i6 = 0, _getBrowserLocales4 = getBrowserLocales(); _i6 < _getBrowserLocales4.length; _i6++) {
                    var country = _getBrowserLocales4[_i6].country;
                    if (COUNTRY_LANGS.hasOwnProperty(country)) return {
                        country: country,
                        lang: COUNTRY_LANGS[country][0]
                    };
                }
                return {
                    lang: LANG.EN,
                    country: COUNTRY.US
                };
            }
            function getCSPNonce() {
                return getSDKAttribute("data-csp-nonce") || "";
            }
            function getEnableThreeDomainSecure() {
                return getSDKAttributes().hasOwnProperty("data-enable-3ds");
            }
            function getSDKIntegrationSource() {
                return getSDKAttribute("data-sdk-integration-source");
            }
            function getUserExperienceFlow() {
                return getSDKAttribute("data-user-experience-flow");
            }
            function isChildWindow() {
                return Boolean(window.xprops);
            }
            function getUserAccessToken() {}
            function getUserAuthCode() {}
            function getCountry() {
                return getLocale().country;
            }
            function getLang() {
                return getLocale().lang;
            }
            function _toPropertyKey(arg) {
                var key = function(input, hint) {
                    if ("object" != typeof input || null === input) return input;
                    var prim = input[Symbol.toPrimitive];
                    if (void 0 !== prim) {
                        var res = prim.call(input, "string");
                        if ("object" != typeof res) return res;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return String(input);
                }(arg);
                return "symbol" == typeof key ? key : String(key);
            }
            function setupSDK(components) {
                var namespace = getNamespace();
                var version = getVersion();
                var existingNamespace = window[namespace];
                if (existingNamespace) {
                    if (!existingNamespace.__internal_destroy__) throw version ? new Error("Attempted to load sdk version " + version + " on page, but window." + namespace + " at version " + (existingNamespace && existingNamespace.version) + ' already loaded.\n\nTo load this sdk alongside the existing version, please specify a different namespace in the script tag, e.g. <script src="https://www.paypal.com/sdk/js?client-id=CLIENT_ID" data-namespace="paypal_sdk"><\/script>, then use the paypal_sdk namespace in place of paypal in your code.') : new Error("Attempted to load sdk version " + version + " on page, but window." + namespace + " already present. Please ensure window." + namespace + " is not previously set before loading the sdk");
                    existingNamespace.__internal_destroy__(new Error("New SDK instance loaded, existing instance destroyed (" + namespace + " / " + version + ")"));
                    delete window[namespace];
                }
                window[namespace] = window[namespace] || {};
                window[namespace].version = version;
                var destroyers = [];
                var _loop = function() {
                    var _components$_i = components[_i2], name = _components$_i.name, requirer = _components$_i.requirer, setupHandler = _components$_i.setupHandler;
                    try {
                        var _requirer = requirer(), setupComponent = _requirer[setupHandler], setup = _requirer.setup, destroy = _requirer.destroy, xports = function(source, excluded) {
                            if (null == source) return {};
                            var target = {};
                            var sourceKeys = Object.keys(source);
                            var key, i;
                            for (i = 0; i < sourceKeys.length; i++) excluded.indexOf(key = sourceKeys[i]) >= 0 || (target[key] = source[key]);
                            return target;
                        }(_requirer, [ setupHandler, "setup", "destroy" ].map(_toPropertyKey));
                        setupComponent ? setupComponent() : setup && setup();
                        destroy && destroyers.push(destroy);
                        for (var _i4 = 0, _Object$keys2 = Object.keys(xports); _i4 < _Object$keys2.length; _i4++) {
                            var key = _Object$keys2[_i4];
                            var xport = xports[key];
                            xport && xport.__get__ && (xport = xport.__get__());
                            xport && (window[namespace][key] = xport);
                        }
                    } catch (err) {
                        setTimeout((function() {
                            throw new Error("Bootstrap Error for " + name + ":\n\n" + err.message + "\n\n" + err.stack);
                        }), 1);
                        return "continue";
                    }
                };
                for (var _i2 = 0; _i2 < components.length; _i2++) _loop();
                Object.defineProperty(window[namespace], "__internal_destroy__", {
                    enumerable: !1,
                    value: function(err) {
                        void 0 === err && (err = new Error("SDK instance destroyed (" + namespace + " / " + version + ")"));
                        destroyers.forEach((function(destroy) {
                            return destroy(err);
                        }));
                        (element = getSDKScript()) && element.parentNode && element.parentNode.removeChild(element);
                        var element;
                        delete window[namespace];
                    }
                });
            }
            var AUTO_FLUSH_LEVEL = [ "warn", "error" ];
            var LOG_LEVEL_PRIORITY = [ "error", "warn", "info", "debug" ];
            var DEFAULT_LOG_LEVEL = "undefined" == typeof window || !("__DEBUG__" in window) || window.__DEBUG__ ? "debug" : "warn";
            var sendBeacon = function(_ref2) {
                var _ref2$win = _ref2.win, win = void 0 === _ref2$win ? window : _ref2$win, url = _ref2.url, data = _ref2.data, _ref2$useBlob = _ref2.useBlob, useBlob = void 0 === _ref2$useBlob || _ref2$useBlob;
                try {
                    var json = JSON.stringify(data);
                    if (!win.navigator.sendBeacon) throw new Error("No sendBeacon available");
                    if (useBlob) {
                        var blob = new Blob([ json ], {
                            type: "application/json"
                        });
                        return win.navigator.sendBeacon(url, blob);
                    }
                    return win.navigator.sendBeacon(url, json);
                } catch (e) {
                    return !1;
                }
            };
            var extendIfDefined = function(target, source) {
                for (var key in source) source.hasOwnProperty(key) && (target[key] = source[key]);
            };
            function Logger(_ref) {
                var url = _ref.url, prefix = _ref.prefix, _ref$logLevel = _ref.logLevel, logLevel = void 0 === _ref$logLevel ? DEFAULT_LOG_LEVEL : _ref$logLevel, _ref$transport = _ref.transport, transport = void 0 === _ref$transport ? function(_ref) {
                    var url = _ref.url, method = _ref.method, headers = _ref.headers, json = _ref.json, _ref$enableSendBeacon = _ref.enableSendBeacon, enableSendBeacon = void 0 !== _ref$enableSendBeacon && _ref$enableSendBeacon;
                    return promise_ZalgoPromise.try((function() {
                        var httpWindow = httpWin || window;
                        var win = isSameDomain(httpWindow) ? function(win) {
                            if (!isSameDomain(win)) throw new Error("Expected window to be same domain");
                            return win;
                        }(httpWindow) : window;
                        var beaconResult = !1;
                        (function(_ref) {
                            var headers = _ref.headers, enableSendBeacon = _ref.enableSendBeacon;
                            var hasHeaders = headers && Object.keys(headers).length;
                            return !!(window && window.navigator.sendBeacon && !hasHeaders && enableSendBeacon && window.Blob);
                        })({
                            headers: headers,
                            enableSendBeacon: enableSendBeacon
                        }) && (beaconResult = function(url) {
                            return "https://api2.amplitude.com/2/httpapi" === url;
                        }(url) ? sendBeacon({
                            win: win,
                            url: url,
                            data: json,
                            useBlob: !1
                        }) : sendBeacon({
                            win: win,
                            url: url,
                            data: json,
                            useBlob: !0
                        }));
                        return beaconResult || request({
                            win: win,
                            url: url,
                            method: method,
                            headers: headers,
                            json: json
                        });
                    })).then(src_util_noop);
                } : _ref$transport, amplitudeApiKey = _ref.amplitudeApiKey, _ref$flushInterval = _ref.flushInterval, flushInterval = void 0 === _ref$flushInterval ? 6e4 : _ref$flushInterval, _ref$enableSendBeacon = _ref.enableSendBeacon, enableSendBeacon = void 0 !== _ref$enableSendBeacon && _ref$enableSendBeacon;
                var httpWin;
                var events = [];
                var tracking = [];
                var metrics = [];
                var payloadBuilders = [];
                var metaBuilders = [];
                var trackingBuilders = [];
                var headerBuilders = [];
                function print(level, event, payload) {
                    if (dom_isBrowser() && window.console && window.console.log && !(LOG_LEVEL_PRIORITY.indexOf(level) > LOG_LEVEL_PRIORITY.indexOf(logLevel))) {
                        var args = [ event ];
                        args.push(payload);
                        (payload.error || payload.warning) && args.push("\n\n", payload.error || payload.warning);
                        try {
                            window.console[level] && window.console[level].apply ? window.console[level].apply(window.console, args) : window.console.log && window.console.log.apply && window.console.log.apply(window.console, args);
                        } catch (err) {}
                    }
                }
                function immediateFlush() {
                    return promise_ZalgoPromise.try((function() {
                        if (dom_isBrowser() && "file:" !== window.location.protocol && (events.length || tracking.length || metrics.length)) {
                            var meta = {};
                            for (var _i2 = 0; _i2 < metaBuilders.length; _i2++) extendIfDefined(meta, (0, metaBuilders[_i2])(meta));
                            var headers = {};
                            for (var _i4 = 0; _i4 < headerBuilders.length; _i4++) extendIfDefined(headers, (0, 
                            headerBuilders[_i4])(headers));
                            var res;
                            url && (res = transport({
                                method: "POST",
                                url: url,
                                headers: headers,
                                json: {
                                    events: events,
                                    meta: meta,
                                    tracking: tracking,
                                    metrics: metrics
                                },
                                enableSendBeacon: enableSendBeacon
                            }).catch(src_util_noop));
                            amplitudeApiKey && transport({
                                method: "POST",
                                url: "https://api2.amplitude.com/2/httpapi",
                                headers: {},
                                json: {
                                    api_key: amplitudeApiKey,
                                    events: tracking.map((function(payload) {
                                        return _extends({
                                            event_type: payload.transition_name || "event",
                                            event_properties: payload
                                        }, payload);
                                    }))
                                },
                                enableSendBeacon: enableSendBeacon
                            }).catch(src_util_noop);
                            events = [];
                            tracking = [];
                            metrics = [];
                            return promise_ZalgoPromise.resolve(res).then(src_util_noop);
                        }
                    }));
                }
                var flush = function(method, delay) {
                    void 0 === delay && (delay = 50);
                    var promise;
                    var timeout;
                    return setFunctionName((function() {
                        timeout && clearTimeout(timeout);
                        var localPromise = promise = promise || new promise_ZalgoPromise;
                        timeout = setTimeout((function() {
                            promise = null;
                            timeout = null;
                            promise_ZalgoPromise.try(method).then((function(result) {
                                localPromise.resolve(result);
                            }), (function(err) {
                                localPromise.reject(err);
                            }));
                        }), delay);
                        return localPromise;
                    }), getFunctionName(method) + "::promiseDebounced");
                }(immediateFlush);
                function log(level, event, payload) {
                    void 0 === payload && (payload = {});
                    if (!dom_isBrowser()) return logger;
                    prefix && (event = prefix + "_" + event);
                    var logPayload = _extends({}, objFilter(payload), {
                        timestamp: Date.now().toString()
                    });
                    for (var _i6 = 0; _i6 < payloadBuilders.length; _i6++) extendIfDefined(logPayload, (0, 
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
                    return logger;
                }
                function addBuilder(builders, builder) {
                    builders.push(builder);
                    return logger;
                }
                dom_isBrowser() && (method = flush, time = flushInterval, function loop() {
                    setTimeout((function() {
                        method();
                        loop();
                    }), time);
                }());
                var method, time;
                if ("object" == typeof window) {
                    window.addEventListener("beforeunload", (function() {
                        immediateFlush();
                    }));
                    window.addEventListener("unload", (function() {
                        immediateFlush();
                    }));
                    window.addEventListener("pagehide", (function() {
                        immediateFlush();
                    }));
                }
                var logger = {
                    debug: function(event, payload) {
                        return log("debug", event, payload);
                    },
                    info: function(event, payload) {
                        return log("info", event, payload);
                    },
                    warn: function(event, payload) {
                        return log("warn", event, payload);
                    },
                    error: function(event, payload) {
                        return log("error", event, payload);
                    },
                    track: function(payload) {
                        void 0 === payload && (payload = {});
                        if (!dom_isBrowser()) return logger;
                        var trackingPayload = objFilter(payload);
                        for (var _i8 = 0; _i8 < trackingBuilders.length; _i8++) extendIfDefined(trackingPayload, (0, 
                        trackingBuilders[_i8])(trackingPayload));
                        print("debug", "track", trackingPayload);
                        tracking.push(trackingPayload);
                        return logger;
                    },
                    metric: function(metricPayload) {
                        if (!dom_isBrowser()) return logger;
                        print("debug", "metric." + metricPayload.name, metricPayload.dimensions || {});
                        metrics.push(metricPayload);
                        return logger;
                    },
                    flush: flush,
                    immediateFlush: immediateFlush,
                    addPayloadBuilder: function(builder) {
                        return addBuilder(payloadBuilders, builder);
                    },
                    addMetaBuilder: function(builder) {
                        return addBuilder(metaBuilders, builder);
                    },
                    addTrackingBuilder: function(builder) {
                        return addBuilder(trackingBuilders, builder);
                    },
                    addHeaderBuilder: function(builder) {
                        return addBuilder(headerBuilders, builder);
                    },
                    setTransport: function(newTransport) {
                        transport = newTransport;
                        return logger;
                    },
                    configure: function(opts) {
                        opts.url && (url = opts.url);
                        opts.prefix && (prefix = opts.prefix);
                        opts.logLevel && (logLevel = opts.logLevel);
                        opts.transport && (transport = opts.transport);
                        opts.amplitudeApiKey && (amplitudeApiKey = opts.amplitudeApiKey);
                        opts.flushInterval && (flushInterval = opts.flushInterval);
                        opts.enableSendBeacon && (enableSendBeacon = opts.enableSendBeacon);
                        return logger;
                    },
                    __buffer__: {
                        get events() {
                            return events;
                        },
                        get tracking() {
                            return tracking;
                        },
                        get metrics() {
                            return metrics;
                        }
                    }
                };
                Object.defineProperty(logger, "__buffer__", {
                    writable: !1
                });
                return logger;
            }
            function getPayPalLoggerDomain() {
                if ("local" === ("undefined" != typeof window && "__ENV__" in window ? window.__ENV__ : "test")) {
                    var stageHost = getStageHost();
                    if (!stageHost) throw new Error("No stage host found");
                    return global_getProtocol() + "://" + stageHost;
                }
                return getPayPalDomain();
            }
            function buildPayPalUrl(path) {
                void 0 === path && (path = "");
                return "undefined" != typeof window && "__TEST__" in window && !window.__TEST__ || "undefined" != typeof window && "__WEB__" in window && !window.__WEB__ ? "" + getPayPalDomain() + path : "" + getActualDomain() + path;
            }
            function buildPayPalAPIUrl(path) {
                void 0 === path && (path = "");
                var paypalAPIDomain = (domain = getPayPalDomain(), "undefined" != typeof window && void 0 !== window.location && getDomain() === domain ? getPayPalDomain() : getPayPalAPIDomain());
                var domain;
                return "undefined" != typeof window && "__TEST__" in window && !window.__TEST__ || "undefined" != typeof window && "__WEB__" in window && !window.__WEB__ ? "" + paypalAPIDomain + path : "" + getActualDomain() + path;
            }
            function getPayPalLoggerUrl() {
                return buildPayPalUrl(URI.LOGGER);
            }
            function getAuthAPIUrl() {
                return buildPayPalAPIUrl(URI.AUTH);
            }
            function getOrderAPIUrl() {
                return buildPayPalAPIUrl(URI.ORDER);
            }
            function getPayPalDomainRegex() {
                return "local" === ("undefined" != typeof window && "__ENV__" in window ? window.__ENV__ : "test") ? /.*loca.*/ : /\.paypal\.(com|cn)(:\d+)?$/;
            }
            function isPayPalDomain() {
                return Boolean(getDomain().match(getPayPalDomainRegex()));
            }
            var loggerUrl = getDisableSetCookie() ? getPayPalLoggerUrl() + "?disable-set-cookie=true" : getPayPalLoggerUrl();
            var getLogger = memoize((function() {
                return Logger({
                    url: loggerUrl
                });
            }));
            var _TYPES = !0;
            var ALLOWED_ATTRS = [ "data-amount", "data-merchant-id", "data-partner-attribution-id", "data-popups-disabled", "data-enable-3ds", "data-sdk-integration-source", "data-client-metadata-id", "data-uid", "data-csp-nonce" ];
            function getSDKMeta() {
                var url = getScriptUrl();
                var scriptAttrs = getSDKAttributes();
                var attrs = {};
                for (var _i2 = 0, _Object$keys2 = Object.keys(scriptAttrs); _i2 < _Object$keys2.length; _i2++) {
                    var attr = _Object$keys2[_i2];
                    -1 !== ALLOWED_ATTRS.indexOf(attr) && (attrs[attr] = scriptAttrs[attr]);
                }
                return base64encode(JSON.stringify({
                    url: url,
                    attrs: attrs
                })).replace(/\=+$/, "");
            }
            var createAccessToken = memoize((function(clientID) {
                getLogger().info("rest_api_create_access_token");
                var basicAuth = base64encode(clientID + ":");
                return request({
                    method: "post",
                    url: getAuthAPIUrl(),
                    headers: {
                        Authorization: "Basic " + basicAuth
                    },
                    data: {
                        grant_type: "client_credentials"
                    }
                }).then((function(_ref) {
                    var body = _ref.body;
                    if (body && "invalid_client" === body.error) throw new Error("Auth Api invalid client id: " + clientID + ":\n\n" + JSON.stringify(body, null, 4));
                    if (!body || !body.access_token) throw new Error("Auth Api response error:\n\n" + JSON.stringify(body, null, 4));
                    return body.access_token;
                }));
            }));
            function createOrder(clientID, order, _temp) {
                var _ref2$fptiState = (void 0 === _temp ? {} : _temp).fptiState, fptiState = void 0 === _ref2$fptiState ? "" : _ref2$fptiState;
                getLogger().info("rest_api_create_order_token");
                if (!clientID) throw new Error("Client ID not passed");
                if (!order) throw new Error("Expected order details to be passed");
                var currency = getCurrency();
                var intent = getIntent();
                var merchantID = getMerchantID();
                if ((order = _extends({}, order)).intent && order.intent.toLowerCase() !== intent) throw new Error("Unexpected intent: " + order.intent + " passed to order.create. Please ensure you are passing /sdk/js?intent=" + order.intent.toLowerCase() + " in the paypal script tag.");
                (order = _extends({}, order, {
                    intent: intent.toUpperCase()
                })).purchase_units = order.purchase_units.map((function(unit) {
                    if (unit.amount.currency_code && unit.amount.currency_code !== currency) throw new Error("Unexpected currency: " + unit.amount.currency_code + " passed to order.create. Please ensure you are passing /sdk/js?currency=" + unit.amount.currency_code + " in the paypal script tag.");
                    var payee = unit.payee;
                    if (payee && !merchantID) throw new Error("Pass merchant-id=XYZ in the paypal script tag. Pass merchant-id=unknown if you do not have access to the merchant id");
                    return _extends({}, unit, {
                        payee: payee,
                        amount: _extends({}, unit.amount, {
                            currency_code: currency
                        })
                    });
                }));
                order.application_context = order.application_context || {};
                return createAccessToken(clientID).then((function(accessToken) {
                    var headers = {
                        Authorization: "Bearer " + accessToken,
                        "PayPal-Partner-Attribution-Id": getPartnerAttributionID()
                    };
                    return request({
                        method: "post",
                        url: getOrderAPIUrl(),
                        headers: headers,
                        json: order
                    });
                })).then((function(_ref3) {
                    var _getLogger$track;
                    var body = _ref3.body;
                    if (!body || !body.id) throw new Error("Order Api response error:\n\n" + JSON.stringify(body, null, 4));
                    getLogger().track(((_getLogger$track = {}).state_name = fptiState, _getLogger$track.transition_name = "process_create_order", 
                    _getLogger$track.context_type = "EC-Token", _getLogger$track.token = body.id, _getLogger$track.context_id = body.id, 
                    _getLogger$track));
                    return body.id;
                }));
            }
            function createExperiment(name, sample, logger) {
                var log = logger || getLogger();
                return function(_ref) {
                    var name = _ref.name, _ref$sample = _ref.sample, sample = void 0 === _ref$sample ? 50 : _ref$sample, _ref$logTreatment = _ref.logTreatment, logTreatment = void 0 === _ref$logTreatment ? src_util_noop : _ref$logTreatment, _ref$logCheckpoint = _ref.logCheckpoint, logCheckpoint = void 0 === _ref$logCheckpoint ? src_util_noop : _ref$logCheckpoint, _ref$sticky = _ref.sticky;
                    var throttle = void 0 === _ref$sticky || _ref$sticky ? function(name) {
                        return getBelterExperimentStorage().getState((function(state) {
                            state.throttlePercentiles = state.throttlePercentiles || {};
                            state.throttlePercentiles[name] = state.throttlePercentiles[name] || getRandomInteger(100);
                            return state.throttlePercentiles[name];
                        }));
                    }(name) : getRandomInteger(100);
                    var group;
                    group = throttle < sample && "undefined" != typeof window && "__TEST__" in window && !window.__TEST__ ? "test" : sample >= 50 || sample <= throttle && throttle < 2 * sample ? "control" : "throttle";
                    var treatment = name + "_" + group;
                    var started = !1;
                    var forced = !1;
                    try {
                        window.localStorage && window.localStorage.getItem(name) && (forced = !0);
                    } catch (err) {}
                    var exp = {
                        isEnabled: function() {
                            return "test" === group || forced;
                        },
                        isDisabled: function() {
                            return "test" !== group && !forced;
                        },
                        getTreatment: function() {
                            return treatment;
                        },
                        log: function(checkpoint, payload) {
                            void 0 === payload && (payload = {});
                            if (!started) return exp;
                            isEventUnique(treatment + "_" + JSON.stringify(payload)) && logTreatment({
                                name: name,
                                treatment: treatment,
                                payload: payload,
                                throttle: throttle
                            });
                            isEventUnique(treatment + "_" + checkpoint + "_" + JSON.stringify(payload)) && logCheckpoint({
                                name: name,
                                treatment: treatment,
                                checkpoint: checkpoint,
                                payload: payload,
                                throttle: throttle
                            });
                            return exp;
                        },
                        logStart: function(payload) {
                            void 0 === payload && (payload = {});
                            started = !0;
                            return exp.log("start", payload);
                        },
                        logComplete: function(payload) {
                            void 0 === payload && (payload = {});
                            return exp.log("complete", payload);
                        }
                    };
                    return exp;
                }({
                    name: name,
                    sample: sample,
                    logTreatment: function(_ref) {
                        var _extends2;
                        var treatment = _ref.treatment, payload = _ref.payload;
                        var fullPayload = _extends(((_extends2 = {}).state_name = "PXP_CHECK", _extends2.transition_name = "process_pxp_check", 
                        _extends2.pxp_exp_id = name, _extends2.pxp_trtmnt_id = treatment, _extends2), payload);
                        log.track(fullPayload);
                        log.flush();
                    },
                    logCheckpoint: function(_ref2) {
                        var treatment = _ref2.treatment, checkpoint = _ref2.checkpoint, payload = _ref2.payload;
                        -1 !== treatment.indexOf(name) ? log.info(treatment + "_" + checkpoint, payload) : log.info(name + "_" + treatment + "_" + checkpoint, payload);
                        log.flush();
                    }
                });
            }
            function getSDKStorage() {
                return getStorage({
                    name: getNamespace()
                });
            }
            function session_getSessionID() {
                return getSDKStorage().getSessionID();
            }
            function getStorageState(handler) {
                return getSDKStorage().getState(handler);
            }
            function getStorageID() {
                return getSDKStorage().getID();
            }
            function session_getSessionState(handler) {
                return getSDKStorage().getSessionState(handler);
            }
            function getClientMetadataID() {
                return getSDKAttribute("data-client-metadata-id");
            }
            var getEventEmitter = memoize((function() {
                var triggered = {};
                var handlers = {};
                var emitter = {
                    on: function(eventName, handler) {
                        var handlerList = handlers[eventName] = handlers[eventName] || [];
                        handlerList.push(handler);
                        var cancelled = !1;
                        return {
                            cancel: function() {
                                if (!cancelled) {
                                    cancelled = !0;
                                    handlerList.splice(handlerList.indexOf(handler), 1);
                                }
                            }
                        };
                    },
                    once: function(eventName, handler) {
                        var listener = emitter.on(eventName, (function() {
                            listener.cancel();
                            handler();
                        }));
                        return listener;
                    },
                    trigger: function(eventName) {
                        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
                        var handlerList = handlers[eventName];
                        var promises = [];
                        if (handlerList) {
                            var _loop = function() {
                                var handler = handlerList[_i2];
                                promises.push(promise_ZalgoPromise.try((function() {
                                    return handler.apply(void 0, args);
                                })));
                            };
                            for (var _i2 = 0; _i2 < handlerList.length; _i2++) _loop();
                        }
                        return promise_ZalgoPromise.all(promises).then(src_util_noop);
                    },
                    triggerOnce: function(eventName) {
                        if (triggered[eventName]) return promise_ZalgoPromise.resolve();
                        triggered[eventName] = !0;
                        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) args[_key4 - 1] = arguments[_key4];
                        return emitter.trigger.apply(emitter, [ eventName ].concat(args));
                    },
                    reset: function() {
                        handlers = {};
                    }
                };
                return emitter;
            }));
            var sdkInitTime;
            function getSDKInitTime() {
                if (void 0 === sdkInitTime) throw new TypeError("SDK not initialized");
                return sdkInitTime;
            }
            function setupLogger() {
                var logger = getLogger();
                sdkInitTime = Date.now();
                logger.addPayloadBuilder((function() {
                    return {
                        referer: window.location.host,
                        uid: session_getSessionID(),
                        env: getEnv()
                    };
                }));
                logger.addTrackingBuilder((function() {
                    var _ref;
                    var _getLocale = getLocale(), lang = _getLocale.lang, country = _getLocale.country;
                    var mID = getMerchantID();
                    return (_ref = {}).feed_name = "payments_sdk", _ref.serverside_data_source = "checkout", 
                    _ref.client_id = getClientID(), _ref.seller_id = mID && mID.toString(), _ref.page_session_id = session_getSessionID(), 
                    _ref.referer_url = window.location.host, _ref.locale = lang + "_" + country, _ref.integration_identifier = getClientID(), 
                    _ref.bn_code = getPartnerAttributionID(), _ref.pp_placement = getPageType(), _ref.sdk_name = "payments_sdk", 
                    _ref.sdk_version = getVersion(), _ref.user_agent = window.navigator && window.navigator.userAgent, 
                    _ref.user_action = getCommit() ? "commit" : "continue", _ref.context_correlation_id = getCorrelationID(), 
                    _ref.sdk_integration_source = getSDKIntegrationSource(), _ref;
                }));
                promise_ZalgoPromise.onPossiblyUnhandledException((function(err) {
                    var _logger$track;
                    logger.track(((_logger$track = {}).ext_error_code = "payments_sdk_error", _logger$track.ext_error_desc = function(err) {
                        var defaultMessage = "<unknown error: " + {}.toString.call(err) + ">";
                        return err ? err instanceof Error ? err.message || defaultMessage : "string" == typeof err.message && err.message || defaultMessage : defaultMessage;
                    }(err), _logger$track));
                    logger.error("unhandled_error", {
                        err: stringifyError(err)
                    });
                    logger.flush().catch(src_util_noop);
                }));
                waitForWindowReady().then((function() {
                    var _logger$info$info$inf;
                    var sdkScript = getSDKScript();
                    var loadTime = function(url) {
                        var performance = getPerformance();
                        if (performance && "function" == typeof performance.getEntries) {
                            var entries = performance.getEntries();
                            for (var i = 0; i < entries.length; i++) {
                                var entry = entries[i];
                                if (entry && entry.name && 0 === entry.name.indexOf(url) && "number" == typeof entry.duration) return Math.floor(entry.duration);
                            }
                        }
                    }(sdkScript.src);
                    var cache;
                    cache = 0 === loadTime ? "sdk_client_cache_hit" : "number" == typeof loadTime ? "sdk_client_cache_miss" : "sdk_client_cache_unknown";
                    var isLoadedInFrame = isPayPalDomain() && window.xprops;
                    var sdkLoadTime = "number" == typeof loadTime ? loadTime.toString() : void 0;
                    logger.info("setup_" + getEnv()).info("setup_" + getEnv() + "_" + getVersion().replace(/\./g, "_")).info("sdk_" + (isLoadedInFrame ? "paypal" : "non_paypal") + "_domain_script_uid_" + (sdkScript.hasAttribute("data-uid") ? "present" : "missing")).info(cache, {
                        sdkLoadTime: sdkLoadTime
                    }).metric({
                        metricNamespace: "pp.app.sdk.paypal_js_v5.sdk_load_time.gauge",
                        metricEventName: "unused",
                        metricValue: sdkLoadTime,
                        dimensions: {
                            cacheType: cache,
                            components: getComponents().join(",")
                        }
                    }).track((_logger$info$info$inf = {}, _logger$info$info$inf.transition_name = "process_js_sdk_init_client", 
                    _logger$info$info$inf.sdk_load_time = sdkLoadTime, _logger$info$info$inf.sdk_cache = cache, 
                    _logger$info$info$inf)).flush();
                    (function() {
                        if (window.document.documentMode) try {
                            var status = window.status;
                            window.status = "testIntranetMode";
                            if ("testIntranetMode" === window.status) {
                                window.status = status;
                                return !0;
                            }
                            return !1;
                        } catch (err) {
                            return !1;
                        }
                        return !1;
                    })() && logger.warn("ie_intranet_mode");
                }));
            }
            var _DEFAULT_QUERY;
            var DEFAULT_QUERY = ((_DEFAULT_QUERY = {})["client-id"] = "abcxyz123", _DEFAULT_QUERY);
            var DEFAULT_ATTRIBUTES = {};
            function insertMockSDKScript(_temp) {
                var _ref = void 0 === _temp ? {} : _temp, _ref$query = _ref.query, query = void 0 === _ref$query ? DEFAULT_QUERY : _ref$query, _ref$attributes = _ref.attributes, attributes = void 0 === _ref$attributes ? DEFAULT_ATTRIBUTES : _ref$attributes;
                var scripts = document.querySelectorAll('script[type="test/javascript"]');
                for (var _i2 = 0; _i2 < scripts.length; _i2++) {
                    var _script = scripts[_i2];
                    _script && _script.parentNode && _script.parentNode.removeChild(_script);
                }
                delete getScript.__inline_memoize_cache__;
                delete getSDKScript.__inline_memoize_cache__;
                delete getSDKAttributes.__inline_memoize_cache__;
                var script = document.createElement("script");
                script.setAttribute("type", "test/javascript");
                script.setAttribute("id", "test-sdk-script");
                var url = function(url, options) {
                    var query = options.query || {};
                    var hash = options.hash || {};
                    var originalUrl;
                    var originalHash;
                    var _url$split = url.split("#");
                    originalHash = _url$split[1];
                    var _originalUrl$split = (originalUrl = _url$split[0]).split("?");
                    originalUrl = _originalUrl$split[0];
                    var queryString = extendQuery(_originalUrl$split[1], query);
                    var hashString = extendQuery(originalHash, hash);
                    queryString && (originalUrl = originalUrl + "?" + queryString);
                    hashString && (originalUrl = originalUrl + "#" + hashString);
                    return originalUrl;
                }("https://" + getHost() + getPath(), {
                    query: _extends({}, DEFAULT_QUERY, query)
                });
                script.setAttribute("src", url);
                for (var _i4 = 0, _Object$keys2 = Object.keys(attributes); _i4 < _Object$keys2.length; _i4++) {
                    var key = _Object$keys2[_i4];
                    script.setAttribute(key, attributes[key]);
                }
                if (!document.body) throw new Error("No document body found");
                document.body.appendChild(script);
                memoize.clear();
                setupLogger();
                return url;
            }
            function callGraphQL(_ref) {
                var query = _ref.query, _ref$variables = _ref.variables, variables = void 0 === _ref$variables ? {} : _ref$variables, _ref$headers = _ref.headers, headers = void 0 === _ref$headers ? {} : _ref$headers;
                return request({
                    url: buildPayPalUrl("/graphql"),
                    method: "POST",
                    json: {
                        query: query,
                        variables: variables
                    },
                    headers: _extends({
                        "x-app-name": "hosted_fields"
                    }, headers)
                }).then((function(_ref2) {
                    var status = _ref2.status, body = _ref2.body;
                    var errors = body.errors || [];
                    if (errors.length) {
                        var message = errors[0].message || JSON.stringify(errors[0]);
                        throw new Error(message);
                    }
                    if (200 !== status) throw new Error("/graphql returned status " + status);
                    return body.data;
                }));
            }
            function getGraphQLFundingEligibility(fields) {
                var clientID, merchantID, buyerCountry, currency, commit, vault, intent, enableFunding, disableFunding, disableCard;
                return callGraphQL({
                    query: "\n            query GetFundingEligibility(\n                $clientID:String,\n                $merchantID:[ String ],\n                $buyerCountry:CountryCodes,\n                $currency:SupportedCountryCurrencies,\n                $intent:FundingEligibilityIntent,\n                $commit:Boolean,\n                $vault:Boolean,\n                $enableFunding:[ SupportedPaymentMethodsType ],\n                $disableFunding:[ SupportedPaymentMethodsType ],\n                $disableCard:[ SupportedCardsType ]\n            ) {\n            fundingEligibility(\n                clientId:$clientID,\n                buyerCountry:$buyerCountry,\n                currency:$currency,\n                intent:$intent,\n                commit:$commit,\n                vault:$vault,\n                enableFunding:$enableFunding,\n                disableFunding:$disableFunding,\n                disableCard:$disableCard,\n                merchantId:$merchantID\n            ) {\n                " + fields + "\n            }\n          }\n        ",
                    variables: (clientID = getClientID(), merchantID = getMerchantID(), buyerCountry = getBuyerCountry(), 
                    currency = getCurrency(), commit = getCommit(), vault = getVault(), intent = getIntent(), 
                    enableFunding = getEnableFunding(), disableFunding = getDisableFunding(), disableCard = getDisableCard(), 
                    {
                        clientID: clientID,
                        merchantID: merchantID,
                        buyerCountry: buyerCountry,
                        currency: currency,
                        commit: commit,
                        vault: vault,
                        intent: intent ? intent.toUpperCase() : intent,
                        enableFunding: enableFunding ? enableFunding.map((function(f) {
                            return f && f.toUpperCase();
                        })) : enableFunding,
                        disableFunding: disableFunding ? disableFunding.map((function(f) {
                            return f && f.toUpperCase();
                        })) : disableFunding,
                        disableCard: disableCard ? disableCard.map((function(f) {
                            return f && f.toUpperCase();
                        })) : disableCard
                    })
                }).then((function(gqlResult) {
                    if (!gqlResult || !gqlResult.fundingEligibility) throw new Error("GraphQL fundingEligibility returned no fundingEligibility object");
                    return gqlResult && gqlResult.fundingEligibility;
                })).catch((function(err) {
                    getLogger().error("graphql_fundingeligibility_error", {
                        err: stringifyError(err)
                    });
                    return promise_ZalgoPromise.reject(err);
                }));
            }
        }
    });
}));