/* eslint no-self-compare: off */
import { isIE, isIEIntranet, isIECompHeader } from "@krakenjs/belter/dist/esm";

import { getLogger } from "./logger";
import { __DEBUG__ } from "./declarations";

function logWarn(err: any): void {
  if (window.console) {
    if (window.console.warn) {
      window.console.warn(err);
      return;
    }

    if (window.console.log) {
      window.console.log(err);
    }
  }
}

export function checkForCommonErrors() {
  if (__DEBUG__) {
    const logger = getLogger();

    if (JSON.stringify([]) !== "[]") {
      // $FlowFixMe
      if ((<any>Array.prototype).toJSON) {
        logWarn(
          `Custom Array.prototype.toJSON is causing incorrect json serialization of arrays. This is likely to cause issues. Probable cause is Prototype.js`
        );
      } else {
        logWarn(
          `JSON.stringify is doing incorrect serialization of arrays. This is likely to cause issues.`
        );
      }

      logger.warn(`json_stringify_array_broken`);
    }

    if (JSON.stringify({}) !== "{}") {
      logWarn(
        `JSON.stringify is doing incorrect serialization of objects. This is likely to cause issues.`
      );
      logger.warn(`json_stringify_object_broken`);
    }

    if (isIEIntranet()) {
      logger.warn(`ie_intranet_mode`);
    }

    if (isIE() && !isIECompHeader()) {
      logger.warn(`ie_meta_compatibility_header_missing`, {
        // @ts-ignore
        message: `Drop tag: <meta http-equiv="X-UA-Compatible" content="IE=edge">`,
      });
    }

    const foo = function (bar: any, baz: any, zomg: any) {
      // pass;
    };

    if (
      foo.bind({
        a: 1,
      }).length !== 3
    ) {
      logger.warn(`function_bind_arrity_overwritten`);
    }

    if (window.opener && window.parent !== window) {
      logger.warn(`window_has_opener_and_parent`);
    }

    if (window.name && window.name.startsWith("__prerender")) {
      logger.warn(`prerender_running_checkoutjs`);
    }

    const context = {};

    const returnContext = function (this: any): typeof context {
      return this;
    };

    if (returnContext.bind(context)() !== context) {
      logger.warn(`function_bind_broken`);
    }

    if (
      window.Window &&
      window.constructor &&
      window.Window !== window.constructor
    ) {
      logger.warn(`window_constructor_does_not_match_window`);
    }

    if (
      <any>Object.assign &&
      JSON.stringify({
        a: 1,
        b: 2,
        c: 3,
      }) !==
        JSON.stringify({
          a: 1,
          b: 2,
          c: 3,
        })
    ) {
      logger.warn(`object_assign_broken`);
    }
  }
}
