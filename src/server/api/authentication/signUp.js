const Authorization = requireInServer('/services/authorization/interface')
const { mapDomainErrorToHttpResponse } = requireInServer('/errors')

async function signUp(event, context) {
  const { email, password } = event.body

  try {
    await Authorization.createAccount({ email, password })
    return { statusCode: 201 }
  } catch (e) {
    return mapDomainErrorToHttpResponse(e)
  }
}

module.exports = signUp
