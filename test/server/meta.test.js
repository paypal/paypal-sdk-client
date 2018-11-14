/* @flow */

import { unpackSDKMeta } from '../../server';

test('should unpack a valid sdk meta bundle', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo';

    const { url } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    if (url !== sdkUrl) {
        throw new Error(`Expected url to be ${ sdkUrl } - got ${ url }`);
    }
});

test('should consruct a valid script url', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo';
    const sdkScript = `<script src="${ sdkUrl }"></script>`;

    const { getScriptTag } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const script = getScriptTag();

    if (script !== sdkScript) {
        throw new Error(`Expected script to be ${ sdkScript } - got ${ script }`);
    }
});

test('should consruct a valid script url with paypalobjects', () => {

    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.js';
    const sdkScript = `<script src="${ sdkUrl }"></script>`;

    const { getScriptTag } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const script = getScriptTag();

    if (script !== sdkScript) {
        throw new Error(`Expected script to be ${ sdkScript } - got ${ script }`);
    }
});

test('should consruct a valid minified script url with paypalobjects', () => {

    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.min.js';
    const sdkScript = `<script src="${ sdkUrl }"></script>`;

    const { getScriptTag } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const script = getScriptTag();

    if (script !== sdkScript) {
        throw new Error(`Expected script to be ${ sdkScript } - got ${ script }`);
    }
});

test('should consruct a valid versioned script url with paypalobjects', () => {

    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.4.0.125.js';
    const sdkScript = `<script src="${ sdkUrl }"></script>`;

    const { getScriptTag } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const script = getScriptTag();

    if (script !== sdkScript) {
        throw new Error(`Expected script to be ${ sdkScript } - got ${ script }`);
    }
});

test('should consruct a valid versioned minified script url with paypalobjects', () => {

    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.4.0.125.min.js';
    const sdkScript = `<script src="${ sdkUrl }"></script>`;

    const { getScriptTag } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const script = getScriptTag();

    if (script !== sdkScript) {
        throw new Error(`Expected script to be ${ sdkScript } - got ${ script }`);
    }
});

test('should consruct a valid localhost script url', () => {

    const sdkUrl = 'http://localhost.paypal.com:8000/sdk/js?client-id=foo';
    const sdkScript = `<script src="${ sdkUrl }"></script>`;

    const { getScriptTag } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const script = getScriptTag();

    if (script !== sdkScript) {
        throw new Error(`Expected script to be ${ sdkScript } - got ${ script }`);
    }
});

test('should unpack a valid sdk meta bundle with a component', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo&components=buttons';

    const { url } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    if (url !== sdkUrl) {
        throw new Error(`Expected url to be ${ sdkUrl } - got ${ url }`);
    }
});

test('should unpack a valid sdk meta bundle with multiple components', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo&components=buttons,hosted-fields';

    const { url } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    if (url !== sdkUrl) {
        throw new Error(`Expected url to be ${ sdkUrl } - got ${ url }`);
    }
});

test('should error out with an unsecure protocol', () => {

    const sdkUrl = 'http://www.paypal.com/sdk/js?client-id=foo&';
    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});


test('should error out with an invalid protocol', () => {

    const sdkUrl = 'meep://www.paypal.com/sdk/js?client-id=foo';
    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});

test('should error out with an invalid protocol in localhost', () => {

    const sdkUrl = 'meep://localhost.paypal.com:8000/sdk/js?client-id=foo';
    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});

test('should error out with no path', () => {

    const sdkUrl = 'https://www.paypal.com?client-id=foo';
    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});

test('should error out with an invalid path', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/meep?client-id=foo';
    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});

test('should error out with an invalid legacy path', () => {

    const sdkUrl = 'https://www.paypalobjects.com/foo.js';
    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});

test('should error out with an empty query param', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=';
    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});

test('should error out with a duplicated query param', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo&client-id=bar';
    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});

test('should error out with an invalid query param', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo&foo=bar';
    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});

test('should error out with an invalid query value', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id="foo"';
    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});

test('should error out with a hash', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo#bar';
    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});

