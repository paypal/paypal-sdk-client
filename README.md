Braintree-PayPal Client Config
------------------------------

Shared configuration between Braintree / PayPal client sdk modules, to allow sharing configuration between integrations and avoiding exposing additional complexity for the integrating party.

This allows the different modules to:
- Remain decoupled
- Operate independently, or together, depending on the client's needs
- Share information in the background to provide the ideal rendering experience

### Installing

```bash
npm install --save paypal-braintree-sdk-client
```

### Example

As the config setter:

```
import { set, KEYS } from 'paypal-braintree-sdk-client';

set(KEYS.ALLOW_FOO, true);
```

As the config getter:

```
import { get, KEYS } from 'paypal-braintree-sdk-client';

if (get(KEYS.ALLOW_FOO)) {
    doFoo();
}
```

### Methods

#### `get(<key>, [default])`

Get the current value for the given key, returns `undefined` if unset or `default` if specified

#### `set(<key>, <value>)`

Set the value under the given key.

#### `get_or_set(<key>, <value>)`

Gets the value if it is available, otherwise sets a new value.

#### `on(<key>, <handler>)`

Calls the `handler` every time the key is set. Good for reading configuration values which may change over time.

### Keys

#### `LOGGER_SESSION_ID`

Specify a shared id to send with logs, to correlate between different modules.

```javascript
// Set a shared session id or get an existing session id
let sessionID = get_or_set(KEY.LOGGER_SESSION_ID, 'abcdef12345');
```

#### `PAYPAL_FUNDING_DISALLOW`

Specify an array of funding sources to inhibit.

```javascript
// Disallow paypal from rendering card (credit/debit) butttons
set(KEY.PAYPAL_FUNDING_DISALLOW, [ PAYPAL_FUNDING.CARD ]);
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
