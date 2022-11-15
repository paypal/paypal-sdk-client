import { Logger } from "@krakenjs/beaver-logger/src";
import type { LoggerType } from "@krakenjs/beaver-logger/src";
import { memoize } from "@krakenjs/belter/src";

import { getPayPalLoggerUrl } from "./domains";

type GetLogger = () => typeof LoggerType;

export const getLogger: GetLogger = memoize(() => {
  return Logger({
    url: getPayPalLoggerUrl(),
  });
});
