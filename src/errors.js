/* @flow */
/* eslint no-self-compare: off */

import { isIE, isIEIntranet, isIECompHeader } from "@krakenjs/belter/src";

import { getLogger } from "./logger";

function logWarn(err): void {
  if (window.console) {
    if (window.console.warn) {
      return window.console.warn(err);
    }

    if (window.console.log) {
      return window.console.log(err);
    }
  }
}

export function checkForCommonErrors() {
  if (__DEBUG__) {
    const logger = getLogger();

    if (JSON.stringify([]) !== "[]") {
      // $FlowFixMe
      if (Array.prototype.toJSON) {
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
        message: `Drop tag: <meta http-equiv="X-UA-Compatible" content="IE=edge">`,
      });
    }

    // eslint-disable-next-line no-unused-vars
    const foo = function (bar, baz, zomg) {
      // pass;
    };

    if (foo.bind({ a: 1 }).length !== 3) {
      logger.warn(`function_bind_arrity_overwritten`);
    }

    if (window.opener && window.parent !== window) {
      logger.warn(`window_has_opener_and_parent`);
    }

    if (window.name && window.name.indexOf("__prerender") === 0) {
      logger.warn(`prerender_running_checkoutjs`);
    }

    const context = {};

    const returnContext = function (): typeof context {
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
      Object.assign &&
      JSON.stringify({ a: 1, b: 2, c: 3 }) !==
        JSON.stringify({ a: 1, b: 2, c: 3 })
    ) {
      logger.warn(`object_assign_broken`);
    }
  }
}
