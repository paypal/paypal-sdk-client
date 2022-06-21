/* @flow */


import { experiment, type Experiment } from '@krakenjs/belter/src';
import { type LoggerType } from '@krakenjs/beaver-logger/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { FPTI_STATE, FPTI_TRANSITION } from './constants';
import { getLogger } from './logger';

export function createExperiment(name : string, sample : number, logger? : LoggerType) : Experiment {
    const log = logger || getLogger();

    return experiment({
        name,
        sample,

        logTreatment({ treatment, payload }) {
            // $FlowFixMe
            const fullPayload = {
                [FPTI_KEY.STATE]:           FPTI_STATE.PXP,
                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.PXP,
                [FPTI_KEY.EXPERIMENT_NAME]: name,
                [FPTI_KEY.TREATMENT_NAME]:  treatment,
                ...payload
            };

            log.track(fullPayload);
            log.flush();
        },

        logCheckpoint({ treatment, checkpoint, payload }) {
            if (treatment.indexOf(name) !== -1) {
                log.info(`${ treatment }_${ checkpoint }`, payload);
            } else {
                log.info(`${ name }_${ treatment }_${ checkpoint }`, payload);
            }

            log.flush();
        }
    });
}
