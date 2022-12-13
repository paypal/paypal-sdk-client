import { destroyElement } from "@krakenjs/belter/dist/esm";

import { getVersion } from "./global";
import { getSDKScript, getNamespace } from "./script";

export type SetupComponent<T> = {
  name: string;
  requirer: () => T;
  setupHandler?: string;
};
export function setupSDK(components: ReadonlyArray<SetupComponent<unknown>>) {
  const namespace = getNamespace();
  const version = getVersion();
  const INTERNAL_DESTROY_KEY = `__internal_destroy__`;
  const existingNamespace = (<any>window)[namespace];
  const existingVersion = existingNamespace && existingNamespace.version;

  if (existingNamespace) {
    if (existingNamespace[INTERNAL_DESTROY_KEY]) {
      existingNamespace[INTERNAL_DESTROY_KEY](
        new Error(
          `New SDK instance loaded, existing instance destroyed (${namespace} / ${version})`
        )
      );
      delete (<any>window)[namespace];
    } else if (version) {
      throw new Error(
        `Attempted to load sdk version ${version} on page, but window.${namespace} at version ${existingVersion} already loaded.\n\nTo load this sdk alongside the existing version, please specify a different namespace in the script tag, e.g. <script src="https://www.paypal.com/sdk/js?client-id=CLIENT_ID" data-namespace="paypal_sdk"></script>, then use the paypal_sdk namespace in place of paypal in your code.`
      );
    } else {
      throw new Error(
        `Attempted to load sdk version ${version} on page, but window.${namespace} already present. Please ensure window.${namespace} is not previously set before loading the sdk`
      );
    }
  }

  (<any>window)[namespace] = (<any>window)[namespace] || {};
  (<any>window)[namespace].version = version;
  const destroyers: any[] = [];

  for (const { name, requirer, setupHandler } of components) {
    try {
      const {
        // $FlowFixMe
        [<any>setupHandler]: setupComponent,
        // $FlowFixMe
        setup,
        // $FlowFixMe
        destroy,
        // $FlowFixMe
        ...xports
      }: any = requirer();

      if (setupComponent) {
        setupComponent();
      } else if (setup) {
        setup();
      }

      if (destroy) {
        destroyers.push(destroy);
      }

      for (const key of Object.keys(xports)) {
        let xport = xports[key];

        if (xport && xport.__get__) {
          xport = xport.__get__();
        }

        if (xport) {
          (<any>window)[namespace][key] = xport;
        }
      }
    } catch (err) {
      setTimeout(() => {
        throw new Error(
          `Bootstrap Error for ${name}:\n\n${(err as Error).message}\n\n${
            (err as Error).stack
          }`
        );
      }, 1);
      continue;
    }
  }

  Object.defineProperty((<any>window)[namespace], INTERNAL_DESTROY_KEY, {
    enumerable: false,
    value: (
      err: unknown = new Error(
        `SDK instance destroyed (${namespace} / ${version})`
      )
    ) => {
      destroyers.forEach((destroy) => destroy(err));
      destroyElement(getSDKScript());
      delete (<any>window)[namespace];
    },
  });
}
