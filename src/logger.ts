import { Logger } from "@krakenjs/beaver-logger/dist/esm";
import type { LoggerType } from "@krakenjs/beaver-logger/dist/esm";
import { memoize } from "@krakenjs/belter/dist/esm";

import { getPayPalLoggerUrl } from "./domains";

type GetLogger = () => LoggerType;

export const getLogger: GetLogger = memoize(() => {
  return Logger({
    url: getPayPalLoggerUrl(),
  });
});
