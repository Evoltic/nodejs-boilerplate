class Authorization {}

Authorization.createAccount = require('./accounts/createAccount')
Authorization.getAccount = require('./accounts/getAccount')

module.exports = Authorization
