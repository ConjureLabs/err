const nativeErrorKeys = ['address', 'code', 'errno', 'name', 'path', 'port', 'stack', 'syscall'] // omitting 'message' since that will be applied automatically

// basic error
class ConjureError extends Error {
  constructor(...args) {
    super(...args)

    const errArg = args[0]

    // setting default friendly error
    // this can be overridden on a case-by-case basis
    this.friendlyError = this.defaultFriendlyError

    // hijack message
    this.message = errArg ? (
      typeof errArg === 'string' ? errArg :
        typeof errArg.message === 'string' ? errArg.message :
        errArg.toString()
    ) : this.friendlyError

    if (errArg) {
      for (let i = 0; i < nativeErrorKeys.length; i++) {
        const key = nativeErrorKeys[i]

        if (errArg[key] === undefined) {
          continue
        }

        this[key] = errArg[key]
      }
    }
  }

  get defaultFriendlyError() {
    return 'An error occurred'
  }

  get httpStatusCode() {
    return 500
  }
}
module.exports.ConjureError = ConjureError

// if something was not found
class NotFoundError extends ConjureError {
  get httpStatusCode() {
    return 404
  }

  get defaultFriendlyError() {
    return 'A needed resource was not found'
  }
}
module.exports.NotFoundError = NotFoundError

// permissions are not valid
class PermissionsError extends ConjureError {
  get httpStatusCode() {
    return 403
  }

  get defaultFriendlyError() {
    return 'Invalid permissions'
  }
}
module.exports.PermissionsError = PermissionsError

// an error occurred where we don't think it should ever have
class UnexpectedError extends ConjureError {
  get defaultFriendlyError() {
    return 'An unexpected error occurred'
  }
}
module.exports.UnexpectedError = UnexpectedError

// missing data, wrong keys passed, etc
class ContentError extends ConjureError {
  get defaultFriendlyError() {
    return 'Content is missing or invalid'
  }
}
module.exports.ContentError = ContentError

// if user triggered an error
class UserError extends ConjureError {
}
module.exports.UserError = UserError
