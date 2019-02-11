const { InternalError, AuthenticationError, DomainError } = requireInServer(
  '/errors'
)
const comparePasswordHash = require('./comparePasswordHash.js')
const getToken = require('./getToken.js')
const Accounts = requireInServer('/services/accounts/interface')

async function authenticate(params) {
  const { email, password } = params

  const account = await Accounts.getAccount({ email })
    .then(account => account)
    .catch(e => {
      if (e instanceof DomainError) throw e
      throw new InternalError(e)
    })

  const passwordHash = account.passwordHash
  let passwordIsCorrect

  try {
    passwordIsCorrect = comparePasswordHash({ password, passwordHash })
  } catch (e) {
    if (e instanceof DomainError) throw e
    throw new InternalError(e)
  }

  if (passwordIsCorrect) {
    try {
      return getToken(account)
    } catch (e) {
      if (e instanceof DomainError) throw e
      throw new InternalError(e)
    }
  }

  throw new AuthenticationError('Password is incorrect', 'password')
}

module.exports = authenticate
