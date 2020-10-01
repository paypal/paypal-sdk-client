/* @flow */

import { memoize, eventEmitter } from 'belter/src';

export const getEventEmitter = memoize(eventEmitter);
