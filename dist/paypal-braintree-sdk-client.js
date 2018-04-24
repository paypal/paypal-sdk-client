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
        "./src/constants.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var ENV = (exports.GLOBAL_KEY = "__paypal_braintree_global__", exports.ENV = {
                PRODUCTION: "production",
                SANDBOX: "sandbox",
                STAGE: "stage",
                LOCAL: "local",
                TEST: "test"
            });
            exports.GLOBAL_NAMESPACE = "paypal", exports.DEFAULT_ENV = ENV.PRODUCTION;
        },
        "./src/global.js": function(module, exports, __webpack_require__) {
            "use strict";
            function getGlobal(key, def) {
                window[_constants.GLOBAL_KEY] = window[_constants.GLOBAL_KEY] || {};
                if (window[_constants.GLOBAL_KEY].hasOwnProperty(key)) return window[_constants.GLOBAL_KEY][key];
                def = def || {};
                window[_constants.GLOBAL_KEY][key] = def;
                return def;
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.getGlobal = getGlobal;
            var _constants = __webpack_require__("./src/constants.js");
        },
        "./src/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _interface = __webpack_require__("./src/interface.js");
            Object.defineProperty(exports, "attach", {
                enumerable: !0,
                get: function() {
                    return _interface.attach;
                }
            });
            var _constants = __webpack_require__("./src/constants.js");
            Object.keys(_constants).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _constants[key];
                    }
                });
            });
        },
        "./src/interface.js": function(module, exports, __webpack_require__) {
            "use strict";
            function attach(moduleName, exportBuilder) {
                if (exportBuilders[moduleName]) throw new Error("Already attached " + moduleName);
                exportBuilders[moduleName] = exportBuilder;
            }
            function client() {
                var clientOptions = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                    env: _constants.DEFAULT_ENV
                };
                clientOptions = JSON.parse(JSON.stringify(clientOptions));
                (0, _validation.validateClientOptions)(clientOptions);
                var xports = {};
                Object.keys(exportBuilders).forEach(function(moduleName) {
                    (0, _util.extend)(xports, exportBuilders[moduleName]({
                        clientOptions: clientOptions
                    }));
                });
                return xports;
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.attach = attach;
            exports.client = client;
            var _util = __webpack_require__("./src/util.js"), _global = __webpack_require__("./src/global.js"), _validation = __webpack_require__("./src/validation.js"), _constants = __webpack_require__("./src/constants.js"), exportBuilders = (0, 
            _global.getGlobal)("exportBuilders", {});
            window[_constants.GLOBAL_NAMESPACE] = window[_constants.GLOBAL_NAMESPACE] || {};
            window[_constants.GLOBAL_NAMESPACE].client = window.client || client;
        },
        "./src/util.js": function(module, exports, __webpack_require__) {
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
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.extend = extend;
            exports.values = values;
            exports.isObject = isObject;
        },
        "./src/validation.js": function(module, exports, __webpack_require__) {
            "use strict";
            function validateClientOptions(_ref) {
                var env = _ref.env, auth = _ref.auth;
                if (env && -1 === (0, _util.values)(_constants.ENV).indexOf(env)) throw new Error("Invalid env: " + env);
                if (auth && !(0, _util.isObject)(auth)) throw new Error("Expected auth to be passed");
                if (auth && env && !auth[env]) throw new Error("Expected auth to be passed for env: " + env);
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.validateClientOptions = validateClientOptions;
            var _constants = __webpack_require__("./src/constants.js"), _util = __webpack_require__("./src/util.js");
        }
    });
});
//# sourceMappingURL=paypal-braintree-sdk-client.js.map
//# sourceMappingURL=paypal-braintree-sdk-client.js.map