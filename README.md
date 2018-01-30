PayPal/Braintree SDK Client
---------------------------

A shared client for PayPal/Braintree client sdk modules. Featuring:

- Shared configuration between modules:
  - Client-side merchant passed options
  - Shared module <-> module config
  - Debounced server-side config fetching
- Inlinable into multiple client modules
  - Modules can tree-shake anything they don't need (e.g. config fetching)
- Decoupled client modules
- Synchronous client
  - Individual modules/components can choose to render synchronously or asynchronously
  - Easy to create client in single place and pass it around

### Installing

```bash
npm install --save paypal-braintree-sdk-client
```

### Integration

#### As an end user

Example of what merchants integrating with different modules in the SDK might call:

```javascript
// Add required modules

<script src=".../checkout.button.js" />
<script src=".../hosted.fields.js" />

// Initialize an instance of the cleint

var client = paypal.client({
  env: 'sandbox',
  auth: {
    sandbox: '__SANDBOX_AUTH_KEY__'
  }
});

// Render PayPal Button

client.Button.render({
  ...
});

// Render Hosted Fields

client.HostedFields.render({
  ...
});
```

#### As a module owner

Example of how `hosted.fields.js` might look:

```javascript
import sdk from 'paypal-braintree-sdk-client';

// Register hosted fields as taking care of rendering card fields, in shared config
// (to prevent smart-payment-buttons from rendering card buttons)
sdk.config
  .get(sdk.KEY.FUNDING_HANDLED)
  .push(sdk.FUNDING.CARD);

sdk.attach(options => {

  // Read the auth token from the config passed to `paypal.client()`
  let uct = options.auth[options.env];

  // Parse out config url and merchant id from uct
  let { configUrl, merchantID } = parseUCT(uct);

  // Make a call to get server config
  let getMerchantConfig = sdk.debounceGet(configUrl, {
    query: {
      merchantID: merchantID
    }
  });

  // Return the public interface for hosted fields
  // (this will be available on `client.HostedFields`)
  return {
    HostedFields: {
      render: (hostedFieldsOptions) => {

        // Wait for server-side merchant config call to complete
        return getMerchantConfig.then(merchantConfig => {

          // Do some validation
          if (merchantConfig.merchant_is_blocked) {
            throw new Error('Nope!');
          }

          // Render hosted fields with passed in options and retrieved merchant config
          return renderHostedFields(hostedFieldsOptions, merchantConfig);
        });
      }
    }
  };
});
```

Quick Start
-----------

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
  npm run test
  ```
