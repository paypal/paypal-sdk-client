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
        "./src/constants.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return GLOBAL_KEY;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return ENV;
            });
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return GLOBAL_NAMESPACE;
            });
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return DEFAULT_ENV;
            });
            var GLOBAL_KEY = "__paypal_braintree_global__", ENV = {
                PRODUCTION: "production",
                SANDBOX: "sandbox",
                STAGE: "stage",
                LOCAL: "local"
            }, GLOBAL_NAMESPACE = "paypal", DEFAULT_ENV = ENV.PRODUCTION;
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
            __webpack_require__.d(__webpack_exports__, "ENV", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.b;
            });
            __webpack_require__.d(__webpack_exports__, "GLOBAL_NAMESPACE", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.d;
            });
            __webpack_require__.d(__webpack_exports__, "DEFAULT_ENV", function() {
                return __WEBPACK_IMPORTED_MODULE_1__constants__.a;
            });
        },
        "./src/interface.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function attach(moduleName, exportBuilder) {
                if (exportBuilders[moduleName]) throw new Error("Already attached " + moduleName);
                exportBuilders[moduleName] = exportBuilder;
            }
            function client() {
                var clientOptions = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                clientOptions = JSON.parse(JSON.stringify(clientOptions));
                clientOptions.env = Object({}).env || clientOptions.env || __WEBPACK_IMPORTED_MODULE_3__constants__.a;
                Object(__WEBPACK_IMPORTED_MODULE_2__validation__.a)(clientOptions);
                var xports = {};
                Object.keys(exportBuilders).forEach(function(moduleName) {
                    Object(__WEBPACK_IMPORTED_MODULE_0__util__.a)(xports, exportBuilders[moduleName]({
                        clientOptions: clientOptions
                    }));
                });
                return xports;
            }
            __webpack_exports__.a = attach;
            var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./src/util.js"), __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__("./src/global.js"), __WEBPACK_IMPORTED_MODULE_2__validation__ = __webpack_require__("./src/validation.js"), __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__("./src/constants.js"), exportBuilders = Object(__WEBPACK_IMPORTED_MODULE_1__global__.a)("exportBuilders", {});
            window[__WEBPACK_IMPORTED_MODULE_3__constants__.d] = window[__WEBPACK_IMPORTED_MODULE_3__constants__.d] || {};
            window[__WEBPACK_IMPORTED_MODULE_3__constants__.d].client = window.client || client;
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
                if (env && -1 === Object(__WEBPACK_IMPORTED_MODULE_1__util__.c)(__WEBPACK_IMPORTED_MODULE_0__constants__.b).indexOf(env)) throw new Error("Invalid env: " + env);
                if (auth && !Object(__WEBPACK_IMPORTED_MODULE_1__util__.b)(auth)) throw new Error("Expected auth to be passed");
                if (auth && env && !auth[env]) throw new Error("Expected auth to be passed for env: " + env);
            }
            __webpack_exports__.a = validateClientOptions;
            var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./src/constants.js"), __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__("./src/util.js");
        }
    });
});
//# sourceMappingURL=paypal-braintree-sdk-client.js.map
//# sourceMappingURL=paypal-braintree-sdk-client.js.map