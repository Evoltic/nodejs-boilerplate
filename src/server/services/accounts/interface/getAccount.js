const Account = require('../service/model')
const { InternalError, ResourceNotFoundError } = requireInServer('/errors')

async function getAccount(params) {
  const { id, email } = params

  if (id) {
    const account = new Promise((resolve, reject) => {
      Account.findById(id, (err, account) =>
        err ? reject(err) : resolve(account)
      )
    })

    try {
      const result = await account
      if (result) return result
    } catch (e) {
      throw new InternalError(e)
    }
  }

  if (email) {
    const account = new Promise((resolve, reject) => {
      Account.findOne({ email }, (err, account) =>
        err ? reject(err) : resolve(account)
      )
    })

    try {
      const result = await account
      if (result) return result
    } catch (e) {
      throw new InternalError(e)
    }
  }

  throw new ResourceNotFoundError('account')
}

module.exports = getAccount
