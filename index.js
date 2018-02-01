const nativeErrorKeys = ['address', 'code', 'errno', 'name', 'path', 'port', 'stack', 'syscall']; // omitting 'message' since that will be applied automatically

// basic error
class ConjureError extends Error {
  static from(err) {
    const Constructor = this;
    const newError = new Constructor(err.message || err.toString());

    for (let i = 0; i < nativeErrorKeys.length; i++) {
      const key = nativeErrorKeys[i];

      if (err[key] === undefined) {
        continue;
      }

      newError[key] = err[key];
    }

    return newError;
  }

  get httpStatusCode() {
    return 500;
  }

  get friendlyError() {
    return 'An error occurred';
  }
}
module.exports.ConjureError = ConjureError;

// if something was not found
class NotFoundError extends ConjureError {
  get httpStatusCode() {
    return 404;
  }

  get friendlyError() {
    return 'A needed resource was not found';
  }
}
module.exports.NotFoundError = NotFoundError;

// permissions are not valid
class PermissionsError extends ConjureError {
  get httpStatusCode() {
    return 403;
  }

  get friendlyError() {
    return 'Invalid permissions';
  }
}
module.exports.PermissionsError = PermissionsError;

// an error occurred where we don't think it should ever have
class UnexpectedError extends ConjureError {
  get friendlyError() {
    return 'An unexpected error occurred';
  }
}
module.exports.UnexpectedError = UnexpectedError;

// missing data, wrong keys passed, etc
class ContentError extends ConjureError {
  get friendlyError() {
    return 'Content is missing or invalid';
  }
}
module.exports.ContentError = ContentError;

// if user triggered an error
class UserError extends ConjureError {
}
module.exports.UserError = UserError;
