/* @flow */
/* eslint max-lines: off */

import cheerio from 'cheerio';

import { unpackSDKMeta } from '../../server';

afterEach(() => {
    // eslint-disable-next-line no-process-env
    process.env.NODE_ENV = 'test';
});

test('should construct a valid script url', () => {

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

test('should construct a valid script url with data-popups-disabled attribute', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url:   sdkUrl,
        attrs: { 'data-popups-disabled': 'true' }
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const dataPopUsDisabled = $('script').attr('data-popups-disabled');

    if (dataPopUsDisabled !== 'true') {
        throw new Error(`Expected dataPopUsDisabled to be true  - got ${ dataPopUsDisabled }`);
    }
});

test('should construct a valid script url with paypalobjects', () => {

    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.js';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const script = $('script[data-paypal-checkout]');
    const src = script.attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should construct a valid script url with checkout.js using the qa cdn', () => {

    const sdkUrl = 'https://uideploy--staticcontent--7482d416a81b5--ghe.preview.dev.paypalinc.com/api/checkout.js';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const script = $('script[data-paypal-checkout]');
    const src = script.attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should construct a valid script url with checkout.js on localhost', () => {

    const sdkUrl = 'http://localhost.paypal.com:8000/api/checkout.js';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const script = $('script[data-paypal-checkout]');
    const src = script.attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should construct a script url with checkout.js on localhost without a paypal.com domain', () => {
    // eslint-disable-next-line no-process-env
    process.env.NODE_ENV = 'development';

    const sdkUrl = 'http://localhost:8000/api/checkout.js';

    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (error) {
        throw new Error(`Should construct script with localhost url`);
    }
});

test('should not construct a script url with checkout.js for non-supported local urls', () => {
    // eslint-disable-next-line no-process-env
    process.env.NODE_ENV = 'development';

    const sdkUrl = 'http://not.a.supported.url:8000/api/checkout.js';

    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Should construct script with supported local urls: (localhost, loca.lt)`);
    }
});

test('should construct a valid minified script url with paypalobjects', () => {

    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.min.js';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const script = $('script[data-paypal-checkout]');
    const src = script.attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should prevent query string parameters with checkout.js', () => {

    const sdkUrl = 'https://www.sandbox.paypal.com/cgi-bin/webscr/checkout.js?cmd=_flow&CONTEXT=wtgSziM4oze46J3pBRQ';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const script = $('script[data-paypal-checkout]');
    const src = script.attr('src');

    // eslint-disable-next-line compat/compat
    const urlObject = new URL(sdkUrl);
    // we expect the query string params to be stripped out for v4
    urlObject.search = '';
    const expectedUrl = urlObject.toString();

    if (src !== expectedUrl) {
        throw new Error(`Expected script url to be ${ expectedUrl } - got ${ src }`);
    }
});

test('should construct a valid versioned script url with paypalobjects', () => {

    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.4.0.125.js';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const script = $('script[data-paypal-checkout]');
    const src = script.attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should construct a valid versioned minified script url with paypalobjects', () => {

    const sdkUrl = 'https://www.paypalobjects.com/api/checkout.4.0.125.min.js';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const script = $('script[data-paypal-checkout]');
    const src = script.attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should construct a valid localhost script url', () => {

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

test('should unpack a valid sdk meta bundle with multiple merchant-id email addresses', () => {
    const emails = [
        'test@gmail.com',
        'foo@bar.com',
        'test@test.org.uk',
        'test-test@test.com',
        'test.test@test.com',
        'test@test@test.com'
    ];

    const sdkUrl = `https://www.paypal.com/sdk/js?client-id=foo&merchant-id=${ emails.map(anEmail => encodeURIComponent(anEmail)).join(',') }`;

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should error out from invalid merchant-id email addresses', () => {
    const emails = [
        '@',
        '@io',
        '@test.com',
        'name@'
    ];

    emails.forEach(email => {
        const sdkUrl = `https://www.paypal.com/sdk/js?client-id=foo&merchant-id=${ email }`;
        let error;

        try {
            unpackSDKMeta(Buffer.from(JSON.stringify({
                url: sdkUrl
            })).toString('base64'));
        } catch (err) {
            error = err;
        }

        if (!error) {
            throw new Error(`Expected error to be thrown for ${ sdkUrl }`);
        }
    });
});

test('should error from very long merchant-id email addresses', () => {
    const longEmail = `${ 'a-very-long-email'.repeat(20) }@a-very-long-domain.com`;
    const sdkUrl = `https://www.paypal.com/sdk/js?client-id=foo&merchant-id=${ longEmail }`;
    let error;

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrl
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown for ${ sdkUrl }`);
    }
});

test('should construct a valid script url with multiple merchant ids', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo';
    const merchantId = 'abcd1234, abcd5678';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url:   sdkUrl,
        attrs: {
            'data-merchant-id':  merchantId
        }
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');
    const dataMerchantId = $('script').attr('data-merchant-id');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }

    if (dataMerchantId !== merchantId) {
        throw new Error(`Expected data-merchant-id to be ${ merchantId } - got ${ dataMerchantId }`);
    }
});

test('should construct a valid script url with a single merchant id in the url', () => {

    const merchantId = 'UYEGJNV75RAJQ';
    const sdkUrl = `https://www.paypal.com/sdk/js?client-id=foo&merchant-id=${ merchantId }`;

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url:   sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should construct a valid script url without invalid attributes', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url:   sdkUrl,
        attrs: {
            'data-dummy-id':  'abcd'
        }
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');
    const result = $('script').attr('data-dummy-id');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }

    if (result !== undefined) {
        throw new Error(`Expected invalid attribute to be undefined - got ${ result }`);
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

test('should error out with an invalid host', () => {

    const sdkUrl = 'https://?client-id=foo';
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

test('should construct a valid loader even when no url passed', () => {
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
    const scriptz = $$('script[data-paypal-checkout]');
    const src = scriptz.attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should construct a valid minified loader even when no url passed', () => {
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

test('should construct a valid version loader even when no url passed', () => {
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

test('should construct a valid loader even when no url passed with version 4', () => {
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
    const scriptz = $$('script[data-paypal-checkout]');
    const src = scriptz.attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should construct a valid loader even when no url passed with version 5 in a popup', () => {
    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foobarbaz';

    const { getSDKLoader } = unpackSDKMeta();

    const $ = cheerio.load(getSDKLoader());
    const script = $('script').html();

    let scriptTag;

    // eslint-disable-next-line no-unused-vars
    const window = {
        opener: {
            document: {
                querySelector: (selector) => {
                    if (selector !== 'script[src*="/sdk/js"]') {
                        throw new Error(`Expected selector to be 'script[src*="/sdk/js"]', got ${ selector }`);
                    }

                    return {
                        src: sdkUrl
                    };
                }
            }
        }
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
    const scriptz = $$('script');
    const src = scriptz.attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should construct a valid loader even when no url passed with version 5 in an iframe', () => {
    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foobarbaz';

    const { getSDKLoader } = unpackSDKMeta();

    const $ = cheerio.load(getSDKLoader());
    const script = $('script').html();

    let scriptTag;

    // eslint-disable-next-line no-unused-vars
    const window = {
        parent: {
            document: {
                querySelector: (selector) => {
                    if (selector !== 'script[src*="/sdk/js"]') {
                        throw new Error(`Expected selector to be 'script[src*="/sdk/js"]', got ${ selector }`);
                    }

                    return {
                        src: sdkUrl
                    };
                }
            }
        }
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
    const scriptz = $$('script');
    const src = scriptz.attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should error out if a non http or https url passed', () => {

    const sdkUrl = 'data://www.paypalobjects.com/api/checkout.js';

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

test('should error out if a non http or https url passed for the sdk', () => {

    const sdkUrl = 'data://www.paypal.com/sdk/js?client-id=foo';

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

test('should error out if special characters are passed in the checkout.js path', () => {

    const sdkUrl = 'https://www.paypalobjects.com/**/checkout.js';

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

test('should error out if a double && passed in the sdk url', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo&&currency=USD';

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

test('should error out if sdk url ends with &', () => {

    const sdkUrl = 'https://www.paypal.com/sdk/js?client-id=foo&';

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

test('should construct a valid script url with paypalobjects on http', () => {

    const sdkUrl = 'http://www.paypalobjects.com/api/checkout.js';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const script = $('script[data-paypal-checkout]');
    const src = script.attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should construct a valid min script url with paypalobjects on http', () => {

    const sdkUrl = 'http://www.paypalobjects.com/api/checkout.min.js';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const script = $('script[data-paypal-checkout]');
    const src = script.attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should construct a valid script url hosted on objects.paypal.cn', () => {

    const sdkUrl = 'http://www.objects.paypal.cn/api/checkout.js';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const script = $('script[data-paypal-checkout]');
    const src = script.attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should construct a valid script url hosted on www.paypal.cn', () => {

    const sdkUrl = 'https://www.paypal.cn/sdk/js?client-id=foo';

    const { getSDKLoader } = unpackSDKMeta(Buffer.from(JSON.stringify({
        url: sdkUrl
    })).toString('base64'));

    const $ = cheerio.load(getSDKLoader());
    const src = $('script').attr('src');

    if (src !== sdkUrl) {
        throw new Error(`Expected script url to be ${ sdkUrl } - got ${ src }`);
    }
});

test('should error when the script url does not start with "https://" or "http://"', () => {
    const sdkUrl = '\uFEFFhttps://www.paypal.com/sdk/js?client-id=foo';
    const sdkUrlLegacy = '\uFEFFhttp://www.paypalobjects.com/api/checkout.js';

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

    try {
        unpackSDKMeta(Buffer.from(JSON.stringify({
            url: sdkUrlLegacy
        })).toString('base64'));
    } catch (err) {
        error = err;
    }

    if (!error) {
        throw new Error(`Expected error to be thrown`);
    }
});

test('should error when invalid characters are found in the subdomain - we allow letters, numbers, . and -', () => {
    const sdkUrl = 'https://\uff3cU0022\uff3cU003E\uff3cU003C\uff3cU002Fscript\uff3cU003E\uff3cU003Ciframe\uff3cU0020srcdoc\uff3cU003D\uff3cU0027.www.paypal.com/sdk/js?client-id=foo';

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
