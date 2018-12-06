/* @flow */
/* eslint max-lines: off */

import cheerio from 'cheerio';

import { unpackSDKMeta } from '../../server';

test('should consruct a valid script url', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should consruct a valid script url with paypalobjects', () => {

    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.js';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should consruct a valid minified script url with paypalobjects', () => {

    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.min.js';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should consruct a valid versioned script url with paypalobjects', () => {

    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.4.0.125.js';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should consruct a valid versioned minified script url with paypalobjects', () => {

    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.4.0.125.min.js';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should consruct a valid localhost script url', () => {

    const sdkUrl = 'http://localhost.paypal.com:8000/sdk/js?client-id=foo';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should unpack a valid sdk meta bundle with a component', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo&components=buttons';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should unpack a valid sdk meta bundle with multiple components', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo&components=buttons,hosted-fields';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should consruct a valid script url with a custom stage host', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo';
    const stageHost = 'www.msfoo.qa.paypal.com';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl,
        stageHost
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');
    const dataStageHost = $('script').attr('data-stage-host');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }

    if (dataStageHost !== stageHost) {
        throw new Error(`Expected stage host to be ${ stageHost } - got ${ dataStageHost }`);
    }
});

test('should consruct a valid script url with a custom api stage host', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo';
    const apiStageHost = 'api.msbar.qa.paypal.com';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl,
        apiStageHost
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');
    const dataApiStageHost = $('script').attr('data-api-stage-host');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }

    if (dataApiStageHost !== apiStageHost) {
        throw new Error(`Expected stage host to be ${ apiStageHost } - got ${ dataApiStageHost }`);
    }
});

test('should consruct a valid script url with both a custom stage host and custom api stage host', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo';
    const stageHost = 'www.msfoo.qa.paypal.com';
    const apiStageHost = 'api.msbar.qa.paypal.com';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl,
        stageHost,
        apiStageHost
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');
    const dataStageHost = $('script').attr('data-stage-host');
    const dataApiStageHost = $('script').attr('data-api-stage-host');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }

    if (dataStageHost !== stageHost) {
        throw new Error(`Expected stage host to be ${ stageHost } - got ${ dataStageHost }`);
    }

    if (dataApiStageHost !== apiStageHost) {
        throw new Error(`Expected stage host to be ${ apiStageHost } - got ${ dataApiStageHost }`);
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

test('should consruct a valid loader even when no url passed', () => {
    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.js';

    const { getSDKLoader } = unpackSDKMeta();

    const $ = cheerio.load(getSDKLoader());
    const script = $('script').html();

    let scriptTag;

    // eslint-disable-next-line no-unused-vars
    const window = {
        name: 'xcomponent__ppcheckout__latest__abc12345'
    };

    // eslint-disable-next-line no-unused-vars
    const document = {
        write: (html) => {
            scriptTag = html;
        }
    };

    // eslint-disable-next-line no-eval, security/detect-eval-with-expression
    eval(script);

    const $$ = cheerio.load(scriptTag);
    const src = $$('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should consruct a valid minified loader even when no url passed', () => {
    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.min.js';

    const { getSDKLoader } = unpackSDKMeta();

    const $ = cheerio.load(getSDKLoader());
    const script = $('script').html();

    let scriptTag;

    // eslint-disable-next-line no-unused-vars
    const window = {
        name: 'xcomponent__ppcheckout__min__abc12345'
    };

    // eslint-disable-next-line no-unused-vars
    const document = {
        write: (html) => {
            scriptTag = html;
        }
    };

    // eslint-disable-next-line no-eval, security/detect-eval-with-expression
    eval(script);

    const $$ = cheerio.load(scriptTag);
    const src = $$('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should consruct a valid version loader even when no url passed', () => {
    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.4.0.435.js';

    const { getSDKLoader } = unpackSDKMeta();

    const $ = cheerio.load(getSDKLoader());
    const script = $('script').html();

    let scriptTag;

    // eslint-disable-next-line no-unused-vars
    const window = {
        name: 'xcomponent__ppcheckout__4_0_435__abc12345'
    };

    // eslint-disable-next-line no-unused-vars
    const document = {
        write: (html) => {
            scriptTag = html;
        }
    };

    // eslint-disable-next-line no-eval, security/detect-eval-with-expression
    eval(script);

    const $$ = cheerio.load(scriptTag);
    const src = $$('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should consruct a valid loader even when no url passed with version 4', () => {
    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.js';

    const { getSDKLoader } = unpackSDKMeta();

    const $ = cheerio.load(getSDKLoader());
    const script = $('script').html();

    let scriptTag;

    // eslint-disable-next-line no-unused-vars
    const window = {
        name: 'xcomponent__ppcheckout__4__abc12345'
    };

    // eslint-disable-next-line no-unused-vars
    const document = {
        write: (html) => {
            scriptTag = html;
        }
    };

    // eslint-disable-next-line no-eval, security/detect-eval-with-expression
    eval(script);

    const $$ = cheerio.load(scriptTag);
    const src = $$('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should error out if the custom stage host is not a paypal domain', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo';
    const stageHost = 'www.msfoo.qa.paypal.com.meep.com';

    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl,
            stageHost
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});

test('should error out if the custom stage host has a path', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo';
    const stageHost = 'www.msfoo.qa.paypal.com/blerp';

    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl,
            stageHost
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});

test('should error out if the custom api stage host is not a paypal domain', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo';
    const apiStageHost = 'api.msbar.qa.paypal.com.meep.com';

    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl,
            apiStageHost
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});

test('should error out if the custom api stage host has a path', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo';
    const apiStageHost = 'api.msbar.qa.paypal.com/blerp';

    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl,
            apiStageHost
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});
