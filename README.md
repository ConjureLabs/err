## Errors

[![CircleCI](https://circleci.com/gh/ConjureLabs/err/tree/master.svg?style=svg)](https://circleci.com/gh/ConjureLabs/err/tree/master)

Extending native errors, to give a little more context.

This is useful for differentiating between server (5xx) and user (4xx) errors. As well as making sure internal vs. public-facing error messages are different.

### Install

```sh
npm install --save @conjurelabs/err
```

### Usage

```js
const { ConjureError } = require('@conjurelabs/err')

throw new ConjureError('something happened')
```

### Public-Facing Errors

Internal error dialogs may not be appropriate for end users. Default 'public' errors are set on every Conjure error.

```js
const { NotFoundError } = require('@conjurelabs/err')

const err = new NotFoundError('sensitive message')

console.log(err.message) // 'sensitive message'

console.log(err.publicMessage) // 'A needed resource was not found'
```

This can be used to pass back non-sensitive errors to the client, while still logging actual error messages internally.

```js
// in a final express route handler
server.use((err, req, res, next) => {
  if (!err) {
    return next()
  }

  console.log(err) // will log true error message & stack trace

  if (err instanceof ConjureError) {
    return res.status(err.httpStatusCode).send({ message: err.publicMessage })
  }

  // if a native (non ConjureError), then 500
  res.status(500).send({ message: 'An error occurred '})
})
```

You can signal that a set error message is okay for public users, by passing `public: true` in an options argument.

```js
const err = new NotFoundError('The file you have requested is not present', { public: true })
```

This will set `.publicMessage` to `'The file you have requested is not present'`

### HTTP Status Codes

Similar to 'public' errors, you may also want to know what http status code an error should associate to.

```js
const { PermissionsError } = require('@conjurelabs/err')

const err = new PermissionsError(`User doesn't have access`)

console.log(err.httpStatusCode) // 403
```

### Wrapping a Native Error

If you want to extend a native error, you can pass in the entire `err` instance.

```js
const { PermissionsError } = require('@conjurelabs/err')

try {
  await checkPermissions()
} catch(err) {
  throw new PermissionsError(err)
}
```

### Tests

```sh
npm test
npm run lint
```
