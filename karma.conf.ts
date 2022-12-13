/* eslint import/no-default-export: off */
// @ts-ignore
import { getKarmaConfig } from "@krakenjs/karma-config-grumbler";
import { WEBPACK_CONFIG_TEST } from "./webpack.config";
export default function configKarma(karma: Record<string, any>) {
  const karmaConfig = getKarmaConfig(karma, {
    basePath: __dirname,
    webpack: WEBPACK_CONFIG_TEST,
  });
  karma.set({
    ...karmaConfig,
    coverageReporter: {
      reporters: [
        {
          type: "lcov",
          dir: "coverage/karma",
        },
      ],
    },
  });
}
