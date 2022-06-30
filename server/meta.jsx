/* @flow */
/** @jsx node */

// eslint-disable-next-line import/no-nodejs-modules
import urlLib from "url";

import {
  ENV,
  SDK_PATH,
  SDK_QUERY_KEYS,
  SDK_SETTINGS,
} from "@paypal/sdk-constants";
import { node, html } from "@krakenjs/jsx-pragmatic";
import { ATTRIBUTES } from "@krakenjs/belter";

import {
  HOST,
  PROTOCOL,
  LEGACY_SDK_PATH,
  DEFAULT_SDK_META,
  DEFAULT_LEGACY_SDK_BASE_URL,
  DATA_ATTRIBUTES,
} from "./constants";
import { constHas, entries } from "./util";

type SDKMeta = {|
  getSDKLoader: (options?: {| baseURL?: string, nonce?: string |}) => string,
|};

const emailRegex = /^.+@.+$/;

function validatePaymentsSDKUrl({ pathname, query, hash }) {
  if (pathname !== SDK_PATH) {
    throw new Error(`Invalid path for sdk url: ${pathname || "undefined"}`);
  }

  // $FlowFixMe
  for (const [key, val] of entries(query)) {
    // $FlowFixMe
    if (!constHas(SDK_QUERY_KEYS, key)) {
      throw new Error(`Unexpected query key for sdk url: ${key}`);
    }

    if (!val) {
      throw new Error(`Unexpected empty query value for sdk url: ${key}`);
    }

    if (typeof val !== "string") {
      throw new TypeError(`Unexpected non-string key for sdk url: ${key}`);
    }

    if (!val.match(/^[a-zA-Z0-9+_,-@.]+$/) && !val.match(/^\*$/)) {
      throw new Error(
        `Unexpected characters in query key for sdk url: ${key}=${val}`
      );
    }

    // assume merchant-id values with an @ character are email addresses
    if (key === SDK_QUERY_KEYS.MERCHANT_ID && val.includes("@")) {
      const merchantValues = val.split(",");
      merchantValues.forEach((merchantValue) => {
        if (merchantValue.length > 320) {
          throw new Error(`Email is too long: ${merchantValue}`);
        }
        if (!emailRegex.test(merchantValue)) {
          throw new Error(`Malformed. merchant email: ${merchantValue}`);
        }
      });
    }
  }

  if (hash) {
    throw new Error(`Expected no hash to be passed in sdk url, got ${hash}`);
  }
}

function validateLegacySDKUrl({ pathname }) {
  if (!pathname.match(LEGACY_SDK_PATH)) {
    throw new Error(
      `Invalid path for legacy sdk url: ${pathname || "undefined"}`
    );
  }
}

function isLegacySDKUrl(hostname: string, pathname: string): boolean {
  const legacyHostnames = [HOST.PAYPALOBJECTS, HOST.PAYPALOBJECTS_CHINA];

  if (legacyHostnames.includes(hostname)) {
    return true;
  }

  const validHostnameEndings = [
    HOST.PAYPAL,
    HOST.PAYPAL_CHINA,
    HOST.PAYPALOBJECTS_QA,
  ];

  const isValidHostname = validHostnameEndings.some((validHostname) =>
    hostname.endsWith(validHostname)
  );

  if (isValidHostname && pathname.match(LEGACY_SDK_PATH)) {
    return true;
  }

  return false;
}

function isSDKUrl(hostname: string): boolean {
  if (hostname.endsWith(HOST.PAYPAL) || hostname.endsWith(HOST.PAYPAL_CHINA)) {
    return true;
  }

  return false;
}

function isLocalUrl(host: string): boolean {
  const localUrls = [
    HOST.LOCALHOST_8000,
    HOST.LOCALHOST_8443,
    HOST.LOCALTUNNEL,
  ];

  // eslint-disable-next-line no-process-env
  return (
    process.env.NODE_ENV === "development" &&
    localUrls.some((url) => host.includes(url))
  );
}

function validateHostAndPath(
  hostname: string | null,
  pathname: string | null
): { hostname: string, pathname: string } {
  if (!pathname || !hostname) {
    throw new Error(`Expected host and pathname to be passed for sdk url`);
  }
  return { hostname, pathname };
}

function validateSDKUrl(sdkUrl: string) {
  const {
    protocol,
    host,
    hostname: sourceHostname,
    pathname: sourcePathname,
    query,
    hash,
  } = urlLib.parse(sdkUrl, true);
  const { hostname, pathname } = validateHostAndPath(
    sourceHostname,
    sourcePathname
  );

  if (!sdkUrl.startsWith(PROTOCOL.HTTP) && !sdkUrl.startsWith(PROTOCOL.HTTPS)) {
    throw new Error(
      `Expected protocol for sdk url to be ${PROTOCOL.HTTP} or ${
        PROTOCOL.HTTPS
      } for host: ${hostname} - got ${protocol || "undefined"}`
    );
  }

  const hostnameMatchResults = hostname.match(/[a-z0-9\.\-]+/);

  if (!hostnameMatchResults || hostnameMatchResults[0] !== hostname) {
    throw new Error(`Expected a valid host: ${hostname}`);
  }

  if (isLegacySDKUrl(hostname, pathname)) {
    validateLegacySDKUrl({ pathname });
  } else if (isSDKUrl(hostname)) {
    if (hostname !== HOST.LOCALHOST && protocol !== PROTOCOL.HTTPS) {
      throw new Error(
        `Expected protocol for sdk url to be ${
          PROTOCOL.HTTPS
        } for host: ${hostname} - got ${protocol || "undefined"}`
      );
    }

    if (sdkUrl.match(/&{2,}/) || sdkUrl.match(/&$/)) {
      throw new Error(
        `Expected sdk url to not contain double ampersand or end in ampersand`
      );
    }

    validatePaymentsSDKUrl({ protocol, hostname, pathname, query, hash });
  } else if (host && !isLocalUrl(host)) {
    throw new Error(
      `Expected host to be a subdomain of ${HOST.PAYPAL} or ${HOST.PAYPALOBJECTS}`
    );
  }
}

type SDKAttributes = {|
  [string]: string | boolean,
|};

const getDefaultSDKAttributes = (): SDKAttributes => {
  // $FlowFixMe
  return {};
};

const ALLOWED_ATTRS = [
  SDK_SETTINGS.AMOUNT,
  SDK_SETTINGS.CLIENT_TOKEN,
  SDK_SETTINGS.MERCHANT_ID,
  SDK_SETTINGS.PARTNER_ATTRIBUTION_ID,
  SDK_SETTINGS.POPUPS_DISABLED,
  SDK_SETTINGS.ENABLE_3DS,
  SDK_SETTINGS.SDK_INTEGRATION_SOURCE,
  SDK_SETTINGS.CLIENT_METADATA_ID,
  ATTRIBUTES.UID,
  SDK_SETTINGS.CSP_NONCE,
];

function getSDKScriptAttributes(
  sdkUrl: ?string,
  allAttrs: ?{ [string]: string }
): SDKAttributes {
  const attrs = getDefaultSDKAttributes();

  if (sdkUrl) {
    const { hostname: sourceHostname, pathname: sourcePathname } = urlLib.parse(
      sdkUrl,
      true
    );
    const { hostname, pathname } = validateHostAndPath(
      sourceHostname,
      sourcePathname
    );

    if (isLegacySDKUrl(hostname, pathname)) {
      attrs[DATA_ATTRIBUTES.PAYPAL_CHECKOUT] = true;
      attrs[DATA_ATTRIBUTES.NO_BRIDGE] = true;
    }
  }

  for (const key in allAttrs) {
    if (ALLOWED_ATTRS.includes(key)) {
      attrs[key] = allAttrs[key];
    }
  }

  return attrs;
}

function sanitizeSDKUrl(sdkUrl: string): string {
  // eslint-disable-next-line compat/compat
  const url = new URL(sdkUrl);

  // remove query string params for checkout.js
  if (isLegacySDKUrl(url.hostname, url.pathname)) {
    url.search = "";
    url.hash = "";

    return url.toString();
  }

  return sdkUrl;
}

export function unpackSDKMeta(sdkMeta?: string): SDKMeta {
  const { url, attrs } = sdkMeta
    ? JSON.parse(Buffer.from(sdkMeta, "base64").toString("utf8"))
    : DEFAULT_SDK_META;

  if (url) {
    validateSDKUrl(url);
  }

  const getSDKLoader = ({
    baseURL = DEFAULT_LEGACY_SDK_BASE_URL,
    nonce = "",
  } = {}) => {
    if (url) {
      const validAttrs = getSDKScriptAttributes(url, attrs);

      // $FlowFixMe
      const allAttrs = {
        nonce,
        src: sanitizeSDKUrl(url),
        ...validAttrs,
      };

      return (<script {...allAttrs} />).render(html());
    }

    return (
      <script
        nonce={nonce}
        innerHTML={`
                    (function() {
                        function loadScript(url, attributes) {
                            var scriptTag = '<scr' + 'ipt src="' + url + '" ' + (attributes || '') + '></scr' + 'ipt>';
                            document.write(scriptTag);
                        }

                        function loadV4() {
                            if (!window.name || window.name.indexOf('xcomponent') !== 0) {
                                return;
                            }

                            var version = window.name.split('__')[2].replace(/_/g, '.');

                            if (!version.match(/^[0-9a-zA-Z.]+$/)) {
                                return;
                            }

                            if (version === '4' || version === 'latest') {
                                version = '';
                            }

                            var url = '${baseURL}checkout' + (version ? ('.' + version) : '') + '.js';
                            var attributes = '${DATA_ATTRIBUTES.PAYPAL_CHECKOUT} ${DATA_ATTRIBUTES.NO_BRIDGE}';

                            loadScript(url, attributes);
                        }

                        function loadV5() {
                            var ancestor = (window.parent && window.parent !== window)
                                ? window.parent
                                : window.opener;

                            if (!ancestor || !ancestor.document) {
                                return;
                            }

                            var v5script = ancestor.document.querySelector('script[src*="/sdk/js"]');

                            if (!v5script || !v5script.src) {
                                return;
                            }

                            loadScript(v5script.src);
                        }

                        try {
                            if (window.paypal && window.paypal.version) {
                                return;
                            }

                            loadV4();
                            loadV5();
                        } catch (err) {
                            return;
                        }
                    })();
                `}
      />
    ).render(html());
  };

  return {
    getSDKLoader,
  };
}
