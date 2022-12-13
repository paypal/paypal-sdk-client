## PayPal SDK Client

[![build status][build-badge]][build]
[![code coverage][coverage-badge]][coverage]
[![npm version][version-badge]][package]
[![apache license][license-badge]][license]

[build-badge]: https://img.shields.io/github/workflow/status/paypal/paypal-sdk-client/build?logo=github&style=flat-square
[build]: https://github.com/paypal/paypal-sdk-client/actions?query=workflow%3Abuild
[coverage-badge]: https://img.shields.io/codecov/c/github/paypal/paypal-sdk-client.svg?style=flat-square
[coverage]: https://codecov.io/github/paypal/paypal-sdk-client/
[version-badge]: https://img.shields.io/npm/v/@paypal/sdk-client.svg?style=flat-square
[package]: https://www.npmjs.com/package/@paypal/sdk-client
[license-badge]: https://img.shields.io/npm/l/@paypal/sdk-client.svg?style=flat-square
[license]: https://github.com/paypal/paypal-sdk-client/blob/main/LICENSE

A shared client for PayPal/Braintree client sdk modules. Has both client-side and server-side bindings to help you build and integrate an sdk component.

## Client

Your client-side sdk component can take advantage of any common utilities or functionality exposed by this module. For example:

- Determining the current paypal url
- Getting the merchant's client-id
- Running experiments.

```javascript
import { getClientID } from "@paypal/sdk-client/dist/esm";

fetch("https://api.paypal.com/v1/foo", {
	headers: {
		"client-id": getClientID(),
	},
});
```

## Server

This module helps you load the payments sdk in a child window, matching the url from the parent.

### Rationale

- You're building a component that is rendered into an iframe or popup window.
- Your component uses [zoid](https://github.com/krakenjs/zoid) to construct the component, and to communicate between the component and the parent page and vice-versa.
- You want to make sure the version of the component between the parent and child, to prevent any incompatibilities in the messaging protocol zoid defines (trust me on this one)
- You also want to take advantage of browser caching benefits, and not download dependencies like zoid multiple times in each new frame or window being rendered
- You can't just load `<script src="https://www.paypal.com/sdk/js?client-id=CLIENT_ID"></script>` in the child frame or popup, because different query params could have been passed on the top level page, and to take advantage of any caching benefits you need to match the url exactly as it appeared in the parent.
- You also probably want to avoid passing down all of the query params from `/sdk/js`, but that's a lot to keep track of, and you would need to update your code every time a new parameter is added.
- Or, you could pass the entire `https://www.paypal.com/sdk/js?client-id=xyz&...` url down from the parent to each new child; meaning we'll get an exact match each time, with exact the same version of the code, and any new url params will automatically be included without any more integration work.
- And of course, if we're doing that, we need to validate the url before we throw it into a script tag, to prevent xss or injection attacks

This module helps with that.

### On your server

1. Import `unpackSDKMeta`:

```javascript
import { unpackSDKMeta } from "@paypal/sdk-client";
```

2. Call `unpackSDKMeta` with `req.query.sdkMeta`, passed from the client in the query string, and pass the script tag in the page render.

```javascript
// Listen for requests to your app
app.get("/my-app", (req, res) => {
	// Unpack the sdk meta payload from the client
	const { getSDKLoader } = unpackSDKMeta(req.query.sdkMeta);

	// Call getSDKLoader to build a script tag, passing in csp nonce, if applicable
	const sdkScriptTag = getSDKLoader({ nonce });

	// Insert script tag into response
	res.send(`
        <body>
            <h1>My App</h1>
            ${sdkScriptTag}
        </body>
    `);
});
```

3. Ensure the `sdkMeta` payload is passed to the child window from the parent. If you are using [zoid](https://github.com/krakenjs/zoid) to construct your component, please add the following:

```javascript
import { getSdkMeta } from "@paypal/sdk-client/src";

let MyComponent = zoid.create({
	tag: "my-component",
	url: "https://www.paypal.com/my-component",
	props: {
		sdkMeta: {
			type: "string",
			value: getSdkMeta,
			queryParam: true,
		},
	},
});
```

If you are not using zoid, please use `getSdkMeta()` to construct the `sdkMeta` payload, and pass it to your child-window or frame in a different way.

**Notes:**

- The script tag should not introduce any extra latency. It has already been downloaded, pre-cached, and pre-parsed in the parent window. So it is usually safe to put in the `<head>` tag.
- Assuming a [zoid](https://github.com/krakenjs/zoid) component integration, `window.xprops`, containing the props used to receive data from the parent and used to send callbacks back to the parent window, will only be available after the script tag has completed loading on the client. If any other scripts require `window.xprops` immediately, please ensure the sdk script tag is placed before those scripts.
- `unpackSDKMeta` will throw an error if `req.query.sdkMeta` does not validate. This should be handled and translated into a 500 server error, indicating that the payload has been tampered with.
- `unpackSDKMeta` may be passed `undefined` if `req.query.sdkMeta` is not present. This is necessary for some legacy integrations where the sdk metadata is passed via `window.name` entirely on the client-side.

## Quick Start

#### Installing

```bash
npm install --save @paypal/sdk-client
```

#### Getting Started

- Fork the module
- Run setup: `npm run setup`
- Start editing code in `./src` and writing tests in `./tests`
- `npm run build`

#### Building

```bash
npm run build
```

#### Tests

- Edit tests in `./test/tests`
- Run the tests:

  ```bash
  npm test
  ```
