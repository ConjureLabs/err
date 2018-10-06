const { test } = require('ava')

test('default export should create an error', t => {
  const { ConjureError } = require('../')
  const err = new ConjureError('asdf')
  t.true(err instanceof Error)
})

test('error instance should carry message', t => {
  const { ConjureError } = require('../')
  const err = new ConjureError('oh no, oh no')
  t.is(err.message, 'oh no, oh no')
})

test('passing a native error should copy attributes from an original error', t => {
  const { ConjureError } = require('../')
  const rootErr = new Error('this is the message')
  rootErr.additional = 123 // should not carry (not a native error attr)
  rootErr.errno = 998877 // should carry
  const err = new ConjureError(rootErr)
  t.true(err.message.includes('this is the message'))
  t.true(err.additional === undefined)
  t.true(err.errno === 998877)
})

test('public error should be different', t => {
  const { ConjureError } = require('../')
  const err = new ConjureError('the secret number is 4')
  t.true(err.message.includes('the secret number is 4'))
  t.true(typeof err.publicMessage === 'string')
  t.true(!err.publicMessage.includes('the secret number is 4'))
})

test('public error should match passed string, if public option is true', t => {
  const { ConjureError } = require('../')
  const err = new ConjureError('the secret number is 4', { public: true })
  t.true(err.message.includes('the secret number is 4'))
  t.true(typeof err.publicMessage === 'string')
  t.true(err.publicMessage.includes('the secret number is 4'))
})

test('errors should have an associated http status code', t => {
  const { ConjureError } = require('../')
  const err = new ConjureError('something happened')
  t.true(typeof err.httpStatusCode === 'number')
})

test('should be able to create a NotFound error, that extends ConjureError', t => {
  const { ConjureError, NotFoundError } = require('../')
  const err = new NotFoundError('something happened')
  t.true(err instanceof Error)
  t.true(err instanceof ConjureError)
})

test('should be able to create a Permissions error, that extends ConjureError', t => {
  const { ConjureError, PermissionsError } = require('../')
  const err = new PermissionsError('something happened')
  t.true(err instanceof Error)
  t.true(err instanceof ConjureError)
})

test('should be able to create an Unexpected error, that extends ConjureError', t => {
  const { ConjureError, UnexpectedError } = require('../')
  const err = new UnexpectedError('something happened')
  t.true(err instanceof Error)
  t.true(err instanceof ConjureError)
})

test('should be able to create a Content error, that extends ConjureError', t => {
  const { ConjureError, ContentError } = require('../')
  const err = new ContentError('something happened')
  t.true(err instanceof Error)
  t.true(err instanceof ConjureError)
})

test('should be able to create a User error, that extends ConjureError', t => {
  const { ConjureError, ContentError } = require('../')
  const err = new ContentError('something happened')
  t.true(err instanceof Error)
  t.true(err instanceof ConjureError)
})
