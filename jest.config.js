import { sdkClientTestGlobals } from "./test/globals";

module.exports = {
  transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
  globals: {
    ...sdkClientTestGlobals,
    __ENV__: "test",
    __DEBUG__: false,
    __TEST__: true,
    __WEB__: false
  }
};
