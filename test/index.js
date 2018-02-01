const { test } = require('ava');

test('default export should create an error', t => {
  const ConjureError = require('../');
  const err = new ConjureError('asdf');
  t.true(err instanceof Error);
});

test('error instance should carry message', t => {
  const ConjureError = require('../');
  const err = new ConjureError('oh no, oh no');
  t.is(err.message, 'oh no, oh no');
});

test('error instance should carry over native error attributes', t => {
  const ConjureError = require('../');
  const rootErr = new Error('this is the message');
  rootErr.additional = 123;
  const err = new ConjureError(rootErr);
  t.is(err.message, 'this is the message');
  t.equal(err.additional, rootErr.additional);
});

test('friendly error should be different', t => {
  const ConjureError = require('../');
  const err = new ConjureError('the secret number is 4');
  t.equal(err.message, 'the secret number is 4');
  t.true(typeof err.friendlyError === 'string');
  t.true(err.friendlyError !== err.message);
});

test('errors should have an associated http status code', t => {
  const ConjureError = require('../');
  const err = new ConjureError('something happened');
  t.true(typeof err.httpStatusCode === 'number');
});

test('should be able to create a NotFound error, that extends ConjureError', t => {
  const ConjureError, { NotFoundError } = require('../');
  const err = new NotFoundError('something happened');
  t.true(err instanceof Error);
  t.true(err instanceof ConjureError);
});

test('should be able to create a Permissions error, that extends ConjureError', t => {
  const ConjureError, { PermissionsError } = require('../');
  const err = new PermissionsError('something happened');
  t.true(err instanceof Error);
  t.true(err instanceof ConjureError);
});

test('should be able to create an Unexpected error, that extends ConjureError', t => {
  const ConjureError, { UnexpectedError } = require('../');
  const err = new UnexpectedError('something happened');
  t.true(err instanceof Error);
  t.true(err instanceof ConjureError);
});

test('should be able to create a Content error, that extends ConjureError', t => {
  const ConjureError, { ContentError } = require('../');
  const err = new ContentError('something happened');
  t.true(err instanceof Error);
  t.true(err instanceof ConjureError);
});

test('should be able to create a User error, that extends ConjureError', t => {
  const ConjureError, { UserError } = require('../');
  const err = new UserError('something happened');
  t.true(err instanceof Error);
  t.true(err instanceof ConjureError);
});
