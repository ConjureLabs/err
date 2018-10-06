const nativeErrorKeys = ['address', 'code', 'errno', 'name', 'path', 'port', 'stack', 'syscall'] // omitting 'message' since that will be applied automatically

// basic error
class ConjureError extends Error {
  constructor(arg, options) {
    const viaNativeErr = arg instanceof Error
    if (viaNativeErr) {
      super(...arguments)

      const err = arg

      for (let i = 0; i < nativeErrorKeys.length; i++) {
        const key = nativeErrorKeys[i]

        if (err[key] === undefined) {
          continue
        }

        this[key] = err[key]
      }
    } else {
      const message = arg
      super(message)
      this.message = typeof message === 'string' ? message : message.toString()
    }

    this.publicMessage = this.publicMessage || this.defaultPublicMessage
    this.message = this.message || this.publicMessage

    if (!viaNativeErr && options) {
      if (options.public) {
        this.publicMessage = this.message
      }
    }
  }

  get defaultPublicMessage() {
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

  get defaultPublicMessage() {
    return 'A needed resource was not found'
  }
}
module.exports.NotFoundError = NotFoundError

// permissions are not valid
class PermissionsError extends ConjureError {
  get httpStatusCode() {
    return 403
  }

  get defaultPublicMessage() {
    return 'Invalid permissions'
  }
}
module.exports.PermissionsError = PermissionsError

// an error occurred where we don't think it should ever have
class UnexpectedError extends ConjureError {
  get defaultPublicMessage() {
    return 'An unexpected error occurred'
  }
}
module.exports.UnexpectedError = UnexpectedError

// missing data, wrong keys passed, etc
class ContentError extends ConjureError {
  get defaultPublicMessage() {
    return 'Content is missing or invalid'
  }
}
module.exports.ContentError = ContentError

// if user triggered an error
class UserError extends ConjureError {
}
module.exports.UserError = UserError
