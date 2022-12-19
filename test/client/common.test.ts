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
