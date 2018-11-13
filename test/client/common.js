/* @flow */

export const TEST_SDK_URL = 'https://test.paypal.com/sdk/js';

function createSDKScript() {
    const script = document.createElement('script');
    script.setAttribute('type', 'test/javascript');
    script.setAttribute('src', TEST_SDK_URL);

    if (!document.body) {
        throw new Error(`No document body found`);
    }

    document.body.appendChild(script);
}

function destroySDKScript() {
    const script = document.querySelector('script[type="test/javascript"]');

    if (!script) {
        throw new Error(`Expected sdk script to exist`);
    }

    if (!script.parentNode) {
        throw new Error(`Expected sdk script to have a parent`);
    }

    script.parentNode.removeChild(script);
}

window.console.karma = function consoleKarma() {
    let karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    karma.log('debug', arguments);
    console.log.apply(console, arguments); // eslint-disable-line no-console
};

beforeEach(() => {
    createSDKScript();
});

afterEach(() => {
    destroySDKScript();
});
