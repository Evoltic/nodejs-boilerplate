const DomainError = require('./DomainError')
const ResourceNotFoundError = require('./ResourceNotFoundError')
const InternalError = require('./InternalError')
const ValidationError = require('./ValidationError')
const AuthenticationError = require('./AuthenticationError')
const ConflictError = require('./ConflictError')
const AuthorizationError = require('./AuthorizationError')
const mapDomainErrorToHttpResponse = require('./mapDomainErrorToHttpResponse')

module.exports = {
  DomainError,
  ResourceNotFoundError,
  InternalError,
  ValidationError,
  AuthenticationError,
  ConflictError,
  AuthorizationError,
  mapDomainErrorToHttpResponse
}
