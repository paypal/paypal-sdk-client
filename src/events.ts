import type { EventEmitterType } from "@krakenjs/belter/src";
import { memoize, eventEmitter } from "@krakenjs/belter/src";

export const getEventEmitter: () => typeof EventEmitterType =
  memoize(eventEmitter);
