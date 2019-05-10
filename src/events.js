/* @flow */

import { inlineMemoize, eventEmitter, type EventEmitterType } from 'belter/src';

export function getEventEmitter() : EventEmitterType {
    return inlineMemoize(getEventEmitter, () => eventEmitter());
}
