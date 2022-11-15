import { noop } from "@krakenjs/belter/src";
import { beforeEach } from "vitest";

import { insertMockSDKScript } from "../../src";

function clearErrorListener() {
  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = noop;
}

beforeEach(() => {
  clearErrorListener();
  insertMockSDKScript();
});

(<any>window.console).karma = function consoleKarma() {
  const karma =
    (<any>window).karma ||
    (window.top && (<any>window.top).karma) ||
    (window.opener && window.opener.karma);
  karma.log("debug", arguments);
  (<any>console.log).apply(console, arguments); // eslint-disable-line no-console
};
