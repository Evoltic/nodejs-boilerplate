const bcrypt = require('bcryptjs')
const {
  InternalError,
  ValidationError,
  ResourceNotFoundError
} = requireInServer('/errors')

function comparePasswordHash(params) {
  const { password, passwordHash } = params

  if (!password || typeof password !== 'string') {
    throw new ValidationError(
      'Password field must be not empty string',
      'password'
    )
  }

  if (!passwordHash) {
    throw new ResourceNotFoundError('password')
  }

  try {
    return bcrypt.compareSync(password, passwordHash)
  } catch (e) {
    throw new InternalError(e)
  }
}

module.exports = comparePasswordHash
