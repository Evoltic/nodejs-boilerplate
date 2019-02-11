const { eventHeader } = requireInServer('/config')
const Authentication = requireInServer('/services/authentication/interface')
const Authorization = requireInServer('/services/authorization/interface')
const { mapDomainErrorToHttpResponse } = requireInServer('/errors')

async function getAccount(event, context) {
  const authorizationToken = event[eventHeader].authorizationtoken

  let authInfo
  try {
    authInfo = await Authentication.verify(authorizationToken)
  } catch (e) {
    return mapDomainErrorToHttpResponse(e)
  }

  let requesterInfo
  let targetAccountInfo

  try {
    requesterInfo = { id: authInfo.subject }
    targetAccountInfo = { id: event.pathParameters.id }
  } catch (e) {
    return mapDomainErrorToHttpResponse(e)
  }

  try {
    const result = await Authorization.getAccount(
      requesterInfo,
      targetAccountInfo
    )
    return { statusCode: 200, body: result }
  } catch (e) {
    return mapDomainErrorToHttpResponse(e)
  }
}

module.exports = getAccount
