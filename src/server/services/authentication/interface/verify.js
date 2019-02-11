const jwt = require('jsonwebtoken')
const { jwtSecret } = requireInServer('/config')
const { AuthenticationError } = requireInServer('/errors')

async function verify(token) {
  const authInfo = new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })

  try {
    return await authInfo
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      AuthenticationError('Provided token is expired', 'token')
    }
    throw new AuthenticationError('Authorization token is not valid', 'token')
  }
}

module.exports = verify
