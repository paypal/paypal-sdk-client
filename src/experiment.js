/* @flow */


import { experiment, type Experiment } from '@krakenjs/belter/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { FPTI_STATE, FPTI_TRANSITION } from './constants';
import { getLogger } from './logger';

export function createExperiment(name : string, sample : number) : Experiment {
    const logger = getLogger();

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

            logger.track(fullPayload);
            logger.flush();
        },

        logCheckpoint({ treatment, checkpoint, payload }) {
            if (treatment.indexOf(name) !== -1) {
                logger.info(`${ treatment }_${ checkpoint }`, payload);
            } else {
                logger.info(`${ name }_${ treatment }_${ checkpoint }`, payload);
            }
            
            logger.flush();
        }
    });
}
