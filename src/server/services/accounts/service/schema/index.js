const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const emailValidator = require('../validators/emailValidator')

const schema = new mongoose.Schema({
  email: {
    type: String,
    validate: emailValidator,
    required: [true, 'Email field is required'],
    index: true,
    unique: true
  },
  passwordHash: String,
  displayName: String,
  updatedAt: Date,
  lastLogin: Date,
  role: { type: String, default: 'user' }
})

module.exports = schema.plugin(uniqueValidator, { type: 'UniqueValidator' })
