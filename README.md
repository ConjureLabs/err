## Errors

Extending native errors, to give a little more context. "strings are not errors"

### Install

```sh
npm install --save @conjurelabs/err
```

or

```sh
yarn add @conjurelabs/err
```

### Usage

```js
const { ConjureError } = require('@conjurelabs/err');

throw new ConjureError('something happened');
```

### 'Friendly' Errors

Internal error dialogs may not be appropriate for end users. Default 'friendly' errors are set on ever Conjure error.

```js
const { NotFoundError } = require('@conjurelabs/err');

const err = new NotFoundError('sensitive message');

console.log(err.message); // sensitive message

console.log(err.friendlyError); // A needed resource was not found
```

This can be used to pass back non-sensitive errors to the client.

### HTTP Status Codes

Similar to 'friendly' errors, you may also want to know what http status code an error should associate to.

```js
const { PermissionsError } = require('@conjurelabs/err');

const err = new PermissionsError(`User doesn't have access`);

console.log(err.httpStatusCode); // 403
```

### Wrapping a Native Error

If you want to extend a native error, you can pass in the entire `err` instance.

```js
const { PermissionsError } = require('@conjurelabs/err');

try {
  await checkPermissions();
} catch(err) {
  throw new PermissionsError(err);
}
```

### Tests

```sh
npm test
npm run lint
```
