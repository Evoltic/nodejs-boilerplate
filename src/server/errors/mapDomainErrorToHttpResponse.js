const ResourceNotFoundError = require('./ResourceNotFoundError')
const ValidationError = require('./ValidationError')
const ConflictError = require('./ConflictError')
const AuthenticationError = require('./AuthenticationError')
const AuthorizationError = require('./AuthorizationError')
const InternalError = require('./InternalError')

function responseLayer(statusCode, errorName, error = {}) {
  return {
    statusCode: statusCode,
    body: {
      error: {
        name: errorName,
        message: error.message,
        data: { ...error.data }
      }
    }
  }
}

function mapDomainErrorToHttpResponse(error) {
  switch (error.constructor) {
    case ResourceNotFoundError:
      return responseLayer(404, 'Not Found', error)
    case ValidationError:
      return responseLayer(422, 'Unprocessable Entity', error)
    case ConflictError:
      return responseLayer(409, 'Conflict', error)
    case AuthenticationError:
      return responseLayer(401, 'Unauthorized', error)
    case AuthorizationError:
      return responseLayer(403, 'Forbidden', error)
    case InternalError:
      return responseLayer(500, 'Internal Server Error')
    default:
      return responseLayer(500, 'Internal Server Error')
  }
}

module.exports = mapDomainErrorToHttpResponse
