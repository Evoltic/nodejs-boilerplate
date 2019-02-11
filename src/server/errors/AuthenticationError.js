const DomainError = require('./DomainError')

class AuthenticationError extends DomainError {
  constructor(message, subject) {
    super(`AuthenticationError: ${message}`)
    this.data = { subject }
  }
}

module.exports = AuthenticationError
