const mongoose = require('mongoose')

class Database {
  constructor(connectionString) {
    this.connectionString = connectionString
  }

  async connect() {
    try {
      return await mongoose.connect(this.connectionString, {
        useNewUrlParser: true
      })
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = Database
