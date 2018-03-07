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
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return serverConfig;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return queryOptions;
            });
            var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./src/global.js"), clientConfig = {
                get: get,
                set: set,
                getOrSet: getOrSet
            }, serverConfig = __PAYPAL_BRAINTREE_SERVER_CONFIG__, queryOptions = __PAYPAL_BRAINTREE_QUERY_OPTIONS__;
        },
        "./src/constants.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return GLOBAL_KEY;
            });
            __webpack_require__.d(__webpack_exports__, "e", function() {
                return KEY;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return FUNDING;
            });
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return ENV;
            });
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return HTTP_HEADERS;
            });
            var GLOBAL_KEY = "__paypal_braintree_global__", KEY = {
                LOGGER_SESSION_ID: "logger_session_id",
                DEDICATED_FUNDING_MODULES: "dedicated_funding_modules"
            }, FUNDING = {
                PAYPAL: "paypal",
                VENMO: "venmo",
                CREDIT: "credit",
                CARD: "card",
                IDEAL: "ideal",
                ELV: "elv"
            }, ENV = {
                PRODUCTION: "production",
                SANDBOX: "sandbox",
                STAGE: "stage",
                LOCAL: "local"
            }, HTTP_HEADERS = {
                CONTENT_TYPE: "content-type",
                ACCEPT: "accept"
            };
        },
        "./src/global.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function getGlobal(key, def) {
                window[__WEBPACK_IMPORTED_MODULE_0__constants__.c] = window[__WEBPACK_IMPORTED_MODULE_0__constants__.c] || {};
                if (window[__WEBPACK_IMPORTED_MODULE_0__constants__.c].hasOwnProperty(key)) return window[__WEBPACK_IMPORTED_MODULE_0__constants__.c][key];
                def = def || {};
                window[__WEBPACK_IMPORTED_MODULE_0__constants__.c][key] = def;
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
            var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/constants.js");
            __webpack_require__.d(__webpack_exports__, "GLOBAL_KEY", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.c;
            });
            __webpack_require__.d(__webpack_exports__, "KEY", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.e;
            });
            __webpack_require__.d(__webpack_exports__, "FUNDING", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.b;
            });
            __webpack_require__.d(__webpack_exports__, "ENV", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.a;
            });
            __webpack_require__.d(__webpack_exports__, "HTTP_HEADERS", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.d;
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
                    serverConfig: __WEBPACK_IMPORTED_MODULE_3__config__.c,
                    queryOptions: __WEBPACK_IMPORTED_MODULE_3__config__.b
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
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
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