/* @flow */

import { memoize, eventEmitter, type EventEmitterType } from 'belter/src';

export const getEventEmitter : () => EventEmitterType = memoize(eventEmitter);
