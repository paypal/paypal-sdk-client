import type { Experiment } from "@krakenjs/belter/src";
import { experiment } from "@krakenjs/belter/src";
import type { LoggerType } from "@krakenjs/beaver-logger/src";
import "@krakenjs/beaver-logger/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";

import { FPTI_STATE, FPTI_TRANSITION } from "./constants";
import { getLogger } from "./logger";

export function createExperiment(
  name: string,
  sample: number,
  logger?: typeof LoggerType
): typeof Experiment {
  const log = logger || getLogger();
  return experiment({
    name,
    sample,

    logTreatment({ treatment, payload }: { treatment: any; payload: any }) {
      // $FlowFixMe
      const fullPayload = {
        [FPTI_KEY.STATE]: FPTI_STATE.PXP,
        [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.PXP,
        [FPTI_KEY.EXPERIMENT_NAME]: name,
        [FPTI_KEY.TREATMENT_NAME]: treatment,
        ...payload,
      };
      log.track(fullPayload);
      log.flush();
    },

    logCheckpoint({
      treatment,
      checkpoint,
      payload,
    }: {
      treatment: any;
      checkpoint: any;
      payload: any;
    }) {
      if (treatment.indexOf(name) !== -1) {
        log.info(`${treatment}_${checkpoint}`, payload);
      } else {
        log.info(`${name}_${treatment}_${checkpoint}`, payload);
      }

      log.flush();
    },
  });
}
