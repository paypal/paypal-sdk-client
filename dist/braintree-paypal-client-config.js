!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("btppClientConfig", [], factory) : "object" == typeof exports ? exports.btppClientConfig = factory() : root.btppClientConfig = factory();
}(this, function() {
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
        "./src/config.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function get(key, def) {
                return __WEBPACK_IMPORTED_MODULE_0__store__.a.has(key) ? __WEBPACK_IMPORTED_MODULE_0__store__.a.get(key) : def;
            }
            function set(key, value) {
                __WEBPACK_IMPORTED_MODULE_0__store__.a.set(key, value);
                if (listeners[key]) for (var _iterator = listeners[key], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }
                    var listener = _ref;
                    listener(value);
                }
                return value;
            }
            function get_or_set(key, value) {
                return __WEBPACK_IMPORTED_MODULE_0__store__.a.has(key) ? get(key) : set(key, value);
            }
            function on(key, handler) {
                listeners[key] = listeners[key] || [];
                listeners[key].push(handler);
                return {
                    cancel: function() {
                        listeners[key].splice(listeners[key].indexOf(handler), 1);
                    }
                };
            }
            __webpack_exports__.a = get;
            __webpack_exports__.d = set;
            __webpack_exports__.b = get_or_set;
            __webpack_exports__.c = on;
            var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__("./src/store.js"), listeners = {};
        },
        "./src/constants.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return CONFIG_KEY;
            });
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return STORE;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return KEY;
            });
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return PAYPAL_FUNDING;
            });
            var CONFIG_KEY = "__braintree_paypal_config__", STORE = {
                LOCALSTORAGE: "localstorage",
                GLOBAL: "global"
            }, KEY = {
                LOGGER_SESSION_ID: "logger_session_id",
                PAYPAL_FUNDING_DISALLOW: "paypal_funding_disallow"
            }, PAYPAL_FUNDING = {
                PAYPAL: "paypal",
                VENMO: "venmo",
                CREDIT: "credit",
                CARD: "card",
                IDEAL: "ideal",
                ELV: "elv"
            };
        },
        "./src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./src/config.js");
            __webpack_require__.d(__webpack_exports__, "get", function() {
                return __WEBPACK_IMPORTED_MODULE_0__config__.a;
            });
            __webpack_require__.d(__webpack_exports__, "set", function() {
                return __WEBPACK_IMPORTED_MODULE_0__config__.d;
            });
            __webpack_require__.d(__webpack_exports__, "get_or_set", function() {
                return __WEBPACK_IMPORTED_MODULE_0__config__.b;
            });
            __webpack_require__.d(__webpack_exports__, "on", function() {
                return __WEBPACK_IMPORTED_MODULE_0__config__.c;
            });
            var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/constants.js");
            __webpack_require__.d(__webpack_exports__, "CONFIG_KEY", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.a;
            });
            __webpack_require__.d(__webpack_exports__, "STORE", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.d;
            });
            __webpack_require__.d(__webpack_exports__, "KEY", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.b;
            });
            __webpack_require__.d(__webpack_exports__, "PAYPAL_FUNDING", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.c;
            });
        },
        "./src/store.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function _defineProperty(obj, key, value) {
                key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value;
                return obj;
            }
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return store;
            });
            var _stores, __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./src/constants.js"), __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__("./src/util.js"), stores = (_stores = {}, 
            _defineProperty(_stores, __WEBPACK_IMPORTED_MODULE_0__constants__.d.GLOBAL, {
                get: function(key) {
                    return (window[__WEBPACK_IMPORTED_MODULE_0__constants__.a] || {})[key];
                },
                set: function(key, value) {
                    var storage = window[__WEBPACK_IMPORTED_MODULE_0__constants__.a] || {};
                    storage[key] = value;
                    window[__WEBPACK_IMPORTED_MODULE_0__constants__.a] = storage;
                    return value;
                },
                has: function(key) {
                    return (window[__WEBPACK_IMPORTED_MODULE_0__constants__.a] || {}).hasOwnProperty(key);
                }
            }), _defineProperty(_stores, __WEBPACK_IMPORTED_MODULE_0__constants__.d.LOCALSTORAGE, {
                get: function(key) {
                    var storage = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__constants__.a);
                    storage = storage ? JSON.parse(storage) : {};
                    return storage[key];
                },
                set: function(key, value) {
                    var storage = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__constants__.a);
                    storage = storage ? JSON.parse(storage) : {};
                    storage[key] = value;
                    localStorage.setItem(__WEBPACK_IMPORTED_MODULE_0__constants__.a, JSON.stringify(storage));
                    return value;
                },
                has: function(key) {
                    var storage = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__constants__.a);
                    storage = storage ? JSON.parse(storage) : {};
                    return storage.hasOwnProperty(key);
                }
            }), _stores), store = Object(__WEBPACK_IMPORTED_MODULE_1__util__.a)() ? stores[__WEBPACK_IMPORTED_MODULE_0__constants__.d.LOCALSTORAGE] : stores[__WEBPACK_IMPORTED_MODULE_0__constants__.d.GLOBAL];
        },
        "./src/util.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function isLocalStorageEnabled() {
                try {
                    if (window.localStorage) {
                        var value = Math.random().toString();
                        window.localStorage.setItem("__test__localStorage__", value);
                        var result = window.localStorage.getItem("__test__localStorage__");
                        window.localStorage.removeItem("__test__localStorage__");
                        if (value === result) return !0;
                    }
                } catch (err) {}
                return !1;
            }
            __webpack_exports__.a = isLocalStorageEnabled;
        }
    });
});
//# sourceMappingURL=braintree-paypal-client-config.js.map
//# sourceMappingURL=braintree-paypal-client-config.js.map