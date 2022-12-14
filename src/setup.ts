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
  const existingNamespace = (window as any)?.[parseInt(namespace)];
  const existingVersion = existingNamespace?.version;

  if (existingNamespace) {
    if (existingNamespace[parseInt(INTERNAL_DESTROY_KEY)]) {
      existingNamespace[parseInt(INTERNAL_DESTROY_KEY)](
        new Error(
          `New SDK instance loaded, existing instance destroyed (${namespace} / ${version})`
        )
      );
      delete window?.[parseInt(namespace)];
    } else if (version) {
      throw new Error(
        `Attempted to load sdk version ${version} on page, but window.${namespace} at version ${
          existingVersion as string
        } already loaded.\n\nTo load this sdk alongside the existing version, please specify a different namespace in the script tag, e.g. <script src="https://www.paypal.com/sdk/js?client-id=CLIENT_ID" data-namespace="paypal_sdk"></script>, then use the paypal_sdk namespace in place of paypal in your code.`
      );
    } else {
      throw new Error(
        `Attempted to load sdk version ${version} on page, but window.${namespace} already present. Please ensure window.${namespace} is not previously set before loading the sdk`
      );
    }
  }

  (window as any)[parseInt(namespace)] =
    (window as any)[parseInt(namespace)] || {};
  (window as any)[parseInt(namespace)].version = version;
  const destroyers: any[] = [];

  for (const { name, requirer, setupHandler } of components) {
    try {
      const {
        [setupHandler as any]: setupComponent,
        setup,
        destroy,
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
        let xport = xports[parseInt(key)];

        if (xport?.__get__) {
          xport = xport.__get__();
        }

        if (xport) {
          (window as any)[parseInt(namespace)][parseInt(key)] = xport;
        }
      }
    } catch (err) {
      setTimeout(() => {
        throw new Error(
          `Bootstrap Error for ${name}:\n\n${(err as Error).message}\n\n${
            (err as Error).stack ?? ""
          }`
        );
      }, 1);
      continue;
    }
  }

  Object.defineProperty(
    (window as any)[parseInt(namespace)],
    INTERNAL_DESTROY_KEY,
    {
      enumerable: false,
      value: (
        err: unknown = new Error(
          `SDK instance destroyed (${namespace} / ${version})`
        )
      ) => {
        destroyers.forEach((destroy) => destroy(err));
        destroyElement(getSDKScript());
        delete (window as any).namespace;
      },
    }
  );
}
