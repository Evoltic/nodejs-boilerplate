const jwt = require('jsonwebtoken')
const jwtConfig = requireInServer('/config/jwt')
const { jwtSecret } = requireInServer('/config')
const { InternalError } = requireInServer('/errors')

function getToken(account) {
  let jwtPayload = jwtConfig.payload

  jwtPayload.subject = account._id
  jwtPayload.name = account.displayName || ''
  jwtPayload.email = account.email
  jwtPayload.exp = Math.floor(Date.now() / 1000) + jwtConfig.expireDuration

  try {
    return jwt.sign(jwtPayload, jwtSecret)
  } catch (e) {
    return InternalError(e)
  }
}

module.exports = getToken
