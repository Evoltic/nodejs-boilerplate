class Authentication {}

Authentication.verify = require('./verify')
Authentication.comparePasswordHash = require('./comparePasswordHash')
Authentication.getToken = require('./getToken')
Authentication.authenticate = require('./authenticate')

module.exports = Authentication
