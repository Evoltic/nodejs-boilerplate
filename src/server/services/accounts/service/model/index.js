const mongoose = require('mongoose')
const schema = require('../schema')

const Account = mongoose.model('Account', schema)

module.exports = Account
