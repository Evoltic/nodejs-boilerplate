const Authentication = requireInServer('/services/authentication/interface')
const { mapDomainErrorToHttpResponse } = requireInServer('/errors')

async function login(event, context) {
  const { email, password } = event.body

  return await Authentication.authenticate({ email, password })
    .then(token => ({ statusCode: 200, body: { token } }))
    .catch(e => {
      return mapDomainErrorToHttpResponse(e)
    })
}

module.exports = login
