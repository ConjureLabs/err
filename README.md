## Errors

Extending native errors, to give a little more context. "strings are not errors"

### Install

```sh
npm install err@ConjureLabs/err
```

### Usage

```js
const ConjureError = require('err');

throw new ConjureError('something happened');
```

You can pass another error if you want to wrap it.

```js
const { PermissionsError } = require('err');

try {
  await checkPermissions();
} catch(err) {
  throw new PermissionsError(err);
}
```

### 'Friendly' Errors

Internal error dialogs may not be appropriate for end users. Default 'friendly' errors are set on ever Conjure error.

```js
const { NotFoundError } = require('err');

const err = new NotFoundError('sensitive message');

console.log(err.message); // sensitive message

console.log(err.friendlyError); // A needed resource was not found
```

This can be used to pass back non-sensitive errors to the client.

### HTTP Status Codes

Similar to 'friendly' errors, you may also want to know what http status code an error should associate to.

```js
const { PermissionsError } = require('err');

const err = new PermissionsError(`User doesn't have access`);

console.log(err.httpStatusCode); // 403
```
