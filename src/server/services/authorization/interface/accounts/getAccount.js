const Accounts = requireInServer('/services/accounts/interface')
const { DomainError, InternalError, AuthorizationError } = requireInServer(
  '/errors'
)

async function getAccount(requesterInfo, targetInfo) {
  const requiredAccessRoles = ['self', 'admin']
  let requesterAccount, targetAccount

  try {
    requesterAccount = await Accounts.getAccount(requesterInfo)
    targetAccount = await Accounts.getAccount(targetInfo)
  } catch (e) {
    if (e instanceof DomainError) throw e
    throw new InternalError(e)
  }

  const requesterRole = requesterAccount.role

  if (requiredAccessRoles.includes('self')) {
    const equalId = requesterAccount.id === targetAccount.id

    if (equalId) {
      return targetAccount
    }
  }

  const accessAccepted = requiredAccessRoles.find(
    requiredRole => requesterRole === requiredRole
  )

  if (accessAccepted) {
    return targetAccount
  }

  throw new AuthorizationError(targetInfo)
}

module.exports = getAccount
