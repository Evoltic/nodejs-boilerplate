const DomainError = require('./DomainError')

class ValidationError extends DomainError {
  constructor(message, subject) {
    super(`ValidationError: ${message}`)
    this.data = { subject }
  }
}

module.exports = ValidationError
