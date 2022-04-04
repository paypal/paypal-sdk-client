/* @flow */

import { memoize, eventEmitter, type EventEmitterType } from '@krakenjs/belter/src';

export const getEventEmitter : () => EventEmitterType = memoize(eventEmitter);
