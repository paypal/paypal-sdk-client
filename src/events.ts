import type { EventEmitterType } from "@krakenjs/belter/dist/esm";
import { memoize, eventEmitter } from "@krakenjs/belter/dist/esm";

export const getEventEmitter: () => typeof EventEmitterType =
  memoize(eventEmitter);
