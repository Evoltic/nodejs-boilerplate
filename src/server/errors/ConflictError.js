const DomainError = require('./DomainError')

class ConflictError extends DomainError {
  constructor(message, subject) {
    super(`ConflictError: ${message}`)
    this.data = { subject }
  }
}

module.exports = ConflictError
