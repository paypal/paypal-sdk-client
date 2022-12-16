import {
  $mockEndpoint,
  patchXmlHttpRequest,
} from "@krakenjs/sync-browser-mocks/dist/sync-browser-mocks";
import { ZalgoPromise } from "@krakenjs/zalgo-promise";
import { getLogger, insertMockSDKScript } from "../../src";

describe("logger tests", () => {
  beforeAll(() => {
    patchXmlHttpRequest();
  });

  it("should log and flush with all expected keys", () => {
    insertMockSDKScript({
      query: {
        "client-id": "foobarbaz",
        "merchant-id": "hello123",
      },
      attributes: {
        "data-partner-attribution-id": "myattributionid",
        "data-sdk-integration-source": "spbf",
      },
    });
    const logger = getLogger();
    let logData: { events: any[]; tracking: any[] };
    const logEndpoint = $mockEndpoint.register({
      method: "POST",
      uri: `${window.location.protocol}//${window.location.host}/xoplatform/logger/api/logger`,
      handler: (req: { data: { events: any[]; tracking: any[] } }) => {
        logData = req.data;
        return {};
      },
    });

    (window as any).navigator.sendBeacon = (url: any, data: string) => {
      logData = JSON.parse(data);
    };

    logger.info("foo", { bar: "baz" });
    logger.track({ hello: "world" });
    logEndpoint.expectCalls();

    return logger.flush().then(() => {
      if (!logData) {
        throw new Error(`Expected log data to be populated`);
      }

      const event = logData.events.find(
        (e: { event: string }) => e.event === "foo"
      );

      if (!event) {
        throw new Error(`Expected to find foo event`);
      }

      const expectedPayload = {
        referer: window.location.host,
        env: "test",
        bar: "baz",
      };

      for (const key of Object.keys(expectedPayload)) {
        if (
          event.payload[parseInt(key)] !==
          expectedPayload[key as keyof typeof expectedPayload]
        ) {
          throw new Error(
            `Expected logger payload value ${key} to be ${
              expectedPayload[key as keyof typeof expectedPayload]
            } - got ${event.payload[parseInt(key)] as string}`
          );
        }
      }

      const expectedTracking = {
        feed_name: "payments_sdk",
        serverside_data_source: "checkout",
        client_id: "foobarbaz",
        seller_id: "hello123",
        page_session_id: /^[a-zA-Z0-9_-]+$/,
        referer_url: window.location.host,
        locale: "en_US",
        integration_identifier: "foobarbaz",
        bn_code: "myattributionid",
        sdk_name: "payments_sdk",
        sdk_version: "1.0.45",
        user_agent: window.navigator.userAgent,
        user_action: "commit",
        context_correlation_id: "abc123",
        sdk_integration_source: "spbf",
      };
      const tracking = logData.tracking.find((e) => e.hello === "world");

      if (!tracking) {
        throw new Error(`Expected to find hello=world event`);
      }

      for (const key of Object.keys(expectedTracking)) {
        if (!tracking[parseInt(key)]) {
          throw new Error(`Expected logger tracking value ${key} to be passed`);
        } else if (
          expectedTracking[key as keyof typeof expectedTracking] instanceof
            RegExp &&
          !tracking[parseInt(key)].match(
            expectedTracking[key as keyof typeof expectedTracking]
          )
        ) {
          throw new Error(
            `Expected logger tracking value ${key} to be ${expectedTracking[
              key as keyof typeof expectedTracking
            ].toString()} - got ${tracking[parseInt(key)] as string}`
          );
        } else if (
          typeof expectedTracking[key as keyof typeof expectedTracking] ===
            "string" &&
          tracking[parseInt(key)] !==
            expectedTracking[key as keyof typeof expectedTracking]
        ) {
          throw new Error(
            `Expected logger tracking value ${key} to be ${
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              expectedTracking[parseInt(key)] as string
            } - got ${tracking[parseInt(key)] as string}`
          );
        }
      }
    });
  });
  it("should auto-log on any unhandled errors", () => {
    const logger = getLogger();
    let logData: { events: any[]; tracking: any[] };
    const logEndpoint = $mockEndpoint.register({
      method: "POST",
      uri: `${window.location.protocol}//${window.location.host}/xoplatform/logger/api/logger`,
      handler: (req: { data: { events: any[]; tracking: any[] } }) => {
        logData = req.data;
        return {};
      },
    });

    (window as any).navigator.sendBeacon = (url: any, data: string) => {
      logData = JSON.parse(data);
    };

    ZalgoPromise.try(() => {
      throw new Error(`meep`);
    }).catch((err) => {
      throw new Error(err);
    });

    logEndpoint.expectCalls();
    return logger.flush().then(() => {
      if (!logData) {
        throw new Error(`Expected log data to be populated`);
      }

      const event = logData.events.find((e) => e.event === "unhandled_error");

      if (!event) {
        throw new Error(`Expected to find unhandled_error event`);
      }

      const expectedPayload = {
        err: /meep/,
      };

      for (const key of Object.keys(expectedPayload)) {
        if (!event.payload[parseInt(key)]) {
          throw new Error(`Expected logger tracking value ${key} to be passed`);
        } else if (
          expectedPayload[key as keyof typeof expectedPayload] instanceof
            RegExp &&
          !event.payload[parseInt(key)].match(
            expectedPayload[key as keyof typeof expectedPayload]
          )
        ) {
          throw new Error(
            `Expected logger tracking value ${key} to be ${expectedPayload[
              key as keyof typeof expectedPayload
            ].toString()} - got ${event.payload[parseInt(key)] as string}`
          );
        } else if (
          typeof expectedPayload[key as keyof typeof expectedPayload] ===
            "string" &&
          event.payload[parseInt(key)] !==
            expectedPayload[key as keyof typeof expectedPayload]
        ) {
          throw new Error(
            `Expected logger tracking value ${key} to be ${expectedPayload[
              key as keyof typeof expectedPayload
            ].toString()} - got ${event.payload[parseInt(key)] as string}`
          );
        }
      }

      const expectedTracking = {
        ext_error_code: "payments_sdk_error",
        ext_error_desc: /meep/,
      };
      const tracking = logData.tracking.find(
        (e) => e.ext_error_code === "payments_sdk_error"
      );

      if (!tracking) {
        throw new Error(
          `Expected to find ext_error_code=payments_sdk_error event`
        );
      }

      for (const key of Object.keys(expectedTracking)) {
        if (!tracking[parseInt(key)]) {
          throw new Error(`Expected logger tracking value ${key} to be passed`);
        } else if (
          expectedTracking[key as keyof typeof expectedTracking] instanceof
            RegExp &&
          !tracking[parseInt(key)].match(
            expectedTracking[key as keyof typeof expectedTracking]
          )
        ) {
          throw new Error(
            `Expected logger tracking value ${key} to be ${expectedTracking[
              key as keyof typeof expectedTracking
            ].toString()} - got ${tracking[parseInt(key)] as string}`
          );
        } else if (
          typeof expectedTracking[key as keyof typeof expectedTracking] ===
            "string" &&
          tracking[parseInt(key)] !==
            expectedTracking[key as keyof typeof expectedTracking]
        ) {
          throw new Error(
            `Expected logger tracking value ${key} to be ${
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              expectedTracking[parseInt(key)] as string
            } - got ${tracking[parseInt(key)] as string}`
          );
        }
      }
    });
  });
});
