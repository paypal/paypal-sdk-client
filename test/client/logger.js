/* @flow */

import { $mockEndpoint, patchXmlHttpRequest } from 'sync-browser-mocks/dist/sync-browser-mocks';
import { ZalgoPromise } from 'zalgo-promise/src';

import { setupLogger, getLogger } from '../../src';

import { createSDKScript } from './common';

describe('logger tests', () => {

    before(() => {
        patchXmlHttpRequest();
        setupLogger();
    });

    it('should log and flush with all expected keys', () => {

        createSDKScript({
            query: {
                'client-id':   'foobarbaz',
                'merchant-id': 'hello123'
            },
            attributes: {
                'data-partner-attribution-id': 'myattributionid'
            }
        });

        let logger = getLogger();

        let logData;

        let logEndpoint = $mockEndpoint.register({
            method:  'POST',
            uri:     `${ window.location.protocol }//${ window.location.host }/xoplatform/logger/api/logger`,
            handler: (req) => {
                logData = req.data;
                return {};
            }
        });

        logger.info('foo', { bar: 'baz' });
        logger.track({ 'hello': 'world' });

        logEndpoint.expectCalls();

        return logger.flush().then(() => {

            if (!logData) {
                throw new Error(`Expected log data to be populated`);
            }

            let event = logData.events.find(e => (e.event === 'foo'));

            if (!event) {
                throw new Error(`Expected to find foo event`);
            }

            const expectedPayload = {
                referer: window.location.host,
                env:     'test',
                bar:     'baz'
            };

            for (let key of Object.keys(expectedPayload)) {
                if (event.payload[key] !== expectedPayload[key]) {
                    throw new Error(`Expected logger payload value ${ key } to be ${ expectedPayload[key] } - got ${ event.payload[key] }`);
                }
            }

            const expectedTracking = {
                feed_name:              'payments_sdk',
                serverside_data_source: 'payments_sdk',
                client_id:              'foobarbaz',
                seller_id:              'hello123',
                page_session_id:        /^[a-zA-Z0-9_-]+$/,
                referer_url:            window.location.host,
                locale:                 'fr_FR',
                buyer_cntry:            'FR',
                integration_identifier: 'foobarbaz',
                bn_code:                'myattributionid',
                sdk_name:               'payments_sdk',
                sdk_version:            '1.0.45',
                user_agent:             window.navigator.userAgent,
                user_action:            'commit',
                context_correlation_id: 'abc123'
            };

            const tracking = logData.tracking.find(e => (e.hello === 'world'));

            if (!tracking) {
                throw new Error(`Expected to find hello=world event`);
            }

            for (let key of Object.keys(expectedTracking)) {
                if (!tracking[key]) {
                    throw new Error(`Expected logger tracking value ${ key } to be passed`);
                } else if (expectedTracking[key] instanceof RegExp && !tracking[key].match(expectedTracking[key])) {
                    throw new Error(`Expected logger tracking value ${ key } to be ${ expectedTracking[key].toString() } - got ${ tracking[key] }`);
                } else if (typeof expectedTracking[key] === 'string' && tracking[key] !== expectedTracking[key]) {
                    throw new Error(`Expected logger tracking value ${ key } to be ${ expectedTracking[key] } - got ${ tracking[key] }`);
                }
            }
        });
    });

    it('should auto-log on any unhandled errors', () => {

        let logger = getLogger();

        let logData;

        let logEndpoint = $mockEndpoint.register({
            method:  'POST',
            uri:     `${ window.location.protocol }//${ window.location.host }/xoplatform/logger/api/logger`,
            handler: (req) => {
                logData = req.data;
                return {};
            }
        });

        ZalgoPromise.try(() => {
            throw new Error(`meep`);
        });

        logEndpoint.expectCalls();

        return logger.flush().then(() => {

            if (!logData) {
                throw new Error(`Expected log data to be populated`);
            }

            let event = logData.events.find(e => (e.event === 'unhandled_error'));

            if (!event) {
                throw new Error(`Expected to find unhandled_error event`);
            }

            const expectedPayload = {
                err: /meep/
            };

            for (let key of Object.keys(expectedPayload)) {
                if (!event.payload[key]) {
                    throw new Error(`Expected logger tracking value ${ key } to be passed`);
                } else if (expectedPayload[key] instanceof RegExp && !event.payload[key].match(expectedPayload[key])) {
                    throw new Error(`Expected logger tracking value ${ key } to be ${ expectedPayload[key].toString() } - got ${ event.payload[key] }`);
                } else if (typeof expectedPayload[key] === 'string' && event.payload[key] !== expectedPayload[key]) {
                    throw new Error(`Expected logger tracking value ${ key } to be ${ expectedPayload[key].toString() } - got ${ event.payload[key] }`);
                }
            }

            const expectedTracking = {
                ext_error_code: 'payments_sdk_error',
                ext_error_desc: /meep/
            };

            const tracking = logData.tracking.find(e => (e.ext_error_code === 'payments_sdk_error'));

            if (!tracking) {
                throw new Error(`Expected to find ext_error_code=payments_sdk_error event`);
            }

            for (let key of Object.keys(expectedTracking)) {
                if (!tracking[key]) {
                    throw new Error(`Expected logger tracking value ${ key } to be passed`);
                } else if (expectedTracking[key] instanceof RegExp && !tracking[key].match(expectedTracking[key])) {
                    throw new Error(`Expected logger tracking value ${ key } to be ${ expectedTracking[key].toString() } - got ${ tracking[key] }`);
                } else if (typeof expectedTracking[key] === 'string' && tracking[key] !== expectedTracking[key]) {
                    throw new Error(`Expected logger tracking value ${ key } to be ${ expectedTracking[key] } - got ${ tracking[key] }`);
                }
            }
        });
    });
});
