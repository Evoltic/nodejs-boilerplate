const Accounts = requireInServer('/services/accounts/interface')
const { InternalError, DomainError } = requireInServer('/errors')

async function createAccount(params) {
  try {
    return await Accounts.createAccount(params)
  } catch (e) {
    if (e instanceof DomainError) throw e
    throw new InternalError(e)
  }
}

module.exports = createAccount
