PayPal/Braintree SDK Client
---------------------------

A shared client for PayPal/Braintree client sdk modules. Featuring:

- Shared configuration between modules:
  - Client-side merchant passed options
  - Shared module <-> module config
  - Server-side inlined configuration
- Inlinable into multiple client modules/components
  - Modules can tree-shake anything they don't need (e.g. config fetching)
- Decoupled client modules
  - All communication and sharing between components happens via the client
- Synchronous client
  - Individual modules/components can choose to render synchronously or asynchronously
  - Easy for dev to create client in single place and pass it around

### Installing

```bash
npm install --save paypal-braintree-sdk-client
```

### Integration

#### As an end user

Example of what merchants integrating with different modules in the SDK might call:

```javascript
// Add required modules
// Shared config can be modified at script load time

<script src=".../checkout.button.js" />
<script src=".../hosted.fields.js" />

// Initialize an instance of the client
// Shared config is immutable at client instance creation

try {
  var client = paypal.client({
    env: 'sandbox',
    auth: {
      sandbox: '__SANDBOX_AUTH_KEY__'
    }
  })
} catch(err) {
  console.log('There was a problem creating the client', err);
  // TODO: client == undefined at thsi point, blowing up the rest of the code.
  // TODO: maybe delaying all errors to `render` is the best option.
});

// Render PayPal Button

client.Button.render({
  ...
}).catch(function (err) {
  console.log('There was a problem creating rendering the paypal button', err);
});

// Render Hosted Fields
client.HostedFields.render({
  ...
}).then(function (hostedFieldsInstance) {
  // Merchant can do stuff with the component instances here

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    hostedFieldsInstance.tokenize(...)
  });
}).catch(function (err) {
  console.log('There was a problem creating rendering hosted fields', err);
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
	var options = JSON.parse(JSON.stringify(hostedFieldsOptions || {}));
	
	options.client = sdk.request;

        // Wait for server-side merchant config call to complete
        return getMerchantConfig.then(merchantConfig => {

          // Do some validation
          if (merchantConfig.merchant_is_blocked) {
            throw new Error('Nope!');
          }

          // Render hosted fields with passed in options and retrieved merchant config
          return renderHostedFields(options, merchantConfig);
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
