require('dotenv').config()

const mongodbUri = process.env.MONGODB_URI
const port = process.env.PORT
const jwtSecret = process.env.JWT_SECRET
const eventHeader = '__ow_headers'

module.exports = {
  mongodbUri,
  port,
  jwtSecret,
  eventHeader
}
