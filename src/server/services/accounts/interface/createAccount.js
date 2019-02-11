const bcrypt = require('bcryptjs')
const Account = require('../service/model')
const { InternalError, ValidationError, ConflictError } = requireInServer(
  '/errors'
)

async function createAccount(params) {
  const { email, displayName, password } = params

  let passwordHash

  try {
    const salt = bcrypt.genSaltSync(10)
    passwordHash = bcrypt.hashSync(password, salt)
  } catch (e) {
    throw new InternalError(e)
  }

  const account = new Account({
    email,
    passwordHash,
    displayName
  })

  try {
    return await account.save()
  } catch (e) {
    if (e.errors['email'].kind === 'UniqueValidator') {
      throw new ConflictError(e.message, 'email')
    }
    if (e.name === 'ValidationError') {
      throw new ValidationError(e.message, 'account')
    }
    throw new InternalError(e)
  }
}

module.exports = createAccount
