const DomainError = require('./DomainError')

class ResourceNotFoundError extends DomainError {
  constructor(resource, subject) {
    super(`Resource ${resource} was not found.`)
    this.data = { resource, subject }
  }
}

module.exports = ResourceNotFoundError
