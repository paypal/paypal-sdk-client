import { noop } from "@krakenjs/belter/dist/esm";
import { beforeEach } from "vitest";

import { insertMockSDKScript } from "../../src";

function clearErrorListener() {
  // eslint-disable-next-line
  window.onerror = noop;
}

beforeEach(() => {
  clearErrorListener();
  insertMockSDKScript();
});

(window as any).console.karma = function consoleKarma(...args: any[]) {
  const karma =
    (window as any)?.karma ||
    (window as any)?.top?.karma ||
    (window as any)?.opener?.karma;
  karma.log("debug", args);
  (console as any).log.apply(console, args); // eslint-disable-line no-console
};
