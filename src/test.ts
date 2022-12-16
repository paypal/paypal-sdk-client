import { extendUrl, getScript, memoize } from "@krakenjs/belter/dist/esm";
import { SDK_QUERY_KEYS } from "@paypal/sdk-constants/dist/esm";

import { getHost, getPath } from "./global";
import { getSDKScript, getSDKAttributes } from "./script";
import { setupLogger } from "./tracking";

type ScriptSettings = {
  query?: Record<string, string>;
  attributes?: Record<string, string>;
};
const DEFAULT_QUERY = {
  [SDK_QUERY_KEYS.CLIENT_ID]: "abcxyz123",
};
const DEFAULT_ATTRIBUTES = {};
export function insertMockSDKScript({
  query = DEFAULT_QUERY,
  attributes = DEFAULT_ATTRIBUTES,
}: ScriptSettings = {}): string {
  const scripts = document.querySelectorAll('script[type="test/javascript"]');

  // TODO: check if OK to change the code in order getting rid of ts error
  scripts.forEach((script) => {
    if (script?.parentNode) {
      script.parentNode.removeChild(script);
    }
  });

  delete getScript.__inline_memoize_cache__;
  // @ts-expect-error __inline_memoize_cache__ is not properties of Functions
  delete getSDKScript.__inline_memoize_cache__;
  // @ts-expect-error __inline_memoize_cache__ is not properties of Functions
  delete getSDKAttributes.__inline_memoize_cache__;
  const script = document.createElement("script");
  script.setAttribute("type", "test/javascript");
  script.setAttribute("id", "test-sdk-script");
  const url = extendUrl(`https://${getHost()}${getPath()}`, {
    query: { ...DEFAULT_QUERY, ...query },
  });
  script.setAttribute("src", url);

  for (const key of Object.keys(attributes)) {
    script.setAttribute(key, attributes[parseInt(key)]);
  }

  if (!document.body) {
    throw new Error(`No document body found`);
  }

  document.body.appendChild(script);

  memoize.clear();
  setupLogger();
  return url;
}
