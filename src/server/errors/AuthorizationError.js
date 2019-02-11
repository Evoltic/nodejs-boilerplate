const DomainError = require('./DomainError')

class AuthorizationError extends DomainError {
  constructor(subject) {
    super(`AuthorizationError: Access denied. No rights to ${subject}`)
    this.data = { subject }
  }
}

module.exports = AuthorizationError
